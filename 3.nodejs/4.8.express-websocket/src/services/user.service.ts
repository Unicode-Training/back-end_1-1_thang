import { prisma } from "../libs/prisma"

export const userService = {
    async find(id: number) {
        const data = await prisma.user.findUnique({
            where: { id },
            omit: {
                password: true
            },
            include: {
                userRoles: {
                    include: {
                        role: {
                            include: {
                                rolePermissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!data) {
            return;
        }

        const { userRoles, ...user } = data;

        const permissionValues: string[] = [];
        userRoles.forEach((userRole) => {
            userRole.role.rolePermissions.forEach((rolePermission) => {
                permissionValues.push(rolePermission.permission.value)
            })
        });

        const permissionUnique = [...new Set(permissionValues)];

        return {
            ...user,
            permissions: permissionUnique
        };
    }
}