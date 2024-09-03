import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {
  const {getTotalCartAmount}=useContext(StoreContext);
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'> Delivery Information </p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email adress' />
        <input type="text" placeholder='street' />
        
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='country' />
        </div>
        <input type="text" placeholder='Phone number' />

      </div>
      <div className="plce-order-right">
      
      
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details"> 
<p> Subtotal:</p>

<p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
<p>Delivery Fee</p>
<p>${getTotalCartAmount()===0?0:2} </p>
            </div>
            <hr />
            <div className="cart-total-details">
<b>Total</b>
<b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2} </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form >
  )
}

export default PlaceOrder
