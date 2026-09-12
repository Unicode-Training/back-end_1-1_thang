//2 loại hàm
// - hàm đồng bộ
// - hàm bất đồng bộ

// alert("Hello");
// console.log("Đã xong");

//Xử lý bất đồng bộ --> Giải quyết bài toán tuần tự
//Ví dụ: Gọi api -> chờ khi nào api có kết quả -> hiển thị ra giao diện

//callback
// const getPosts = (callback) => {
//   setTimeout(() => {
//     const posts = ["Post 1", "Post 2", "Post 3"];
//     callback(posts);
//   }, 1000);
// };
// getPosts((data) => {
//   console.log(data);
//   console.log("Đã xong");
// });

//promise: chaining
//a().b().c().d()
//status: pending -> fulfilled hoặc rejected
// const getPosts = () => {
//   return new Promise((resolve, reject) => {
//     //resolve đại diện cho việc tác vụ đã xử lý thành công
//     //reject đại diện cho việc tác vụ xử lý thất bại
//     setTimeout(() => {
//       let status = true; //giả định trạng thái của tác vụ
//       if (status) {
//         resolve("Post Data");
//       } else {
//         reject("Error Data");
//       }
//     }, 1000);
//   });
// };
// const getProducts = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Product Data");
//     }, 1000);
//   });
// };

//Promise chaining
//Promise unwrap --> mặc định
// getPosts()
//   .then((data) => {
//     console.log(data);
//     return getProducts();
//   })
//   .then((data) => {
//     console.log(data);
//   });

//then cũng là 1 promise

// setTimeout(() => {
//   console.log(1);
// });
// Promise.resolve(2).then((data) => {
//   console.log(data);
// });
// console.log(3);

// const getUser = (id) => {
//   return new Promise((resolve) => {
//     const users = [
//       {
//         id: 1,
//         name: "User 1",
//         salary: 1000,
//       },
//       {
//         id: 2,
//         name: "User 2",
//         salary: 2000,
//       },
//       {
//         id: 3,
//         name: "User 3",
//         salary: 3000,
//       },
//     ];
//     setTimeout(() => {
//       resolve(users.find((user) => user.id === id));
//     }, Math.random() * 2000);
//   });
// };

// const ids = [1, 2, 3];

// const getTotal = () => {
//   return new Promise((resolve) => {
//     let total = 0;
//     let count = 0;
//     for (const index in ids) {
//       getUser(ids[index]).then((data) => {
//         total += data.salary;
//         count++;
//         if (count === ids.length) {
//           resolve(total);
//         }
//       });
//     }
//   });
// };

// getTotal().then((data) => {
//   console.log(data);
// });

//Tính tổng và in ra kết quả
//Yêu cầu: Không dùng Promise.all, async await

//Promise.all
// const promiseArr = ids.map((id) => getUser(id));
// Promise.all(promiseArr).then((users) => {
//   console.log(users);
// });

//async await
//async function: luôn trả về 1 promise
//await keyword: resolve 1 promise (Chính là 1 lần then)
// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({
//       getData: () => {
//         return new Promise((resolve) => resolve("My Data"));
//       },
//     });
//   }, 1000);
// });
// const myPromise2 = new Promise((resolve) => {
//   resolve(
//     new Promise((resolve) => {
//       resolve("My Data 2");
//     }),
//   );
// });
// const myPromise3 = new Promise((resolve, reject) => {
//   //   resolve("My Data");
//   reject("My Error");
// });
// const doSomething = async () => {
//   //   const data = await (await myPromise).getData();
//   //   console.log(data);
//   try {
//     return myPromise3;
//   } catch {
//     throw new Error("Lỗi khác");
//   }
// };
// doSomething()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//normal mode
// "use strict";
// a = 10;
// console.log(a);
// "use strict";
// function doSomething() {
//   console.log(this);
// }
// doSomething();
// "use strict";
// const user = {
//   name: "Hoàng An",
// };
// delete user;
// console.log(user);
