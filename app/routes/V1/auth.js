import express from "express";
import {validateUserData} from "../../utils/validators/auth.js"
const authRouter = express.Router();

authRouter.post('/registerUser',validateUserData,(req,res,next) => 
    {
        console.log('Hello from ssl server');
    });

export default authRouter