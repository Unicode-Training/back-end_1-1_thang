//Kiểu dữ liệu cơ bản
// - string, number, boolean, symbol, null, undefined
// - any, unknown
// - void
// - array
// - tuple
// - object

// let a: string = "10";
// let b: number = a as unknown as number;

// const doSomething = (): void => {
//     return 'a';
// };

// const number: number[] = [1, 2, 3];

// const user: {
//   name: string;
//   email: string;
//   age?: number;
// } = {
//   name: "An",
//   email: "hoangan.web@gmail.com",
//   age: 35,
// };

// const users: {
//   id: number;
//   name: string;
//   details?: {
//     address: string;
//   };
// }[] = [
//   {
//     id: 1,
//     name: "An",
//   },
//   {
//     id: 2,
//     name: "Anh",
//   },
//   {
//     id: 3,
//     name: "Tâm",
//   },
// ];

// const doSomething = (a: number, b: number, c?: string) => {};
// doSomething(1, 2);

// const doSomething = (a: number, callback: () => void) => {};

//fn: callback
//timeout: number

//Generic
// const debounce = <T>(fn: (...args: T[]) => void, timeout = 500) => {
//   let timeoutId: number;
//   return (...args: T[]) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       fn(...args);
//     }, timeout);
//   };
// };

// const debounceFn = debounce<string>((value) => {
//   console.log(`Đang thực thi với tham số: ${value}`);
// }, 1000);
// debounceFn("A");
// debounceFn("Ahi");

//type
// type Address = {
//   province: string;
//   ward: string;
// };
// type User = {
//   name: string;
//   email: string;
//   age: number;
// };
// type UserWithType = Address & User;
// const user: UserWithType = {
//   name: "An",
//   email: "an@gmail.com",
//   age: 35,
//   province: "Hn",
//   ward: "Tây Mỗ",
// };
// const customer: User = {
//   name: "An",
//   email: "an@gmail.com",
//   age: 35,
// };

//interface
// interface User {
//   name: string;
//   email: string;
//   age: number;
// }
// interface UserWithAddress extends User {
//   province: string;
//   ward: string;
// }
// const user: UserWithAddress = {
//   name: "An",
//   email: "an@gmail.com",
//   age: 35,
//   province: "HN",
//   ward: "Tây Mỗ",
// };
interface ErrorWithStatus extends Error {
  status?: number;
}
try {
  const error: ErrorWithStatus = new Error("Có lỗi gì đó");
  error.status = 500;
} catch (error) {
  if (error instanceof Error) {
    const err: ErrorWithStatus = error;
    console.log(err.message);
    console.log(err.status);
  }
}

//a = new A();
// A = Constructor, Class
// a = object, instance
