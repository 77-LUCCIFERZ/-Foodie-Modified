import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter =express.Router();




// image storage engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    } // it will create the new file name in every upload with date stamp best practice is currrent time stamp ..
})

const upload =multer({
    storage:storage
})


// routes
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)



export default foodRouter ;