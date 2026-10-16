import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`TRUNCATE TABLE company_scales`;
    await prisma.companyScale.createMany({
        data: [
            {

                name: "Dưới 10"
            },
            {

                name: "Từ 10 đến 50"
            },
            {

                name: "Từ 50 đến 200"
            },
            {
                name: "Trên 200"
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