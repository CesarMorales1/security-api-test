import express from "express";
import {updateProfile} from "../../controller/user.js"
const userRoute = express.Router();

userRoute.put('/updateProfile',updateProfile)

export default userRoute