import prisma               from "../models/prisma.js";
import { Prisma }           from "@prisma/client";
import responseService      from "../models/responseService.js";

export class UserService
{
    //el permiso 4 es el encargado de editar perfil
    static async updateProfile({numero,image,userInformation})
    {
        const {permisos,id} = userInformation;
        const hasThePermission = permisos.some(item => item.permissionId === 4);
        if(!hasThePermission) throw responseService.createErrorResponse('No tienes el permiso para realizar esta accion',401);
        try {
            const responseDataBase = await prisma.profile.update(
                {
                    where: {id: id},
                    data: {numero: numero,image: image}
                })
            console.log(responseDataBase);
            return responseService.createSuccessResponse('Usuario actualizado con exito',201);
        } catch (error) {
          return responseService.createErrorResponse('Hubo un error al crear el usuario',500);
        }
    }
}