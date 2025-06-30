import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formId } = location.state || {};

  const handleRefill = () => {
    if (formId) {
      // Simply go back to the same form page
      navigate(`/fill/${formId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="home">
      <div style={{ textAlign: "center" }}>
        <h1 className="main-logo">Thank you for your response!</h1>
        <button className="create-button" onClick={handleRefill}>
          Fill Again
        </button>
      </div>
    </div>
  );
}

export default ThankYouPage;
