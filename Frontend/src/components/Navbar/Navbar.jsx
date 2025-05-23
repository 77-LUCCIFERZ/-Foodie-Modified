import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = () => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage application ma gayera localstorage ma hunxa after inspect
    setToken(""); // Clear token in context token area khali 
    navigate("/"); // Navigate to home page / or home autai ma garxa 
  };

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="Logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="Basket Icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
        </div>
        {!token ? (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="Orders" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /> <p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
