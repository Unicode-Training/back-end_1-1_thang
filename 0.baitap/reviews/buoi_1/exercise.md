# Bài tập Promise và Class

## Bài 1:

Cho 3 hàm sau:

```js
function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve("User Data"), 2000));
}

function fetchPosts() {
  return new Promise((resolve) => setTimeout(() => resolve("Post Data"), 3000));
}

function fetchComments() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Comment Data"), 1000),
  );
}
```

Yêu cầu:

- Dùng Promise.all để lấy kết quả từ cả 3 Promise.
- Tính tổng thời gian chạy của cả 3 Promise.

## Bài 2

Giả lập một tình huống có 3 server API, bạn cần lấy dữ liệu từ server nhanh nhất.

```js
function fetchFromServer1() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 1 Response"), 3000),
  );
}

function fetchFromServer2() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 2 Response"), 2000),
  );
}

function fetchFromServer3() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Server 3 Response"), 1000),
  );
}
```

Yêu cầu: Sử dụng Promise.race để lấy kết quả từ server phản hồi nhanh nhất

## Bài 3

Viết một hàm retry(fn, times) thực thi một Promise function fn, nếu thất bại thì thử lại tối đa times lần.

```js
function retry(fn, times) {
  // Viết code ở đây
}

let failingPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.7 ? resolve("Thành công") : reject("Thất bại");
  });
};

retry(failingPromise, 3).then(console.log).catch(console.error);
```

## Bài 4

Giả sử có một danh sách các hàm trả về Promise. Hãy viết một hàm runInSequence(tasks) để thực thi từng Promise theo thứ tự.

```js
const tasks = [
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve("Task 1 hoàn thành"), 2000),
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve("Task 2 hoàn thành"), 1000),
    ),
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve("Task 3 hoàn thành"), 1500),
    ),
];

function runInSequence(tasks) {
  // Viết code ở đây
}

runInSequence(tasks).then(console.log);
```

Output mong muốn:

```js
["Task 1 hoàn thành", "Task 2 hoàn thành", "Task 3 hoàn thành"];
```

## Bài 5

Giả sử bạn có 10 API cần gọi nhưng muốn giới hạn tối đa chỉ 3 API chạy cùng lúc. Viết một hàm runWithLimit(tasks, limit) để đảm bảo điều này.

```js
const tasks = Array.from(
  { length: 10 },
  (_, i) => () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve(`Task ${i + 1} hoàn thành`),
        Math.random() * 3000,
      ),
    ),
);

function runWithLimit(tasks, limit) {
  // Viết code ở đây
}

runWithLimit(tasks, 3).then(console.log);
```

Yêu cầu:

- Chỉ chạy tối đa limit Promise cùng lúc.
- Khi một Promise hoàn thành, một Promise mới được thêm vào.

## Bài 6

Viết một hàm PromiseTimeout để tự động reject nếu promise chạy quá lâu.

```js
function PromiseTimeout(promise, ms) {
  // Viết code ở đây
}

const longTask = new Promise((resolve) =>
  setTimeout(() => resolve("Xong!"), 5000),
);

PromiseTimeout(longTask, 2000).then(console.log).catch(console.error);
```

Kết quả mong muốn:

- Nếu longTask mất ≤ 2 giây, in "Xong!"
- Nếu longTask mất > 2 giây, in "Timeout Error!"

## Bài 7

Viết một hàm retryWithBackoff(fn, retries, delay) giúp thực hiện lại Promise thất bại, với mỗi lần retry sẽ tăng delay gấp đôi.

```js
function retryWithBackoff(fn, retries, delay) {
  // Viết code ở đây
}

const failingTask = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.8
      ? resolve("Thành công!")
      : reject("Thất bại, thử lại...");
  });
};

retryWithBackoff(failingTask, 5, 1000).then(console.log).catch(console.error);
```

Yêu cầu:

- Nếu thất bại, thử lại sau 1000ms, 2000ms, 4000ms, ... cho đến retries lần.
- Nếu vẫn thất bại sau retries lần, reject.

## Bài 8

Viết một hệ thống quản lý nhân viên gồm:

- Class Employee có các thuộc tính: name, age, salary và phương thức getInfo().
- Class Developer kế thừa từ Employee, thêm thuộc tính programmingLanguage.
- Class Manager kế thừa từ Employee, thêm thuộc tính employees (mảng các nhân viên mà họ quản lý).
- Manager có phương thức addEmployee(employee) để thêm nhân viên vào danh sách.

```js
class Employee {
  // Viết code ở đây
}

class Developer extends Employee {
  // Viết code ở đây
}

class Manager extends Employee {
  // Viết code ở đây
}

const dev1 = new Developer("John", 28, 5000, "JavaScript");
const dev2 = new Developer("Jane", 30, 5500, "Python");

const manager = new Manager("Alice", 35, 8000);
manager.addEmployee(dev1);
manager.addEmployee(dev2);

manager.getInfo();
// Output:
// Alice - Tuổi: 35 - Lương: 8000
// Quản lý nhân viên:
//  - John, Ngôn ngữ: JavaScript
//  - Jane, Ngôn ngữ: Python
```

## Bài 9

Viết một class Car và Bicycle, cả hai đều có phương thức move().
Sau đó, viết một hàm start(vehicle) chỉ nhận những object có phương thức move().

```js
class Car {
  // Viết code ở đây
}

class Bicycle {
  // Viết code ở đây
}

function start(vehicle) {
  if (typeof vehicle.move === "function") {
    vehicle.move();
  } else {
    console.log("Không thể di chuyển!");
  }
}

const car = new Car();
const bike = new Bicycle();

start(car); // Xe hơi đang chạy...
start(bike); // Xe đạp đang chạy...
start({}); // Không thể di chuyển!
```