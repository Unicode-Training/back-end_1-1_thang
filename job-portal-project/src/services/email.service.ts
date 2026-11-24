import { prisma } from "../libs/prisma";
import { JobApplyStatusEnum } from "../prisma/generated/prisma/enums";
import { sendMailWithTemplate } from "../utils/mailer"

export const emailService = {
    async sendJobApplyWelcome({ email, name, jobName, applyStatus, applyUrl }: Record<'email' | 'name' | 'jobName' | 'applyStatus' | 'applyUrl', string>) {
        await sendMailWithTemplate(email, 'Đơn ứng tuyển gửi đi thành công', 'apply-welcome', {
            name,
            jobName,
            applyStatus,
            applyUrl
        })
    },

    async sendJobApplyStatus({ email, name, jobName, applyStatus, applyUrl, applyId }: Record<'email' | 'name' | 'jobName' | 'applyStatus' | 'applyUrl' | 'applyId', string>) {
        const subjectMap = {
            REVIEW: '[REVIEW] Trạng thái đơn ứng tuyển đã được cập nhật',
            INTERVIEW: '[INTERVIEW] Lịch mời phỏng vấn',
            SELECTED: 'Chúc mừng bạn đã trúng tuyển. Xem thư mời',
            REJECTED: 'Rất tiếc, hồ sơ bạn đã bị từ chối',
            CANCEL: 'Bạn đã hủy đơn ứng tuyển'
        }

        const statusKey = applyStatus as unknown as keyof typeof subjectMap;

        const applyStatusFromDb = await prisma.jobApplyStatus.findFirst({
            where: {
                applyId: +applyId,
                status: applyStatus as unknown as JobApplyStatusEnum
            }
        })

        await sendMailWithTemplate(email, subjectMap[statusKey], 'apply-status', {
            name,
            jobName,
            applyStatus,
            applyUrl,
            interviewDate: applyStatusFromDb?.interviewDate,
            selectedDate: applyStatusFromDb?.selectedDate,
            invitation: applyStatusFromDb?.invitation,
            note: applyStatusFromDb?.note
        })
    }
}