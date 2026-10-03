import { emitter } from "../socket";
import { redisSub } from "../utils/io-redis";

redisSub.subscribe("websocket:random-value", (err, count) => {
    if (err) {
        console.error("Lỗi khi subscribe:", err);
        return;
    }
    console.log(`Đã subscribe thành công vào ${count} kênh.`);
});

redisSub.on('message', (channel, data) => {
    emitter.emit('send-to-client', {
        type: "random-value",
        data: data
    });
})