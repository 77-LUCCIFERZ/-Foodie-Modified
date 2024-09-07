import React, { useContext, useState } from 'react';
import "./LoginPopup.css";
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPopup = () => {
  const { url, setToken } = useContext(StoreContext); // Accessing url and setToken from context
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [showLogin, setShowLogin] = useState(true); // State to control visibility of login page
  const navigate = useNavigate(); // Hook for navigation

  // Handle form input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle login form submission
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url; // Base URL from context

    // Determine if login or registration based on current page path
    const currentPage = window.location.pathname;
    if (currentPage === "/login" || currentPage === "/signin") {
      newUrl += "/api/user/login";
    } else if (currentPage === "/register" || currentPage === "/create_account" || currentPage === "/signup") {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data); // Send request to login/register
      if (response.data.success) {
        setToken(response.data.token); // Set token in StoreContext
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setShowLogin(false); // Hide the login page

        // Redirect to home page after successful login/registration
        navigate("/home");
      } else {
        alert(response.data.message); // Display error message if login fails
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}>
        <section>
          {[...Array(100)].map((_, index) => (
            <span key={index}></span>
          ))}
          <div className="signin">
            <div className="content">
              <h2>Log In</h2>
              <div className="form">
                <div className="inputBox">
                  <input
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    required
                  />
                  <i>Email</i>
                </div>
                <div className="inputBox">
                  <input
                    name='password'
                    onChange={onChangeHandler}
                    value={data.password}
                    type="password"
                    required
                  />
                  <i>Password</i>
                </div>
                <div className="links">
                  <a href="#">Forgot Password?</a>
                  <a href="/register">Sign up</a>
                </div>
                <div className="inputBox">
                  <button type='submit'>Login</button>
                </div>
                <a className='home' href="/"> 
                  <button type="button">Home</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default LoginPopup;
