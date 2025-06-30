import React, { useState, useEffect } from "react";
import FormBuilder from "../components/FormBuilder";

function CreateFormPage() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [templates, setTemplates] = useState([]);

  const handleCreateForm = () => {
    setTemplateToEdit(null);
    setShowBuilder(true);
  };

  const handleTemplateClick = (template) => {
    setTemplateToEdit(template);
    setShowBuilder(true);
  };

  const handleFormSave = async () => {
    try {
      const res = await fetch("https://gf-backend-im3h.onrender.com/api/forms", {
        method: "GET",
        headers: {
          "x-admin-token": localStorage.getItem("adminToken"),
          "x-admin-email": localStorage.getItem("adminEmail")
        },
      });

      const data = await res.json();

      // ✅ Defensive check: ensure we only try to map if response is an array
      if (Array.isArray(data)) {
        setTemplates(data);
      } else {
        console.error("Expected array of templates, received:", data);
        setTemplates([]);
      }
    } catch (err) {
      console.error("Error fetching templates:", err);
      setTemplates([]);
    }
  };

  useEffect(() => {
    handleFormSave();
  }, []);

  return (
    <div className="page">
      <h2>Create Form</h2>

      {!showBuilder && (
        <>
          <button className="create-button" onClick={handleCreateForm}>
            + Create New Form
          </button>

          <div className="template-section">
            <h3>Templates</h3>
            {templates.length === 0 ? (
              <p>No templates available</p>
            ) : (
              <div className="template-grid">
                {templates.map((template) => (
                  <div
                    key={template.form_id}
                    className="template-card"
                    onClick={() => handleTemplateClick(template)}
                  >
                    <div className="template-header">{template.title}</div>
                    <div className="template-body">
                      <p>Click to reuse</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {showBuilder && (
        <div className="form-builder-page">
          <div className="form-builder-container">
            <FormBuilder prefill={templateToEdit} onSave={handleFormSave} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateFormPage;
