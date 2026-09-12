"use strict";
//Kiểu dữ liệu cơ bản
// - string, number, boolean, symbol, null, undefined
// - any, unknown
// - void
// - array
// - tuple
// - object
Object.defineProperty(exports, "__esModule", { value: true });
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
// interface ErrorWithStatus extends Error {
//   status?: number;
// }
// try {
//   const error: ErrorWithStatus = new Error("Có lỗi gì đó");
//   error.status = 500;
// } catch (error) {
//   if (error instanceof Error) {
//     const err: ErrorWithStatus = error;
//     console.log(err.message);
//     console.log(err.status);
//   }
// }
//a = new A();
// A = Constructor, Class
// a = object, instance
// let a: "default" | "pending" | "completed";
//Chỉ cho phép biến a nhận 3 giá trị
// a = "a";
// const demoFunction = (input: "default" | "pending" | "completed" | 10) => {};
// demoFunction(10);
// const demoFunction = (input: string | number | undefined) => {};
// demoFunction()
// const user = {
//   name: "Hoàng An",
//   email: "hoangan@gmail.com",
//   age: 33,
//   status: true,
// };
// // type User = typeof user;
// type DemoType = {
//   name: string;
//   age: number;
// };
// type DemoType2 = keyof DemoType; //"name" | "age"
// const a: DemoType2 = "age";
//Generic
// type User = {
//   name: string;
//   age: number;
// };
// const doSomething = <T>(obj: T, key: keyof T) => {};
// const user = {
//   name: "Hoàng An",
//   age: 33,
// };
// doSomething<User>(user, "name"); //safe type
// const customer = {
//   email: "an@gmail.com",
//   price: 12000,
// };
// doSomething(customer, "price");
//Từ khóa readonly
// const myArr: readonly string[] = [];
// const myObj: {
//   readonly name: string;
// } = {
//   name: "An",
// };
// const doSomething = (
//   a: readonly string[],
//   b: {
//     readonly x: number;
//   },
// ) => {
//   // a.push('s')
//   // b.x = 10;
// };
//Tiện ích có sẵn
//Parial
// type User = {
//   name: string;
//   age: number;
// };
// type User2 = Partial<User>;
//ReadOnly
// type User = {
//   name: string;
//   age: number;
// };
// type User2 = Readonly<User[]>;
// type Role = "admin" | "user" | "guest";
// type Permissions = Record<Role, number>;
//OOP
// - Kế thừa
// - Đóng gói
// - Đa hình
// - Trừu tượng
// interface DoSomethingInterface {
//   status: boolean;
// }
// interface UserInterface {
//   name: string;
//   age: number;
//   getName: () => string;
//   getAge: () => number;
// }
// interface AuthInterface extends DoSomethingInterface {
//   isLogin: boolean;
// }
// interface DatabaseInterface {
//   connection: string;
// }
// class Database {
//   public connection: string = "do-something";
//   constructor(conn: string) {
//     this.connection = conn;
//   }
// }
// class User
//   extends Database
//   implements UserInterface, AuthInterface, DatabaseInterface
// {
//   //Thuộc tính
//   public name: string;
//   public age: number;
//   public isLogin: boolean = true;
//   public status: boolean = false;
//   //Hàm khởi tạo
//   constructor(name: string, age: number) {
//     super("mysql://"); //Gọi constructor của class cha
//     this.name = name;
//     this.age = age;
//   }
//   //Phương thức
//   public getName() {
//     return this.name;
//   }
//   public getAge() {
//     return this.age;
//   }
// }
// //Khởi tạo instance
// const user = new User("Hoàng An", 33);
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Boy extends Person {
    getName() {
        return this.name;
    }
}
const boy = new Boy("An");
console.log(boy.getName());
//# sourceMappingURL=main.js.map