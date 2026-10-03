import { prisma } from "../libs/prisma"
import { emitter } from "../socket";

export const messageService = {
    findAll() {
        return prisma.message.findMany();
    },
    async create(body: { message: string }) {
        const messageId = crypto.randomUUID();
        const data = await prisma.message.create({
            data: {
                messageId,
                message: body.message
            }
        });

        //Khi nào thêm thành công -> Bắn websocket -> client
        const messageList = await this.findAll();
        emitter.emit('send-to-client', {
            type: "list-message",
            data: messageList
        });

        return data;
    }
}