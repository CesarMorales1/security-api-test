import { Prisma } from "@prisma/client";
import responseService from "../models/responseService.js";
import prisma from "../models/prisma.js"
export class VideoService
{
    static async uploadVideo(videoInformation)
    {
        try {
            prisma.video.create(
                {
                    data: videoInformation,
                    select: {id: true}
                });
            return responseService.createSuccessResponse('Video creado con exito',201);
        } catch (error) {
            throw responseService.createErrorResponse('Error al crear un video', 500);
        }
    }
}