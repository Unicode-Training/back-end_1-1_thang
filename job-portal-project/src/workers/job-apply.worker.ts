import { Worker } from "bullmq";
import { QUEUE_JOB, QUEUE_NAME } from "../constants/queue.constant";
import { workerConnection } from "../libs/bullmq";
import { jobApplyService } from "../services/candidate/job-apply.service";

new Worker(QUEUE_NAME.JOB_APPLY, async (job) => {
    switch (job.name) {
        case QUEUE_JOB.ADD_JOB_APPLY_STATUS:
            await jobApplyService.createjobApplyStatus(job.data.status, job.data.applyId);
            break;

        default:
            throw new Error(`Job: ${job.name} not exist`);
    }
}, {
    connection: workerConnection
})