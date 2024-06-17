import express from "express";
import {validateUserData,loginValidation} from "../../utils/validators/auth.js"
import * as authController from "../../controller/auth.js"

const authRouter = express.Router();

authRouter.post('/registerUser',validateUserData,authController.createUser);
authRouter.post('/login',loginValidation,authController.loginUser)

export default authRouter