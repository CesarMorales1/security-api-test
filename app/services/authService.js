import { compare, encrypt } from "../utils/bcryptHandler.js";
import prisma               from "../models/prisma.js";
import { Prisma }           from "@prisma/client";
import responseService      from "../models/responseService.js";
import { toUser }           from "../models/user.js";
import { UserPermission }   from "../models/permisosDefautl.js";
import jwt                  from "jsonwebtoken"
import cookieParser         from "cookie-parser";

export class AuthService {
    static async createUser(userModel) {
        // 1. Las validaciones fueron realizadas en la ruta con un middleware anidado
        try {
            // 2. REVISAR QUE NO HAYA UN NOMBRE REPETIDO EN LA DB
            const databaseResponse = await prisma.user.findFirst({
                where: { username: userModel.username },
                select: { id: true }
            });
            // Si id no es null, salta el error de que ya existe
            if (databaseResponse?.id) {
                throw responseService.createErrorResponse('El usuario ya existe por favor elige un nuevo username', 400);
            }
            // Encriptando clave para almacenarla
            userModel.password = await encrypt(userModel.password);
            // Creando nuevo usuario
            const usuarioCreado = await this.createUserTableUser(userModel);
            //rellando tabla userHasRoles
            await this.createUserHasRoles(usuarioCreado);
            // Retornando respuesta
            return responseService.createSuccessResponse('Usuario creado con éxito', 201);
        } catch (error) {
            console.log(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log('Prisma Client Known Request Error');
            }
            return responseService.createErrorResponse('Error al crear el usuario', 500);
        }
    }

    static async createUserTableUser(userModel) {
        // Valor por defecto al crear un usuario
        const status = 'A';
        try {
            const { username, email, password, numero, image, roles } = userModel;
            const permisoArray = [];
            
            if (roles === 1) {
                UserPermission.permisosUsuario.map(id => {
                    permisoArray.push({ permissionId: id });
                });
            }
            
            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: password,
                    status: status,
                    profile: {
                        create: {
                            numero: numero,
                            image: image,
                        }
                    },
                    permissions: {
                        create: [...permisoArray] // Utiliza `connect` en lugar de `create`
                    }
                },
                include: { permissions: true, profile: true }
            });
            newUser['rol'] = roles;
            return newUser;
        } catch (error) {
            throw responseService.createErrorResponse('Error al crear el usuario en la tabla User', 500);
        }
    }

    static async createUserHasRoles(newUser) {{
        try {
            console.log(newUser);
            const userHasRoleInsert = await prisma.userHasRoles.create({
                data: {
                    userId: newUser.id,
                    roleId: newUser.rol,
                    status: 'A'
                },
                include: {
                    user: true,
                    role: true
                }
            });
            
            return userHasRoleInsert;
        } catch (error) {
            console.log(error);
            throw responseService.createErrorResponse('Error al crear la relación userHasRoles', 500);
        }
    }}

    static async login({ email, password }) {
        try
        {
            //verificando que el usuario existe
            const databaseResponse = await prisma.user.findFirst({
                where: { email: email },
                select: { id: true,password: true,permissions: true }
            });
    
            //si el usuario existe comparar clave
            const isValid = await compare(password,databaseResponse.password);
            if(!isValid) throw new Error('Wrong password');
            //devolviendo usuario
            //medida de seguridad para evitar la filtracion de informacion adicional
            const publicUser = 
            {
                id: databaseResponse.id,
                permisos: databaseResponse.permissions,
            }
            //creando token de session
            const jwtToken = jwt.sign(publicUser,process.env.__PRIVATE_KEY,
                {
                    expiresIn: '2h'
                });
                //guardando en las cookies para evitar un ataque de crosshair scripting ademas las cookies tienen http-only y ademas con https da mas seguridad evitando ataques man-in-the-middle CSRF

            return responseService.createSuccessResponse(jwtToken,200);
        }catch(error)
        {
           throw responseService.createErrorResponse(error.message,401); 
        }
        

    }
}