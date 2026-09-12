import HttpException from "../exceptions/http.exception";
import { prisma } from "../libs/prisma";
import { DeviceData } from "../types/device.type";
import { authService } from "./auth.service";

export const deviceService = {
    findAll(userId: number) {
        return prisma.device.findMany({
            where: {
                userId
            }
        });
    },
    create(deviceData: DeviceData) {
        return prisma.device.create({
            data: deviceData
        })
    },

    async logoutById(id: number, userId: number) {
        const device = await prisma.device.findUnique({
            where: { id }
        });

        if (!device) {
            throw new HttpException("Device not found", 404);
        }

        //Kiểm tra quyền để tránh thu hồi của user khác
        if (device.userId !== userId) {
            throw new HttpException("Unauthorize", 401);
        }

        const jti = device.jti; //Mục đích: Thu hồi token bên redis
        const deviceUpdated = await prisma.device.update({
            where: {
                id
            },
            data: {
                status: "INCTIVE",
                inactivedAt: new Date()
            }
        });

        await authService.revokeByJti(userId, jti);

        return deviceUpdated;

    },

    async logoutAllDevice(userId: number, jti: string) {
        await prisma.device.updateMany({
            where: {
                status: "ACTIVE",
                userId,
                jti: {
                    not: jti
                }
            },
            data: {
                status: "INCTIVE",
                inactivedAt: new Date()
            }
        });
        await authService.revokeByUser(userId, jti);
    }

}