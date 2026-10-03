import WebSocket, { WebSocketServer } from 'ws';
import EventEmitter from "events";
export const emitter = new EventEmitter();
const wss = new WebSocketServer({ port: 8080 });
// const messageList: {
//     id: string;
//     message: string;
//     createdAt: Date;
// }[] = [];
wss.on('connection', (ws) => {
    console.log('Kết nối thành công');
    ws.on('error', console.error);
    //Message từ client gửi lên
    ws.on('message', (event) => {
        const { type, data } = JSON.parse(event.toString());
        emitter.emit(type, data);
    });
});

emitter.on('send-to-client', (data: unknown) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
})

// emitter.on('send-message', (data) => {
//     messageList.push({
//         id: crypto.randomUUID(),
//         message: data,
//         createdAt: new Date()
//     });
//     emitter.emit('send-to-client', {
//         type: "list-message",
//         data: messageList
//     });
// });

// emitter.on('init-message', () => {
//     emitter.emit('send-to-client', {
//         type: "list-message",
//         data: messageList
//     });
// })



//wss -> Toàn bộ server websocket (Tất cả client kết nối)
//ws -> Client hiện tại