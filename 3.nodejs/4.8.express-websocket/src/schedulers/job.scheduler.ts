// import { subscriptionQueue } from "../queue/subscription.queue";

import { randomQueue } from "../queue/random.queue";

// import { videoQueue } from "../queue/video.queue";

// subscriptionQueue.upsertJobScheduler('scan-subscription', {
//     // every: 5000
//     pattern: "*/10 * * * * *" //Sử dụng cú pháp của cronjob (linux)
// }, {
//     name: "check-expired-subscription"
// });

// videoQueue.upsertJobScheduler('sync-all-video', {
//     pattern: "*/10 * * * * *",
// }, {
//     name: "sync-all-video"
// })

randomQueue.upsertJobScheduler('random-queue-scheduler', {
    every: 5000,
}, {
    name: "set-random-number"
});