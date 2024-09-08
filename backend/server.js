import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express();
const port = 4000;

/**
 * Middleware configuration
 */
/**
 * Enable JSON parsing for request bodies
 */
app.use(express.json());

/**
 * Enable CORS to allow cross-origin requests
 */
app.use(cors());
// db connection
connectDB();
//api endpoint 
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  /**
   * Send a success response with a message
   */
  res.send("API WORKING ... Started ");
});



// validation-middleware error handling ko next scope ya aayo
app.use((error,req,res,next)=>{
  let status=error.status || 500
  let message=error.message || "Server error"      // it sends this messages
  let result=error.detail || null
  
  if(error.code && +error.code ===11000){
      status=422;
      message="validation failed"
      let msg={};
      Object.keys(error.keyPattern).map((field)=>{
msg[field]=`${field} should be unique`
      })
      result=msg;
  }
  res.status(status).json({                         // this is also required
      result:result,
      meta:null,
      message:message
  })
})

 // Start the server and listen on the specified port
 
app.listen(port, () => {
  /**
   * Log a message to the console when the server starts
   */
  console.log(`Server Started On http://localhost:${port}`);
});









// SMTP_HOST=sandbox.smtp.mailtrap.io
// SMTP_PORT=587 
// SMTP_USERNAME=93b16d56d544d7
// SMTP_PASSWORD=b92f5faeeb450e                    
// SMTP_FROM=luccifer.says@gmail.com
// SMTP_PROVIDER=mailtrap

// FRONTEND_URL=http://localhost:5137

// # SMTP_HOST=smtp.gmail.com
// # SMTP_PORT=587 
// # SMTP_USERNAME=luccifer.says@gmail.com
// # SMTP_PASSWORD=yhgb whem kqzx gubv
// # SMTP_FROM=luccifer.says@gmail.com
// # SMTP_PROVIDER=gmail

// # yhgb whem kqzx gubv


// #https://github.com/sandesh-bhattarai/mern-30-apis


// #mongosh "mongodb+srv://cluster0.t6y5l1w.mongodb.net/" --apiVersion 1 --username luccifersays
// #9dPxZrtSphc1wnKq


// #mongodb+srv://luccifersays:9dPxZrtSphc1wnKq@cluster0.t6y5l1w.mongodb.net/ 

// MONGODB_URL=mongodb+srv://luccifersays:9dPxZrtSphc1wnKq@cluster0.t6y5l1w.mongodb.net/
// MONGODB_NAME=PROJECT


// JWT_SECRET=93b16d56d544d7b92f5faeeb450e