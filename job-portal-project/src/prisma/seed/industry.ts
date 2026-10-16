import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`TRUNCATE TABLE industry`;
    await prisma.industry.createMany({
        data: [
            {
                image: "/uploads/icon-1.png",
                name: "Công nghệ"
            },
            {
                image: "/uploads/icon-2.png",
                name: "Marketing"
            },
            {
                image: "/uploads/icon-3.png",
                name: "Thiết kế"
            },
            {
                image: "/uploads/icon-4.png",
                name: "Tài chính"
            }
        ]
    })
}
main().then(() => {
    console.log('Seeding success');
}).catch((error) => {
    console.log('Seeding error: ', error);
}).finally(() => {
    prisma.$disconnect();
    process.exit();
})