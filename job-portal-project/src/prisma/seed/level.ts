import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
    await prisma.$executeRaw`TRUNCATE TABLE levels`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
    await prisma.level.createMany({
        data: [
            {
                name: 'Intern',
                status: true
            },
            {
                name: 'Fresher',
                status: true,
            },
            {
                name: 'Junior',
                status: true
            },
            {
                name: 'Middle',
                status: true
            },
            {
                name: 'Senior',
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