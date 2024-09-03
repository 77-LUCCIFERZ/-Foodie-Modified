import React from 'react'
import "./LoginPopup.css"

const LoginPopup = () => {
  return (
    <div className='login-popup'>
     <section>
      {[...Array(100)].map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="signin">
        <div className="content">
          <h2>Log In</h2>
          <div className="form">
            <div className="inputBox">
              <input type="email" required />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input type="password" required />
              <i>Password</i>
            </div>
            <div className="links">
              <a href="#">Forgot Password ?</a>
              <a href="/signin">Sign up</a>
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          
           <button className='home'><a href="/">Home</a></button>
           
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default LoginPopup
