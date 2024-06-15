import {validateUserData} from "../utils/validators/auth.js"
import {compare,encrypt} from "../utils/bcryptHandler.js"

export class AuthService
{
    static async createUser({username,email,password,numero})
    {
        //1. Las validaciones fueron realizadas en el la ruta con un middleware anidado
        //2.REVISAR QUE NO HAYA UN NOMBRE REPETIDO EN LA DB Le toca @negro
        //Adaptando informacion para ser subida a la db
        const hashPassword = await encrypt(password);
        
    };
    static login({username,password}){};
}