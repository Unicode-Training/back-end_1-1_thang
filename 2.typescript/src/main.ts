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

// class Person {
//   protected name: string;
//   public static email: string = "hoangan.web@gmail.com";

//   constructor(name: string) {
//     this.name = name;
//   }
//   getEmail() {
//     //Làm sao để gọi thuộc tính static
//     //this = instance --> chuyển về class
//     const myClass = this.constructor as typeof Person;
//     console.log(myClass.email);
//   }
// }
// const person = new Person("An");
// // console.log(person.email);

// console.log(person.getEmail());

// const arr: string[] = []; //arr là instance của Array
// console.log(arr.constructor);

// class Calc {
//   private result: number;
//   constructor(initValue: number) {
//     this.result = initValue;
//   }
//   add(value: number) {
//     this.result += value;
//     return this;
//   }
//   minus(value: number) {
//     this.result -= value;
//     return this;
//   }
//   multi(value: number) {
//     this.result *= value;
//     return this;
//   }
//   divi(value: number) {
//     this.result /= value;
//     return this;
//   }
//   get() {
//     return this.result;
//   }
// }

// const result1 = new Calc(10).add(5).minus(3).get();
// console.log(result1);
// const result2 = new Calc(10).add(5).minus(10).get();
// console.log(result2);

//Lưu ý: Thứ tự các hàm: add, minus, multi, divi có thể thay đổi

//new Calc(10) --> object
//.add(5) --> undefined
//.minus(3) --> Lỗi

//Cần định nghĩa ra các class tương ứng với loại lỗi
// NotFoundException("User not found"), status = 404
// BadRequestException("Validate failed"), status = 400
// UnauthorizeException("Unathorize"), status = 401
// class NotFoundException extends Error {
//   protected status: number;
//   constructor(message: string) {
//     super(message);
//     this.status = 400;
//   }
// }
// const running = () => {
//   //Khi có lỗi xảy ra --> throw Error kèm theo message, status
//   // const err: ErrorWithStatus = new Error("Quên chưa xác thực");
//   // err.status = 400;
//   // throw err;
//   throw new NotFoundException("User not found");
// };

// //Error Handling
// const errorHandling = () => {
//   try {
//     running();
//   } catch (error) {
//     if (error instanceof Error) {
//       const err: ErrorWithStatus = error;
//       console.log(`Đã có lỗi: ${err.message} và status là: ${err.status}`);
//     }
//   }
// };
// interface ErrorWithStatus extends Error {
//   status?: number;
// }
// errorHandling();

//Override
// class Person {
//   public name: string = "Hoàng An";
//   public email: string = "hoangan.web@gmail.com";

//   getName() {
//     return this.name;
//   }
// }

// class Boy extends Person {
//   getName() {
//     return "newName";
//   }
// }
// const boy = new Boy();
// console.log(boy.getName());

//Abstract class, abstract method
// - Abstract class không thể khởi tạo trực tiếp, bắt buộc phải thông qua kế thừa
// - abstract method bắt buộc phải nằm trong abstract class và phải là public, protected
// - abstract method không được phép triển khai, chỉ được khai báo
// - class kế thừa sẽ phải triển khai đầy đủ các abstract method

// Ứng dụng: Cần xây dựng class Base, các class con sẽ kế thừa từ class Base đó và ép các class con triển khai 1 số phương thức

// abstract class User {
//   public name: string = "Hoàng An";
//   getName() {
//     return this.name;
//   }
//   public abstract setName(value: string): void;
// }
// class NewUser extends User {
//   setName(value: string) {
//     this.name = value;
//   }
// }
// const newUser = new NewUser();
// console.log(newUser.name);

/*
Route --> Controller --> Service --> Repository --> Model

Repository là class trung gian giúp giao tiếp giữa logic nghiệp vụ (Service) và Model (Database)

Muốn làm việc với User:
- Model: User --> Làm việc table users bên Database
- Repository: UserRepository --> Liên kết tới model User, cần phải 1 số phương thức hay dùng
*/

// class UserModel {
//   public table = "users";

//   public getAllFromDb() {
//     //Truy vấn từ database
//     console.log("Truy vấn từ db");
//   }
// }

// abstract class BaseRepository {
//   protected model: any;
//   constructor() {
//     this.setModel();
//   }
//   abstract setModel(): void;

//   findAll() {
//     this.model.getAllFromDb();
//   }
//   findOne(id: number) {}

//   create(data: any[]) {}

//   update(id: number, data: []) {}

//   delete(id: number) {}
// }

// class UserRepository extends BaseRepository {
//   setModel() {
//     this.model = new UserModel();
//   }
// }
// const userRepository = new UserRepository();
// userRepository.findAll();

//Tính đa hình
//Nạp chồng (Overload)
//Dependency Injection

//Overload
// class UserService {
//   findUser(id: number): void;
//   findUser(email: string): void;
//   findUser(param: number | string): void {
//     if (typeof param === "number") {
//       console.log("Tìm kiếm theo id");
//     } else {
//       console.log("Tìm kiếm theo email");
//     }
//   }
// }

// const userService = new UserService();
// userService.findUser(1);
// userService.findUser("hoangan.web@gmail.com");

// function Logger2(target: Function) {
//   console.log(`Logging2... ${target.name}`);
//   console.log((target as typeof User).message);
// }
// const Logger = (input: string) => (target: Function) => {
//   console.log(`Logging... ${target.name}`);
//   console.log(input);
// };

// @Logger("Hello")
// @Logger2
// class User {
//   constructor(private name: string) {}
//   public static message = "Hello anh em";
// }
// const user = new User("Hoàng An");

// @Logger2
// class Customer {}
// const customer = new Customer();

// function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
//target: prototype của UserService
//   console.log(`Method: ${methodName} được gọi`);
//   console.log(`target: `, target);
//   console.log(descriptor);
//   console.log(descriptor.value);
// }
// function ReadOnly(target: any, propertyName: string) {
//   console.log(`Property: ${propertyName} được tạo`);
//   console.log(`Target:`, target);
// }
// class UserService {
//   @ReadOnly
//   public name: string = "hoàng an";
//   @Log
//   getName(value: string) {}
// }
// const userService = new UserService();

// class User {
//   private data = ["Item 1", "Item 2", "Item 3"];
//   private data2 = 0;
//   get latest(): string | undefined {
//     return this.data[this.data.length - 1];
//   }

//   set latest(value: string) {
//     this.data.push(value);
//   }

//   get value() {
//     return this.data2;
//   }

//   set value(number: number) {
//     //validate
//     this.data2 += number;
//   }
// }

// const user = new User();
// // user.latest = "Item 4"; //setter
// // console.log(user.latest); //getter

// user.value++;
// console.log(user.value);

// const Validate =
//   (number: number) =>
//   (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//     const originalGetter = descriptor.get;
//     descriptor.get = function () {
//       const value = originalGetter?.call(this);
//       if (value <= number) {
//         throw new Error("age invalid");
//       }
//       return value;
//     };
//   };

// const Validate = (
//   target: any,
//   propertyName: string,
//   descriptor: PropertyDescriptor,
// ) => {
//   const originalSetter = descriptor.set;
//   descriptor.set = function (value) {
//     if (value < 0) {
//       console.log(`${propertyName} không được âm`);
//       return;
//     }
//     originalSetter?.call(this, value);
//   };
// };

// class User {
//   private _age: number = 30;
//   private _total: number = 0;
//   //   @Validate(20)
//   get age() {
//     return this._age;
//   }
//   @Validate
//   set age(value: number) {
//     //validate
//     this._age = value;
//   }

//   @Validate
//   set total(value: number) {
//     this._total = value;
//   }
// }

// const user = new User();
// user.age = -30;
// // console.log(user.age);

// user.total = -10;

// function ParamLogger(target: any, methodName: string, paramIndex: number) {
//   console.log(`Parameter index: ${paramIndex} in method: ${methodName}`);
// }
// class AuthService {
//   login(username: string, @ParamLogger password: string) {
//     console.log(`Logging in...`);
//   }
// }

// function ValidateParams(
//   target: any,
//   methodName: string,
//   descriptor: PropertyDescriptor,
// ) {
//   const originalMethod = descriptor.value;
//   descriptor.value = function (...args: any) {
//     if (args.length !== 2) {
//       console.log("Số lượng đối số không hợp lệ");
//       return;
//     }
//     if (+args[1] === 0) {
//       console.log("Số chia không được bằng 0");
//       return;
//     }
//     return originalMethod.apply(this, args);
//   };
// }

// class Calc {
//   @ValidateParams
//   divi(a: number, b: number, c: number) {
//     return a / b;
//   }
// }

// const calc = new Calc();
// console.log(calc.divi(10, 2, 0));

// console.log(1000 ** 1000 === 2000 ** 2000);

//NaN --> xuất hiện khi ép kiểu về số thất bại

//Dependency Injection
import "reflect-metadata";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { ProductService } from "./services/ProductService";

//low level
//high level

//DI Container

const dependencies = Reflect.getMetadata("design:paramtypes", UserController);
// const instances = dependencies.map((dependency: any) => new dependency());

const DIContainer = (target: any) => {
  if (!target) {
    return [];
  }
  const result = target.map((dependency: any) => {
    const metadata = Reflect.getMetadata("design:paramtypes", dependency);
    //metadata --> mảng chứa class của từng tham số
    //[PostService]
    //new dependency(...metadata)
    return Reflect.construct(dependency, DIContainer(metadata)); //new A(...args)
  });
  return result;
};

const instanceArr = DIContainer(dependencies);

const controller = Reflect.construct(UserController, instanceArr);
controller.findAll();

//new UserController(instance1, instance2)
