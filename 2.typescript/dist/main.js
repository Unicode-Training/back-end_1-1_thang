"use strict";
//Kiểu dữ liệu cơ bản
// - string, number, boolean, symbol, null, undefined
// - any, unknown
// - void
// - array
// - tuple
// - object
Object.defineProperty(exports, "__esModule", { value: true });
try {
    const error = new Error("Có lỗi gì đó");
    error.status = 500;
}
catch (error) {
    if (error instanceof Error) {
        const err = error;
        console.log(err.message);
        console.log(err.status);
    }
}
//a = new A();
// A = Constructor, Class
// a = object, instance
//# sourceMappingURL=main.js.map