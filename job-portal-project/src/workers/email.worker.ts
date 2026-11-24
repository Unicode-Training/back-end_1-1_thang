import { Worker } from "bullmq";
import { QUEUE_JOB, QUEUE_NAME } from "../constants/queue.constant";
import { workerConnection } from "../libs/bullmq";
import { emailService } from "../services/email.service";

new Worker(QUEUE_NAME.EMAIL, async (job) => {
    switch (job.name) {
        case QUEUE_JOB.SEND_EMAIL_APPLY_JOB:
            await emailService.sendJobApplyWelcome(job.data);
            break;

        // case QUEUE_JOB.SEND_EMAIL_STATUS_APPLY_JOB:
        //     await emailService.sendJobApplyStatus(job.data);
        //     break;

        default:
            throw new Error(`Job: ${job.name} not exist`);
    }
}, {
    connection: workerConnection
})