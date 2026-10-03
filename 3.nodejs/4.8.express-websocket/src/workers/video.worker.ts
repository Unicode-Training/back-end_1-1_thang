import { Worker } from "bullmq";
import { QUEUE } from "../constants/queue.constant";
import { workerConnection } from "../utils/queue";
import { videoService } from "../services/video.service";

new Worker(QUEUE.VIDEO,
    async (job) => {
        if (job.name === "sync-meta-youtube") {
            await videoService.syncYoutubeMeta(job.data.id, job.data.url);
            console.log('Update xong');
        }

        if (job.name === "sync-all-video") {
            await videoService.syncAllYoutubeMeta();
            console.log('Đã sync all');

        }
    },
    {
        connection: workerConnection
    }
)