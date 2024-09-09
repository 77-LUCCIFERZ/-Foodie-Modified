import orderModel from "../models/orderModel.js";

import userModel from "../models/user/userModel.js";
import Stripe from "stripe";

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)
// placing user orde from frontend

const placeOrder =async (req,res)=>{

// oeder for ,we leave it this here because, for developers as well we need account ,citizenship etc


// to be continued ......


    
}

export {placeOrder}