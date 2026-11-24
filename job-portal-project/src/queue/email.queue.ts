import { Queue } from "bullmq";
import { QUEUE_NAME } from "../constants/queue.constant";
import { queueConnection } from "../libs/bullmq";
export const emailQueue = new Queue(QUEUE_NAME.EMAIL, {
    connection: queueConnection
});