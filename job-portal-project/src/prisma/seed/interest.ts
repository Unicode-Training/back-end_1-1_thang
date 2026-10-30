import { prisma } from "../../libs/prisma";

const main = async () => {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`
    await prisma.$executeRaw`TRUNCATE TABLE interests`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
    await prisma.interest.createMany({
        data: [
            {
                name: 'Tháng lương 13',
                description: 'Thưởng hiệu quả công việc',
                status: true
            },
            {
                name: 'Bảo hiểm sức khỏe',
                description: 'Gói chăm sóc cao cấp',
                status: true,
            },
            {
                name: 'Làm việc Hybrid',
                description: 'Remote 2 ngày/tuần',
                status: true
            },
            {
                name: 'Đào tạo & Phát triển',
                description: 'Hỗ trợ chứng chỉ quốc tế',
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