
import { prisma } from "../../libs/prisma";
import data from "./province-ward.json";
import { Ward } from "../generated/prisma/client";
const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`
    await prisma.$executeRaw`TRUNCATE TABLE wards`;
    await prisma.$executeRaw`TRUNCATE TABLE provinces`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;

    await prisma.$transaction(async (tx) => {
        const provinces = await tx.province.createMany({
            data: data.map(val => ({ name: val.Name })),
        });

        const wards: { provinceId: number, name: string }[] = []
        for (let i = 0; i < provinces.count; i++) {
            data[i]?.Wards.forEach((item) => {
                wards.push({
                    provinceId: i + 1,
                    name: item.Name
                })
            })
        };

        await tx.ward.createMany({
            data: wards as unknown as Ward
        })
    });
}
main().then(() => {
    console.log('Seeding success');
}).catch((error) => {
    console.log('Seeding error: ', error);
}).finally(() => {
    prisma.$disconnect();
    process.exit();
})