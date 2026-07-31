import express, { NextFunction, Request, Response } from "express";
import { prisma } from "./libs/prisma";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); //parse body

app.get('/', (req: Request, res: Response) => {
    res.json({});
})

// app.post('/users', async (req: Request, res: Response) => {
//     const body = req.body;
//     if (Array.isArray(body)) {
//         //createMany
//         const count = await prisma.user.createMany({
//             data: body
//         });
//         return res.json({
//             count
//         });
//     } else {
//         //create
//         const user = await prisma.user.create({
//             data: body
//         });
//         return res.json({ data: user });
//     }
// });

// app.get('/users', async (req: Request, res: Response) => {
//     const users = await prisma.user.findMany({
//         // take: 3, //limit
//         // skip: 1 //offset
//         // select: {
//         //     id: true,
//         //     name: true,
//         //     email: true
//         // }
//         // omit: {
//         //     password: true
//         // }
//         // orderBy: [
//         //     {
//         //         createdAt: 'desc'
//         //     },
//         //     {
//         //         id: 'asc'
//         //     }
//         // ]
//         where: {
//             OR: [
//                 {
//                     id: {
//                         gte: 5
//                     },
//                 },
//                 {
//                     email: {
//                         contains: "r 2"
//                     }
//                 }
//             ],
//             password: null,
//             createdAt: new Date("2026-07-17 07:34:38"),
//             NOT: [
//                 {
//                     name: {
//                         contains: 'abc'
//                     },
//                 },
//                 {
//                     id: 4
//                 }
//             ]
//             // AND: [
//             //     {
//             //         password: null
//             //     },
//             //     {
//             //         createdAt: new Date("2026-07-17 07:34:38")
//             //     }
//             // ]
//         }
//     });
//     return res.json({ data: users })
// })

// app.get('/users/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const user = await prisma.user.findUnique({
//         where: { id: +id! },
//         omit: {
//             password: true
//         }
//         // where: {
//         //     name: 'An'
//         // }
//     })
//     if (!user) {
//         throw new Error("User not found")
//     }
//     // const user = await prisma.user.findFirst({
//     //     // where: { id: +id! }
//     // })
//     res.json({ user });
// });

// app.patch('/users/:id', async (req: Request, res: Response) => {
//     const body = req.body;
//     const { id } = req.params;
//     // const user = await prisma.user.update({
//     //     where: {
//     //         id: +id!
//     //         // name: "An"
//     //     },
//     //     data: body
//     // })
//     const user = await prisma.user.updateMany({
//         where: {
//             id: {
//                 gte: 5
//             }
//         },
//         data: {
//             status: "ACTIVE"
//         }
//     })
//     return res.json({ user })
// });

// app.delete('/users/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {
//         const user = await prisma.user.delete({
//             where: { id: +id! }

//         });
//         return res.json({ user })
//     } catch {
//         throw new Error("User không tồn tại")
//     }
// })

// app.delete('/users', async (req: Request, res: Response) => {
//     const ids = req.body;
//     const count = await prisma.user.deleteMany({
//         // where: {
//         //     id: {
//         //         in: ids
//         //     }
//         // }
//     })

//     res.json({ count })
// })

// app.post('/users', async (req: Request, res: Response) => {
//     const { phone, ...userData } = req.body;
//     const dataCreate = {
//         ...userData,
//     }

//     if (phone) {
//         dataCreate.phone = {
//             create: {
//                 phone
//             }
//         }
//     }
//     const user = await prisma.user.create({
//         data: dataCreate
//     });

//     res.json({
//         user
//     });
// });

// app.put('/users/:id', async (req: Request, res: Response) => {
//     const { phone, ...dataUpdate } = req.body;
//     const { id } = req.params;
//     const user = await prisma.user.update({
//         where: { id: +id! },
//         data: {
//             ...dataUpdate,
//             phone: {
//                 upsert: {
//                     where: {
//                         userId: +id!
//                     },
//                     create: {
//                         phone
//                     },
//                     update: {
//                         phone
//                     }
//                 }
//             }
//         }
//     })
//     res.json({ user })
// });

// app.delete('/users/:id/disconnect-phone', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const now = new Date();
//     const user = await prisma.user.update({
//         where: { id: +id! },
//         data: {
//             updatedAt: now,
//             phone: {
//                 disconnect: {
//                     userId: {},
//                 },
//             }
//         }
//     });
//     res.json({
//         user
//     })
// });

// app.post('/users/assign-phone/:phone', async (req: Request, res: Response) => {
//     const body = req.body;
//     const { phone } = req.params;
//     const phoneInstance = await prisma.phone.findUnique({
//         where: { phone: (phone as string) }
//     });

//     const user = await prisma.user.create({
//         data: {
//             ...body, phone: {
//                 connect: {
//                     id: phoneInstance!.id
//                 }
//             }
//         }
//     })
//     res.json({ user })
// });

// app.get('/users', async (req: Request, res: Response) => {
//     const { includes = '' } = req.query;
//     type RelationType = {
//         [key: string]: boolean
//     }
//     const relations = (includes as string).split(',').filter((item) => item.trim()).reduce((acc: RelationType, cur: string) => {
//         acc[cur.trim()] = true;
//         return acc;
//     }, {} as RelationType);

//     // const user = await prisma.user.findMany({
//     //     include: relations
//     // });
//     const user = await prisma.user.findMany({
//         select: {
//             id: true,
//             name: true,
//             email: true,
//             status: true,
//             createdAt: true,
//             updatedAt: true,
//             phone: {
//                 select: {
//                     phone: true
//                 }
//             }
//         },
//         // include: {
//         //     phone: true
//         // },
//         where: {
//             phone: {
//                 phone: {
//                     contains: "12345"
//                 }
//             }
//         }
//     })
//     res.json({ user });
// });


// app.post('/posts/:userId', async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     const body = req.body;
//     // const post = await prisma.post.create({
//     //     data: {
//     //         ...body,
//     //         userId: +userId!
//     //     }
//     // })
//     const user = await prisma.user.update({
//         where: { id: +userId! },
//         data: {
//             posts: {
//                 create: body
//             }
//         },
//         include: {
//             posts: true
//         }
//     });
//     res.json({
//         post: user.posts
//     });
// });

// app.get('/posts', async (req: Request, res: Response) => {
//     const posts = await prisma.post.findMany({
//         include: {
//             user: true
//         }
//     })
//     res.json({
//         posts
//     })
// });

// app.get('/users', async (req: Request, res: Response) => {
//     const users = await prisma.user.findMany({
//         include: {
//             posts: {
//                 take: 2,
//                 orderBy: {
//                     id: 'desc'
//                 },
//                 include: {
//                     category: true
//                 }
//             }
//         }
//     })
//     res.json({ users })
// });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     const message = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? err.message : "Server Error"
//     res.status(500).json({
//         error: message || "Server Error"
//     })
// });

app.post('/users/:userId/roles', async (req: Request, res: Response) => {
    const body = req.body;
    const { userId } = req.params;

    const user = await prisma.user.update({
        where: {
            id: +userId!
        },
        data: {
            roles: {
                createMany: {
                    data: body.map((item: number) => ({ roleId: item }))
                }
            }
        }
    })

    res.json({ user })
});

app.put('/users/:userId/roles', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const body = req.body;
    //Lấy dữ liệu bảng trung gian
    const dataFromDb = await prisma.user.findUnique({
        where: {
            id: +userId!
        },
        include: {
            roles: true
        }
    });

    const rolesFromDb = dataFromDb?.roles.map((item) => item.roleId);

    //Lấy danh sách cần insert vào db => So sánh body với rolesFromDb => Tìm ra phần tử khác
    const onInsertRoles = body.filter((item: number) => {
        return !rolesFromDb?.includes(item);
    }).map((item: number) => ({ roleId: item, userId: +userId! }));

    //Lấy danh sách càn xóa trên db => So sánh rolesFromDb với body => Tìm ra phần tử khác
    const onDeleteRoles = rolesFromDb?.filter((item: number) => {
        return !body.includes(item);
    });

    await prisma.$transaction([
        prisma.userRole.deleteMany({
            where: {
                roleId: {
                    in: onDeleteRoles as number[]
                }
            }
        }),
        prisma.userRole.createMany({
            data: onInsertRoles
        })
    ]);

    res.json({})
});

app.listen(PORT, () => {

    console.log(`Đang chạy với port: ${PORT}`);
});

//Nếu muốn dùng relation làm bộ lọc: Viết trong where
//Nếu muốn lọc kết quả relation: Viết where trong include hoặc select