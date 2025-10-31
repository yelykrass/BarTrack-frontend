import React, { useState } from "react";
import { Eye, EyeClosed, Mail, Lock } from "lucide-react";
import BarTrack from "../assets/logo.png";
import "./LoginPage.css";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { login } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (serverError) setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Introduce un correo electrónico válido.";
      }
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setServerError("");

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.log(error);
      setServerError("Error entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="logo-container">
          <img src={BarTrack} alt="BarTrack Logo" />
        </div>

        <div className="login-card">
          <h2 className="login-title">Inicia sesión</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-row">
                <div className="icon" aria-hidden>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className={`login-input ${errors.email ? "has-error" : ""}`}
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <div className="input-row">
                <div className="icon" aria-hidden>
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`login-input ${
                    errors.password ? "has-error" : ""
                  }`}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {serverError && (
              <div className="error-message" style={{ marginBottom: 8 }}>
                {serverError}
              </div>
            )}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
