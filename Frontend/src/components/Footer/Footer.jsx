import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer'id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
<img src={assets.logo} alt="" />
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus atque excepturi sed sunt rum voluptatem deleniti non! Eius temporibus quam error cum possimus.
repeatet.ad culpa earum. Consequatur?</p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
        </div>
        <div className="footer-content-centre">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+9808868091</li>
    <li>contact:luccifer.says@gmail.com</li>
</ul>
        </div>
       
      </div>
      <hr />
      <p className='footer-copyright'>© 2024 @Foodie.com - All rights reserved. Unauthorized use, reproduction, or distribution of this content is prohibited. For permissions, contact the copyright holder.</p>
    </div>
  )
}

export default Footer
