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
