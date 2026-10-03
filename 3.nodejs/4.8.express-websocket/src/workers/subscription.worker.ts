import { Worker } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { workerConnection } from "../utils/queue";

new Worker(QUEUE.SUBSCRIPTION,
    async (job) => {
        console.log('Đang kiểm tra subscription toàn hệ thống', job.name);
    },
    {
        connection: workerConnection
    }
)