import { Worker } from 'bullmq';
import "dotenv/config";
import { workerConnection } from '../utils/queue';
import { sendMailWithTemplate } from '../utils/mailer';
import { QUEUE } from '../constants/queue.constant';

let count = 0; //giả lập số lần

new Worker(QUEUE.EMAIL, async (job) => {
    //Nếu không có chuyện gì xảy ra -> Coi như hoàn thành
    //Nếu throw Error -> Job failed

    if (job.name === "email-login-notice") {
        console.log('Job đang chạy');

        // console.log(`Random`, job.data.randomId);
        count++;
        if (count < 10) {
            console.log('Job bị failded');
            throw new Error();
        } else {
            console.log('Job thành công');
        }
        //Gọi hàm gửi email ở đây
        // const user = job.data;
        // try {
        //     await sendMailWithTemplate(user.email, user.subject, 'login-notice', {
        //         name: user.name,
        //         ip: user.ip,
        //         userAgent: user.userAgent,
        //         now: new Date().toLocaleDateString()
        //     });
        //     console.log('Job success');

        // } catch (error) {
        //     console.log('Job Failed');
        //     throw new Error("Failed")
        // }
    }

}, {
    connection: workerConnection
})