import { Queue } from "bullmq";
import { queueConnection } from "../utils/queue";
import { QUEUE } from "../constants/queue.constant";

export const randomQueue = new Queue(QUEUE.RANDOM, {
    connection: queueConnection,
    defaultJobOptions: {
        removeOnComplete: true, //Khi job thực thi xong -> Xóa
        removeOnFail: true //Khi job bị failed -> Xóa
    }
});