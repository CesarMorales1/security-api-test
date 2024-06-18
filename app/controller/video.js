import { jwtVerification } from "../utils/jwtHandler.js"
import {permissionChecker} from "../utils/permissionHandler.js"
import responseApi from "../models/responseApi.js"
import {VideoService} from "../services/videoService.js"
const uploadVideo = async(req,res,next) => 
    {
        try {
            const validToken = jwtVerification(req.cookies.access_token);
            if(!validToken) throw new Error('Por favor logueate de nuevo');
            console.log(validToken);
            const hasPermission = permissionChecker(validToken.permisos,3);
            if(!hasPermission) throw new Error('Not authorized');
            const responseService = await VideoService.uploadVideo(req.body)
            if(!responseService.success) return responseApi.error(res,undefined,'Hubo un error al crear el video',500);
            return responseApi.success(res,undefined,'Video subido con exito',201);
        } catch (error) {
            return responseApi.error(res,error.message,401);
        }
    }

export { uploadVideo }