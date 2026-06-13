import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";
import api from "../../api";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const restaurantName = e.target.restaurantName.value;
    const ownerName = e.target.ownerName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const cuisineType = e.target.cuisineType.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Call API using Axios
      const response = await api.post(
        "/api/auth/food-Partner/register",
        {
          restaurantName,
          ownerName,
          email,
          password,
          phone,
          address,
          cuisineType,
          userType: "partner",
        }
      );

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "partner");
      navigate("/create-food");
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again.",
      );
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container partner-auth">
      <div className="auth-card">
        <div className="partner-auth-panel">
          <p className="partner-kicker">For restaurants</p>
          <h2>Your best dishes deserve motion.</h2>
          <p>Upload short food reels and send hungry customers straight to your store.</p>
        </div>

        <div className="partner-auth-form">
        <h1>Join as partner</h1>
        <p className="subtitle">Upload food reels and turn views into orders.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name</label>
            <input
              id="restaurantName"
              type="text"
              name="restaurantName"
              placeholder="Enter restaurant name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName">Owner Name</label>
            <input
              id="ownerName"
              type="text"
              name="ownerName"
              placeholder="Enter owner name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter restaurant address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cuisineType">Cuisine Type</label>
            <input
              id="cuisineType"
              type="text"
              name="cuisineType"
              placeholder="Enter cuisine type (e.g., Italian, Chinese)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/food-partner/login">Login here</Link>
        </p>
        <p className="auth-footer">
          Are you a customer? <Link to="/user/register">Register as user</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
