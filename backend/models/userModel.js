import mongoose from  "mongoose"

const userSchema =new mongoose.Schema({
    name:{type:String,
        required:true},
        email:{type:String,
            required:true,
            unique:true},
        password:{type:String,
                required:true},
        cartData:{type:Object,
            default:{}}
        },{minimize:false}) // if we dpnt minimize false the cart entry data will not be zcareted coz we haven't passed any there daat

        const userModel=mongoose.models.user || mongoose.model("user",userSchema);

        export default userModel;