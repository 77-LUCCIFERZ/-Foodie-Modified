import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import './index.css';
import SignIn from './components/SignIn/SignIn';
import PaymentForm from './pages/payment/payment';

const App = () => {
  const location = useLocation();// here we canm also use window.location.pathname 
  const showNavbarFooter = !location.pathname.startsWith('/register') && !location.pathname.startsWith('/login');// prevent from loading header and footer in these pages 

  return (
    <div className='app'>
      {showNavbarFooter && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Create_account" element={<SignIn />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/payment" element={<PaymentForm/>} />

      </Routes>
      {showNavbarFooter && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

export default App;
