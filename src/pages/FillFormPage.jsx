import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FillFormPage() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch(`https://gf-backend-im3h.onrender.com/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setFormData(null);
        } else {
          setFormData(data);
          setResponses(data.fields.map(() => ""));
        }
      })
      .catch(() => setFormData(null));
  }, [formId]);

  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://gf-backend-im3h.onrender.com/api/forms/${formId}/responses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: responses }),
        }
      );

      const data = await response.json();
      console.log("Saved:", data);

      navigate("/thank-you", { state: { formId } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (formData === null) {
    return <p style={{ textAlign: "center" }}>Form not found or loading...</p>;
  }

  return (
    <div className="page">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        {formData.title}
      </h2>

      {formData.fields.map((field, index) => (
        <div className="question-wrapper" key={field.id || index}>
          <div className="question-card">
            <div className="question-card-header">{field.label}</div>
            <div className="question-card-body">
              {field.type === "text" || field.type === "number" ? (
                <input
                  type={field.type}
                  value={responses[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="question-input compact"
                />
              ) : field.type === "radio" && field.options ? (
                field.options.map((opt, i) => (
                  <label key={i} style={{ marginRight: "20px" }}>
                    <input
                      type="radio"
                      name={`radio-${index}`}
                      value={opt.value}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                    {opt.value}
                  </label>
                ))
              ) : null}
            </div>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center" }}>
        <button className="save-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default FillFormPage;
