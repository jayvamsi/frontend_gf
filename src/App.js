import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateFormPage from "./pages/CreateFormPage";
import FormsPage from "./pages/FormsPage";
import Home from "./pages/Home";
import ThankYouPage from "./pages/ThankYouPage";
import FillFormPage from "./pages/FillFormPage";
import FormResponsesPage from "./pages/FormResponsesPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Admin-authenticated routes */}
        <Route path="/home" element={isAdmin ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAdmin ? <CreateFormPage /> : <Navigate to="/login" />} />
        <Route path="/forms" element={isAdmin ? <FormsPage /> : <Navigate to="/login" />} />
        <Route path="/responses/:formId" element={isAdmin ? <FormResponsesPage /> : <Navigate to="/login" />} />

        {/* ✅ Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/fill/:formId" element={<FillFormPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
