import Redis from "ioredis";
export const queueConnection = new Redis(6380);
export const workerConnection = new Redis(6380, {
    maxRetriesPerRequest: null
});