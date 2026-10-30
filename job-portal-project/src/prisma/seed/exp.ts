import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
    await prisma.$executeRaw`TRUNCATE TABLE exps`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
    await prisma.exp.createMany({
        data: [
            {
                name: '0-1 năm',
                status: true
            },
            {
                name: '1-2 năm',
                status: true,
            },
            {
                name: '2-3 năm',
                status: true
            },
            {
                name: '4-5 năm',
                status: true
            },
            {
                name: 'Trên 5 năm',
                status: true
            }
        ]
    });
}

main().catch(error => {
    console.log(error);
}).finally(() => {
    process.exit();
});