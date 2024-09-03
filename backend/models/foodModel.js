import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    
    name:{type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String ,
        required:true
    }
})

const foodModel =mongoose.models.food || mongoose.model("food",foodSchema); // if the model is already there it will use that or create one if not added models.food it will create new evry time

export default foodModel;