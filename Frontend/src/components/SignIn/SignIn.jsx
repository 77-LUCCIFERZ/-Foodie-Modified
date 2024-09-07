import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { StoreContext } from '../../context/StoreContext';

const SignIn = () => {
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    const currentPage = window.location.pathname;

    if (currentPage === '/login' || currentPage === '/signin') {
      newUrl += '/api/user/login';
    } else if (currentPage === '/register' || currentPage === '/create_account' || currentPage === '/signup') {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);

        // Redirect to the home page after successful registration/login
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  return (
    <div className="registration-page">
      <div className="background">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <span key={index}></span>
          ))}
      </div>

      <div className="container">
        <form onSubmit={onLogin} className="registration-form">
          <h2>Create Account</h2>
          <div className="input-group">
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              id="username"
              required
            />
            <label htmlFor="username">Username</label>
            <i className="fas fa-user"></i>
          </div>
          <div className="input-group">
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              id="email"
              required
            />
            <label htmlFor="email">Email</label>
            <i className="fas fa-envelope"></i>
          </div>
          <div className="input-group">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              id="password"
              required
            />
            <label htmlFor="password">Password</label>
            <i className="fas fa-lock"></i>
          </div>
          <button type="submit" value="register" className="btn-register">
            Register
          </button>
          <div className="separator">
            <span>or</span>
          </div>
          <button type="button" className="btn-google">
            <i className="fab fa-google"></i> Sign in with Google
          </button>
          <Link to="/login">
            <button type="button" className="login">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

