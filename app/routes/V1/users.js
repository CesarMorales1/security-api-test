import express from "express";
const userRoute = express.Router();

userRoute.get('/', (req,res,next) => 
    {
        console.log('object');
    })

export default userRoute