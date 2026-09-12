# Schema

```sql
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'student' -- 'student' hoặc 'instructor'
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    instructor_id INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(200) NOT NULL,
    duration_minutes INT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    progress INT DEFAULT 0, -- Từ 0 đến 100 (%)
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'success', -- 'success', 'failed', 'pending'
    payment_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Users
INSERT INTO users (name, email, role) VALUES
('Nguyen Van A', 'a@example.com', 'student'),
('Tran Thị B', 'b@example.com', 'student'),
('Le Van C', 'c@example.com', 'student'),
('Pham D', 'd@example.com', 'student'),
('Giảng viên X', 'gv.x@unicode.vn', 'instructor'),
('Giảng viên Y', 'gv.y@unicode.vn', 'instructor');

-- Courses
INSERT INTO courses (title, instructor_id, price) VALUES
('Node.js & Backend Architecture', 5, 1500000),
('Next.js App Router Masterclass', 5, 1200000),
('Cơ bản về Git & GitHub', 6, 0),
('Hệ thống Message Queue với BullMQ', 5, 2000000);

-- Lessons
INSERT INTO lessons (course_id, title, duration_minutes) VALUES
(1, 'Express.js cơ bản', 45), (1, 'Database Design & Prisma', 60), (1, 'JWT Authentication', 50),
(2, 'Server Components vs Client Components', 55), (2, 'Data Fetching & Caching', 65),
(3, 'Cài đặt Git cơ bản', 30), (3, 'Các lệnh Git thường dùng', 40),
(4, 'Giới thiệu Redis & BullMQ', 50), (4, 'Xử lý Background Jobs', 70);

-- Enrollments
INSERT INTO enrollments (user_id, course_id, progress) VALUES
(1, 1, 100), (1, 2, 50), (1, 3, 100),
(2, 1, 20), (2, 4, 0),
(3, 3, 100), (3, 2, 80),
(4, 3, 10);

-- Payments
INSERT INTO payments (user_id, course_id, amount, status, payment_date) VALUES
(1, 1, 1500000, 'success', '2025-10-01'),
(1, 2, 1200000, 'success', '2025-10-15'),
(2, 1, 1500000, 'success', '2025-11-05'),
(2, 4, 2000000, 'pending', '2025-11-10'),
(3, 2, 1200000, 'success', '2025-11-20');
```

## Bài tập

Bài 1:

Viết truy vấn lấy ra danh sách tất cả các học viên (users có role = 'student') kèm theo tên khóa học họ đã đăng ký và số tiền họ đã thanh toán thành công.

Yêu cầu kết quả: Tên học viên, Tên khóa học, Số tiền thanh toán.

Bài 2:

Tìm các khóa học có giá bán (price) cao hơn mức giá trung bình của tất cả các khóa học hiện có trên hệ thống.

Yêu cầu kết quả: ID khóa học, Tên khóa học, Giá bán.

Bài 3:

Tìm những học viên đã mua khóa học (có bản ghi trong bảng payments với status = 'success') nhưng chưa hoàn thành khóa học đó (progress < 100).

Yêu cầu kết quả: Tên học viên, Tên khóa học, Tiến độ hiện tại (progress).

Bài 4:
Mỗi bài học (lessons) có một thời lượng (duration_minutes). Hãy tính tổng thời lượng của mỗi khóa học. Sau đó, tìm ra top 2 khóa học có tổng thời lượng bài học dài nhất.

Yêu cầu: Tìm hiểu WITH để tạo bảng tạm chứa tổng thời lượng trước khi filter.

Bài 5:

Viết truy vấn sử dụng WITH để tạo Báo cáo doanh thu và học viên cho từng khóa học bao gồm:

- ID và Tên khóa học.

- Tên giảng viên phụ trách.

- Tổng số lượng học viên đã đăng ký (dựa vào enrollments).

- Tổng doanh thu thực tế (chỉ tính các payments có status = 'success').

Lưu ý: Chỉ lấy ra những khóa học có ít nhất 1 học viên đăng ký.
