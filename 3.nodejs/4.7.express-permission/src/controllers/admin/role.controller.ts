import { Request, Response } from "express";
import { prisma } from "../../libs/prisma";

export const roleController = {
    async index(req: Request, res: Response) {
        const data = await prisma.role.findMany();
        return res.json({ data })
    },
    async create(req: Request, res: Response) {
        const data = await prisma.role.create({
            data: req.body
        });
        return res.status(201).json({ data })
    },
    async syncUsers(req: Request, res: Response) {
        const userIds = req.body; //[1,2,3]
        const { roleId } = req.params;

        const userRoleFromDb = await prisma.userRole.findMany({
            where: {
                roleId: +roleId!
            }
        });

        const userIdsFromDb = userRoleFromDb.map((val) => val.userId);

        const userIdsInsert = userIds.filter((userId: number) => {
            return !userIdsFromDb.includes(userId);
        });

        const userIdsDelete = userIdsFromDb.filter((val) => {
            return !userIds.includes(val)
        });

        await prisma.$transaction([
            prisma.userRole.createMany({
                data: userIdsInsert.map((val: number) => ({
                    userId: val,
                    roleId: +roleId!
                }))
            }),
            prisma.userRole.deleteMany({
                where: {
                    userId: {
                        in: userIdsDelete
                    }
                }
            })
        ])

        return res.json({
            success: true
        })
    },

    async syncPermissions(req: Request, res: Response) {
        const { roleId } = req.params;
        const permissionArray = req.body;
        const permissionList = await Promise.all(permissionArray.map(async (permissionValue: string) => {
            let permission = await prisma.permission.findFirst({
                where: {
                    value: permissionValue
                }
            });
            if (!permission) {
                permission = await prisma.permission.create({
                    data: {
                        value: permissionValue
                    }
                })
            }

            return permission;
        }));

        //permissionList -> Lấy từ body

        //Lấy danh sách các permissionId trên trang roles_permissions
        const rolePermissionFromDb = await prisma.rolePermission.findMany({
            where: {
                roleId: +roleId!
            }
        });

        //Đổi mảng rolePermissionFromDb ra id
        const permissionIdsFromDb = rolePermissionFromDb.map(val => val.permissionId);

        //So sánh permissionList với rolePermissionFromDb
        const permissionListCreate = permissionList.filter((val) => {
            return !permissionIdsFromDb.includes(val.id)
        }).map(val => ({
            roleId: +roleId!,
            permissionId: val.id
        }));

        //So sánh từ bảng roles_permissions với permissionList
        const permissionListDelete = permissionIdsFromDb.filter((val) => {
            return !permissionList.find((item) => val === item.id)
        });

        await prisma.$transaction([
            // Thêm dữ liệu vào bảng roles_permissions
            prisma.rolePermission.createMany({
                data: permissionListCreate
            }),
            //Xóa dữ liệu trên bảng roles_permissions
            prisma.rolePermission.deleteMany({
                where: {
                    permissionId: {
                        in: permissionListDelete
                    }
                }
            })
        ]);

        return res.json({
            success: true
        })
    },

    async delete(req: Request, res: Response) {
        const { roleId } = req.params;
        await prisma.$transaction([
            prisma.userRole.deleteMany({
                where: {
                    roleId: +roleId!
                }
            }),
            prisma.rolePermission.deleteMany({
                where: {
                    roleId: +roleId!
                }
            }),
            prisma.role.delete({
                where: {
                    id: +roleId!
                }
            })
        ])

        return res.json({
            success: true
        })
    }
}

//user -> role_user -> role_permission -> permission