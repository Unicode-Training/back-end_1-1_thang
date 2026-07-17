import express, { NextFunction, Request, Response } from "express";
import { prisma } from "./libs/prisma";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); //parse body

app.get('/', (req: Request, res: Response) => {
    res.json({});
})

app.post('/users', async (req: Request, res: Response) => {
    const body = req.body;
    if (Array.isArray(body)) {
        //createMany
        const count = await prisma.user.createMany({
            data: body
        });
        return res.json({
            count
        });
    } else {
        //create
        const user = await prisma.user.create({
            data: body
        });
        return res.json({ data: user });
    }
});

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        // take: 3, //limit
        // skip: 1 //offset
        // select: {
        //     id: true,
        //     name: true,
        //     email: true
        // }
        // omit: {
        //     password: true
        // }
        // orderBy: [
        //     {
        //         createdAt: 'desc'
        //     },
        //     {
        //         id: 'asc'
        //     }
        // ]
        where: {
            OR: [
                {
                    id: {
                        gte: 5
                    },
                },
                {
                    email: {
                        contains: "r 2"
                    }
                }
            ],
            password: null,
            createdAt: new Date("2026-07-17 07:34:38"),
            NOT: [
                {
                    name: {
                        contains: 'abc'
                    },
                },
                {
                    id: 4
                }
            ]
            // AND: [
            //     {
            //         password: null
            //     },
            //     {
            //         createdAt: new Date("2026-07-17 07:34:38")
            //     }
            // ]
        }
    });
    return res.json({ data: users })
})

app.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: +id! },
        omit: {
            password: true
        }
        // where: {
        //     name: 'An'
        // }
    })
    if (!user) {
        throw new Error("User not found")
    }
    // const user = await prisma.user.findFirst({
    //     // where: { id: +id! }
    // })
    res.json({ user });
});

app.patch('/users/:id', async (req: Request, res: Response) => {
    const body = req.body;
    const { id } = req.params;
    // const user = await prisma.user.update({
    //     where: {
    //         id: +id!
    //         // name: "An"
    //     },
    //     data: body
    // })
    const user = await prisma.user.updateMany({
        where: {
            id: {
                gte: 5
            }
        },
        data: {
            status: "ACTIVE"
        }
    })
    return res.json({ user })
});

app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: { id: +id! }

        });
        return res.json({ user })
    } catch {
        throw new Error("User không tồn tại")
    }
})

app.delete('/users', async (req: Request, res: Response) => {
    const ids = req.body;
    const count = await prisma.user.deleteMany({
        // where: {
        //     id: {
        //         in: ids
        //     }
        // }
    })

    res.json({ count })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error: err.message || "Server Error"
    })
});

app.listen(PORT, () => {
    console.log(`Đang chạy với port: ${PORT}`);
});