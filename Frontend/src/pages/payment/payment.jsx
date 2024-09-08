import React, { useState } from "react";
import "./payment.css"

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    amount: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="payment-container">
      <div className="logo">
        <img
          src="https://www.paypalobjects.com/images/shared/paypal-logo-129x32.svg"
          alt="PayPal Logo"
        />
      </div>
      <h2>Complete Your Payment</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry">Expiry Date</label>
          <input
            type="text"
            id="expiry"
            placeholder="MM/YY"
            maxLength="5"
            required
            value={formData.expiry}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            placeholder="123"
            maxLength="3"
            required
            value={formData.cvv}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="$0.00"
            required
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="pay-button">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
