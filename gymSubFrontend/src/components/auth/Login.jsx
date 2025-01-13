import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5174/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      // Simulate successful login
      login()
      navigate("/dashboard"); // Redirect to dashboard
      
      console.log("Login successful:", data);
      alert("Login successful!");
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-description">
        <h2 >Login</h2>
        {error && <p className="alert alert-danger">{error}</p>}
      </div>
      <div className="signup-container">
      <form onSubmit={handleSubmit}>
          <div className="form-group">
             <label htmlFor="email">
               email
             </label>
             <input
               type="text"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               required
              />
          </div>
          <div className="form-group">
            <label htmlFor="current-password">
              Password
            </label>
            <input
              type="password"
              id="current-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="alert alert-danger">
          Don't have an account?{" "}
          <a href="/signup" >
            Sign up
          </a>
            </p>
        </form>
      </div>
    </>
  );
};

export default Login;