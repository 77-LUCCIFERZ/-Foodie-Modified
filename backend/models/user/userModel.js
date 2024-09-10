import mongoose from  "mongoose";
import {UserTypes} from "../../config/constants.js";
import { GeneralStatus} from "../../config/constants.js";



const userSchema =new mongoose.Schema({
    name :{
        type:String,        // should be capital cause it is mongodb data type
        min: 2,                                 // database validation
        max:50,
        required:true },
        
    email:{type:String,
            required:true,
            unique:true},
        
    password:{type:String,
                required:true},
        
    phone:[String],
    activationToken: String,

        activeFor:String, // this should be date for getTime() func
        status:{
            type:String,
            enum:[...Object.values(GeneralStatus)],
            default:GeneralStatus.INACTIVE
        },
    
    
    role:{
        type:String,
        enum:[...Object.values(UserTypes)] ,       // it takes the values excpet key and returns to an array
        default: UserTypes.CUSTOMER
        },
        
    cartData:{type:Object,
            default:{}}
        },{minimize:false}) // if we dpnt minimize false the cart entry data will not be zcareted coz we haven't passed any there daat

        const userModel1=mongoose.models.user || mongoose.model("user",userSchema);// if the model is already there it will use that or create one if not added models.user it will create new evry time
const userModel= userModel1;
        export default userModel;