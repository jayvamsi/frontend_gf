import React, { useEffect, useState } from "react";

function FormsPage() {
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://gf-backend-im3h.onrender.com/api/forms", {
      headers: {
        "x-admin-token": sessionStorage.getItem("adminToken"),
        "x-admin-email": sessionStorage.getItem("adminEmail")
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched forms response:", data);
        if (Array.isArray(data)) {
          setForms(data);
        } else {
          console.error("Unexpected response:", data);
          setForms([]); // fallback to empty array
        }
      })
      .catch((err) => console.error("Error fetching forms:", err));
  }, []);

  const handleViewResponses = async (formId) => {
    setSelectedFormId(formId);

    try {
      const [formRes, respRes] = await Promise.all([
        fetch(`https://gf-backend-im3h.onrender.com/api/forms/${formId}`, {
          headers: {
            "x-admin-token": sessionStorage.getItem("adminToken"),
            "x-admin-email": sessionStorage.getItem("adminEmail")
          },
        }),
        fetch(`https://gf-backend-im3h.onrender.com/api/forms/${formId}/responses`, {
          headers: {
            "x-admin-token": sessionStorage.getItem("adminToken"),
            "x-admin-email": sessionStorage.getItem("adminEmail")
          },
        }),
      ]);

      const formData = await formRes.json();
      const responseData = await respRes.json();

      setQuestions(formData.fields || []);
      setResponses(responseData || []);
    } catch (err) {
      console.error("Error loading responses:", err);
    }
  };

  const handleDeleteResponse = async (index) => {
    const confirm = window.confirm("Are you sure you want to delete this response?");
    if (!confirm) return;

    try {
      await fetch(`https://gf-backend-im3h.onrender.com/api/forms/${selectedFormId}/responses/${index}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": sessionStorage.getItem("adminToken"),
          "x-admin-email": sessionStorage.getItem("adminEmail")
        },
      });

      handleViewResponses(selectedFormId);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDeleteForm = async (formId) => {
    const confirm = window.confirm("Delete this form and all its responses?");
    if (!confirm) return;

    try {
      await fetch(`https://gf-backend-im3h.onrender.com/api/forms/${formId}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": sessionStorage.getItem("adminToken"),
          "x-admin-email": sessionStorage.getItem("adminEmail")
        },
      });

      setForms((prev) => prev.filter((f) => f.form_id !== formId));

      if (selectedFormId === formId) {
        setSelectedFormId(null);
        setResponses([]);
        setQuestions([]);
      }
    } catch (err) {
      console.error("Form delete failed:", err);
    }
  };

  return (
    <div className="page">
      <h2 style={{ textAlign: "center" }}>Forms & Responses</h2>

      {forms.length === 0 ? (
        <p style={{ textAlign: "center" }}>No forms found.</p>
      ) : (
        forms.map((form) => (
          <div className="form-box" key={form.form_id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>{form.title}</h3>
              <button
                className="delete-button"
                onClick={() => handleDeleteForm(form.form_id)}
              >
                🗑️ Delete Form
              </button>
            </div>

            <button
              className="save-button"
              onClick={() => handleViewResponses(form.form_id)}
            >
              View Responses
            </button>

            {selectedFormId === form.form_id && (
              <div style={{ marginTop: "15px" }}>
                <h4 style={{ marginBottom: "10px" }}>Responses:</h4>
                {responses.length === 0 ? (
                  <p>No responses submitted yet.</p>
                ) : (
                  responses.map((resp, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px",
                        marginBottom: "10px",
                        backgroundColor: "#f1f2f6",
                        borderRadius: "8px",
                      }}
                    >
                      {resp.map((ans, index) => (
                        <p key={index}>
                          <strong>{questions[index]?.label || `Q${index + 1}`}:</strong> {ans}
                        </p>
                      ))}
                      <button
                        className="delete-button"
                        style={{ marginTop: "10px" }}
                        onClick={() => handleDeleteResponse(i)}
                      >
                        🗑️ Delete Response
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FormsPage;