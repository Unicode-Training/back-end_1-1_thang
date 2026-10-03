import Redis from "ioredis";
export const redis = new Redis(6380);

export const redisPub = new Redis(6380);

export const redisSub = new Redis(6380);