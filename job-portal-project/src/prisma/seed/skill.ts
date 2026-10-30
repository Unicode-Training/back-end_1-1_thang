import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;
    await prisma.$executeRaw`TRUNCATE TABLE skills`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
    await prisma.skill.createMany({
        data: [
            {
                name: 'React',
                status: true
            },
            {
                name: 'TypeScript',
                status: true,
            },
            {
                name: 'Next.js',
                status: true
            },
            {
                name: 'GraphQL',
                status: true
            },
            {
                name: 'Tailwind CSS',
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