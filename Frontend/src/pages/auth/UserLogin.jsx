import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('https://zoreelo-backend.onrender.com/api/auth/user/login', {
        email,
        password
      }, {
        withCredentials: true
      })

      // console.log('Login success:', response.data);
      navigate('/');
    } catch(err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Jump back into your food feed.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"  
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Login Now
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/user/register">Register here</Link>
        </p>
        <p className="auth-footer">
          Are you a food partner?{" "}
          <Link to="/food-partner/login">Login as partner</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
