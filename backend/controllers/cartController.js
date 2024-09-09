import userModel from "../models/user/userModel.js";


// add items to user cart
const addTocart =async(req,res)=>{
 try {
    let userData =await userModel.findOne({_id:req.body.userId})
    let cartData=await userData.cartData;
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId]=1 // if from the user id theres nop entry in the cartdata in that case it will create 1 cart entry first time 
    }
    else {
        cartData[req.body.itemId]+=1; // if the item is already in the cart then it add
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.status(200).json({success:true,message:"item added to cart"});
 } catch (error) {
    console.log("cartcontroller ma error ayo",error)
    res.json({success:false,message:'error'})
 }
}



//remove items from user cart 

const removeFromCart=async(req,res)=>{

try {
    let userData=await userModel.findById(req.body.userId) // we will get this from our middleware taht will convert our token to id
    let cartData=await userData.cartData;
    if (cartData[req.body.itemId]>0) {
        cartData[req.body.itemId]-=1;
       
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.status(200).json({success:true,message:"item removed from cart"});
} catch (error) {
    console.log("error ayo in cartcontoller remove cart ",error)
    res.json({success:false,message:'error'});
}

}

//fetch user cart data

const getCart=async (req,res)=>{

try {
    let userData=await userModel.findById(req.body.userId) // we will get this from our middleware taht will convert our token to id
    let cartData=await userData.cartData;
    res.status(200).json({success:true,message:"cart data",cartData});
} catch (error) {
    console.log(error,"error in get cart data func");
    res.json({success:false,message:'error'});
}

}



export {addTocart,removeFromCart,getCart}


// the pattern is same for every func so easy first extract data in userData by findById userId that is got by middle ware after converting token into id data then , so we have stored cartData taht we left empty object while creating db and will overwrite their  