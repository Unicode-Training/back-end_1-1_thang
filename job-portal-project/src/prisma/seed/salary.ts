import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
    await prisma.$executeRaw`TRUNCATE TABLE salary`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
    await prisma.salary.createMany({
        data: [
            {
                name: '1-3 triệu',
                status: true
            },
            {
                name: "3-5 triệu",
                status: true,
            },
            {
                name: '5-10 triệu',
                status: true
            },
            {
                name: '10-15 triệu',
                status: true
            },
            {
                name: 'Trên 15 năm',
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