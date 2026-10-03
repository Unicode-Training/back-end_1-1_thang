import { Queue } from "bullmq";
import { queueConnection } from "../utils/queue";
import { QUEUE } from "../constants/queue.constant";

export const videoQueue = new Queue(QUEUE.VIDEO, {
    connection: queueConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true
    }
});