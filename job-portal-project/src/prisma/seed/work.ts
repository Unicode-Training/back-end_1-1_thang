import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
    await prisma.$executeRaw`TRUNCATE TABLE works`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
    await prisma.work.createMany({
        data: [
            {
                name: 'Fulltime',
                status: true
            },
            {
                name: 'Partime',
                status: true,
            },
            {
                name: 'Remote',
                status: true
            },
            {
                name: 'Hybrid',
                status: true
            },
            {
                name: 'Freelancer',
                status: true
            },
        ]
    });
}

main().catch(error => {
    console.log(error);
}).finally(() => {
    process.exit();
});