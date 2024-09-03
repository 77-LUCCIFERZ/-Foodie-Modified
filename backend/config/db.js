import mongoose from "mongoose";


export const connectDB =async ()=>{
    await mongoose.connect('mongodb+srv://luccifersays:9dPxZrtSphc1wnKq@cluster0.t6y5l1w.mongodb.net/Foodie').then(()=>console.log("DataBasE connected"))
}