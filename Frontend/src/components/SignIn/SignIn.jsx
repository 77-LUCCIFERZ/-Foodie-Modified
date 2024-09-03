import React from 'react'
import "./SignIn.css"
import { Link } from 'react-router-dom';
//  import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

const SignIn = () => {
    return (
        <div className="registration-page">
          <div className="background">
            {Array(10).fill(<span></span>)}
          </div>
    
          <div className="container">
            <form className="registration-form">
              <h2>Create Account</h2>
              <div className="input-group">
                <input type="text" id="username" required />
                <label htmlFor="username">Username</label>
                <i className="fas fa-user"></i>
              </div>
              <div className="input-group">
                <input type="email" id="email" required />
                <label htmlFor="email">Email</label>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="input-group">
                <input type="password" id="password" required />
                <label htmlFor="password">Password</label>
                <i className="fas fa-lock"></i>
              </div>
              <button type="submit" className="btn-register">Register</button>
              <div className="separator">
                <span>or</span>
              </div>
              <button type="button" className="btn-google">
                <i className="fab fa-google"></i> Sign in with Google
              </button>
              <Link to="/login">
              <button type="button" className="login">
                <i className="login"></i> Login
              </button></Link>

            </form>
          </div>
        </div>
      );
}

export default SignIn
