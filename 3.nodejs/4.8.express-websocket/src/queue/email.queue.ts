import { Queue } from "bullmq";
import { queueConnection } from "../utils/queue";
import { QUEUE } from "../constants/queue.constant";

export const emailQueue = new Queue(QUEUE.EMAIL, {
    connection: queueConnection,
    defaultJobOptions: {
        removeOnComplete: true, //Khi job thực thi xong -> Xóa
        removeOnFail: 0 //Khi job bị failed -> Xóa
    }
});