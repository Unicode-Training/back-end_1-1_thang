import { Queue } from "bullmq";
import { QUEUE_NAME } from "../constants/queue.constant";
import { queueConnection } from "../libs/bullmq";
export const jobApplyQueue = new Queue(QUEUE_NAME.JOB_APPLY, {
    connection: queueConnection
});