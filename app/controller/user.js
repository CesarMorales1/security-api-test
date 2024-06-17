import {jwtVerification} from "../utils/jwtHandler.js"
import responseApi from "../models/responseApi.js"
import {UserService} from "../services/userService.js"
const updateProfile = async (req,res,next) => 
    {
        try {
            const informationOfUser = jwtVerification(req.cookies.access_token)
            if(!informationOfUser.id) throw new Error('Por favor logueate de nuevo')
            const response = await UserService.updateProfile({numero: req.body.numero,image: req.body.image,userInformation: informationOfUser})
            if(!response.success) throw new Error(response.data)
            return responseApi.success(res,undefined,"Usuario actualizado con exito",201);
        } catch (error) {
            return responseApi.error(res,undefined,error.data,401);
        }
    }

export {updateProfile}