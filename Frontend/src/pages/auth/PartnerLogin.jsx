import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Auth.css';
import api from '../../api';

const PartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    try {
      const response = await api.post('/api/auth/food-Partner/login', {
        email,
        password
      })

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "partner");
      navigate("/create-food");
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again.",
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container partner-auth">
      <div className="auth-card">
        <div className="partner-auth-panel">
          <p className="partner-kicker">Partner kitchen</p>
          <h2>Turn today&apos;s cravings into orders.</h2>
          <p>Post reels, manage your menu, and keep your store moving.</p>
        </div>

        <div className="partner-auth-form">
        <h1>Partner login</h1>
        <p className="subtitle">Manage reels, menus, and fresh orders.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@restaurant.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Logging in...' : 'Login Now'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/food-partner/register">Create one here</Link></p>
          <p>Are you a customer? <Link to="/user/login">Customer Login</Link></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
