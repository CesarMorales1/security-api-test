import express from "express";
import {jwtVerification} from "../../utils/jwtHandler.js"
import {updateProfile} from "../../controller/user.js"
const userRoute = express.Router();

userRoute.put('/updateProfile',updateProfile)

export default userRoute