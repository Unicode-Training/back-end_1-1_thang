import { Queue } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { queueConnection } from "../utils/queue";

export const subscriptionQueue = new Queue(QUEUE.SUBSCRIPTION, {
    connection: queueConnection,
    defaultJobOptions: {
        removeOnComplete: true, //Khi job thực thi xong -> Xóa
        removeOnFail: true //Khi job bị failed -> Xóa
    }
});