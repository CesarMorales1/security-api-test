import {toUserModel} from "../models/user.js"
import {AuthService} from "../services/authService.js"
import serverResponse from "../models/responseApi.js"
import cookieParser from "cookie-parser"

const createUser = async (req,res,next) => 
    {
        try {
        const response =  await AuthService.createUser(req.body);
        if(!response.success) throw new Error(response.getData());
        serverResponse.success(res,response.data,undefined,201);
        } catch (error) {
            serverResponse.error(res,error.message,400)
        }
    }

const loginUser = async (req,res,next) => 
    {
        try {
            const {email,password} = req.body;
            const response =  await AuthService.login({email: email,password: password});
            if(!response.success) throw new Error(response.getData());
            res.cookie('access_token',response.data,
            {
                httpOnly: true,//la cookie solo se puede acceder en el servidor
                secure: true,   //la cookie solo se puede acceder en https
                sameSize: 'strict' //la cookie solo se puede acceder en el mismo dominio
            }).send(response.data)
            } catch (error) {
                serverResponse.error(res,error.data.message,error.status)
            }
    }

export
{
    createUser,
    loginUser
}