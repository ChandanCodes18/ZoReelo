import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Auth.css';
import axios from 'axios';

const UserRegister = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const phone = e.target.phone.value;
      const password = e.target.password.value;

      const userData = {
        name,
        email,
        phone,
        password 
      };

      const response = await axios.post('https://zoreelo-backend.onrender.com/api/auth/user/register', userData, {
        withCredentials: true
      });

      console.log('Registration success:', response.data);
      console.log('Response status:', response.status);
      navigate('/');
    } catch(err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="subtitle">Save cravings, follow kitchens, and order faster.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/user/login">Login here</Link>
        </p>
        <p className="auth-footer">
          Are you a food partner? <Link to="/food-partner/register">Register as partner</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
