import { Worker } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { workerConnection } from "../utils/queue";
import { redisPub } from "../utils/io-redis";
new Worker(QUEUE.RANDOM,
    async (job) => {
        if (job.name === 'set-random-number') {
            const value = Math.random();
            //Redis pub
            redisPub.publish('websocket:random-value', value.toString());
        }
    },
    {
        connection: workerConnection
    }
)