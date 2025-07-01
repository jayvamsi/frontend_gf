import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormBuilder({ prefill, onSave }) {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [fields, setFields] = useState([
    { id: Date.now(), label: "", type: "text", options: [] },
  ]);
  const [shareLink, setShareLink] = useState("");
  const [formId, setFormId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (prefill) {
      setFormTitle(prefill.title || "Untitled Form");
      setFields(
        Array.isArray(prefill.fields)
          ? prefill.fields.map((f) => ({
              ...f,
              options: Array.isArray(f.options) ? f.options : [],
            }))
          : []
      );
    }
  }, [prefill]);

  const handleFieldChange = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const handleAddField = (index) => {
    const newField = {
      id: Date.now(),
      label: "",
      type: "text",
      options: [],
    };
    const updated = [...fields];
    updated.splice(index + 1, 0, newField);
    setFields(updated);
  };

  const handleDeleteField = (id) => {
    if (fields.length === 1) return;
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleAddOption = (fieldId) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: [...(field.options || []), { id: Date.now(), value: "" }],
            }
          : field
      )
    );
  };

  const handleDeleteOption = (fieldId, optionId) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.filter((opt) => opt.id !== optionId),
            }
          : field
      )
    );
  };

  const handleOptionChange = (fieldId, optionId, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.map((opt) =>
                opt.id === optionId ? { ...opt, value } : opt
              ),
            }
          : field
      )
    );
  };

  const handleSaveForm = async () => {
    const filled = fields.filter((f) => f.label.trim() !== "");
    if (filled.length === 0) {
      alert("Please fill at least one question.");
      return;
    }

    const form = {
      title: formTitle,
      fields: filled,
    };

    try {
      const res = await fetch("https://gf-backend-im3h.onrender.com/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": localStorage.getItem("adminToken"),
          "x-admin-email": localStorage.getItem("adminEmail")
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.form_id) {
        setFormId(data.form_id);
        alert("Form saved successfully!");
        if (onSave) onSave(form);
      } else {
        alert("Failed to save form.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving form.");
    }
  };

  const handleShare = () => {
    if (!formId) {
      alert("Please save the form first.");
      return;
    }

    const link = `${window.location.origin}/fill/${formId}`;
    setShareLink(link);
  };

  return (
    <div className="page">
      <input
        type="text"
        className="form-title-input"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />

      {fields.map((field, index) => (
        <div className="question-wrapper" key={field.id}>
          <div className="question-card">
            <div className="question-card-header">Question {index + 1}</div>
            <div className="question-card-body">
              <input
                type="text"
                placeholder="Enter your question"
                className="question-input compact"
                value={field.label}
                onChange={(e) =>
                  handleFieldChange(field.id, "label", e.target.value)
                }
              />
              <select
                className="dropdown inline"
                value={field.type}
                onChange={(e) =>
                  handleFieldChange(field.id, "type", e.target.value)
                }
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="radio">Single Choice</option>
              </select>
            </div>

            {field.type === "radio" && (
              <div className="options-box">
                <p>Options:</p>
                {field.options.map((opt) => (
                  <div key={opt.id} className="option-line">
                    <input
                      type="text"
                      className="option-input"
                      placeholder="Option text"
                      value={opt.value}
                      onChange={(e) =>
                        handleOptionChange(field.id, opt.id, e.target.value)
                      }
                    />
                    <button
                      className="icon-button small delete"
                      onClick={() => handleDeleteOption(field.id, opt.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                <button
                  className="icon-button small add"
                  onClick={() => handleAddOption(field.id)}
                >
                  ➕ Add Option
                </button>
              </div>
            )}
          </div>
          <div className="side-buttons-outside">
            <button
              className="icon-button delete"
              onClick={() => handleDeleteField(field.id)}
            >
              🗑️
            </button>
            <button
              className="icon-button add"
              onClick={() => handleAddField(index)}
            >
              ➕
            </button>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button className="save-button" onClick={handleSaveForm}>
          Save Form
        </button>
        <br />
        <button
          className="save-button"
          style={{ backgroundColor: "#6c5ce7", marginTop: "15px" }}
          onClick={handleShare}
        >
          Share Form
        </button>
      </div>

      {shareLink && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p><strong>Copy & Share:</strong></p>
          <input
            type="text"
            readOnly
            value={shareLink}
            style={{
              padding: "8px",
              width: "80%",
              maxWidth: "500px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
            onClick={(e) => e.target.select()}
          />
        </div>
      )}
    </div>
  );
}

export default FormBuilder;
