import { prisma } from "../libs/prisma"
import { videoQueue } from "../queue/video.queue";
import moment from "moment";
export const videoService = {
    findAll() {
        return prisma.video.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    },
    async create(body: { url: string }) {
        const video = await prisma.video.create({ data: body });
        videoQueue.add('sync-meta-youtube', {
            url: body.url,
            id: video.id
        });
        return video;
    },
    async syncYoutubeMeta(id: number, url: string) {
        const videoId = this.getVideoId(url);
        const youtubeMeta = await this.getYoutubeMeta(videoId!);
        return prisma.video.update({
            where: {
                id
            },
            data: youtubeMeta
        })
    },

    async syncAllYoutubeMeta() {
        const videoList = await this.findAll();
        return await Promise.all(videoList.map(async (video) => {
            return await this.syncYoutubeMeta(video.id, video.url)
        }));
    },

    async getYoutubeMeta(id: string) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails,snippet,statistics&key=${process.env.YOUTUBE_API_KEY}`);
        const data = await response.json();
        const items = data.items;
        const snippet = items[0].snippet;
        const contentDetails = items[0].contentDetails;
        const statistics = items[0].statistics;
        const { title, thumbnails } = snippet;
        const { duration } = contentDetails;
        const { viewCount, commentCount } = statistics;
        return {
            title,
            thumbnail: thumbnails.maxres.url,
            duration: moment.duration(duration).asSeconds(),
            views: +viewCount,
            comment: +commentCount
        }
    },

    getVideoId(url: string) {
        const pattern = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;
        const matches = url.match(pattern);
        if (matches?.[1]) {
            return matches?.[1];
        }

    }
}