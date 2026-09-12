# CREATE DATABASE db01;

-- Comment trong sql
# Comment trong sql

-- 1. Insert record vào table
-- use db01; -- Chọn db de lam viec
# INSERT INTO users(name, email, status)
# VALUES
#     ('User 2', 'user2@gmail.com', false),
#     ('User 3', 'user3@gmail.com', false),
#     ('User 4', 'user4@gmail.com', true);

-- 2. Update record trong table
# UPDATE users
# SET
#     name = 'An Unicode',
#     status = false
# WHERE id = 1

-- 3. Delete record trong table
# DELETE FROM users
# WHERE id = 1;

# SELECT * FROM users
# ORDER BY created_at DESC, status DESC, id DESC

# SELECT * FROM users
# ORDER BY id DESC
# LIMIT 1,2

# SELECT users.*, phone.phone as phone_number
# FROM users
#     LEFT JOIN phone
# ON users.id = phone.user_id
# ORDER BY users.id DESC

-- Truy vấn danh sách post và tên user cua tung post
# SELECT posts.*, users.name
# FROM posts
# LEFT JOIN users
# ON posts.user_id = users.id

-- Truy van danh sach post cua user co so dien thoai la 0123
# SELECT posts.*
# FROM posts
# JOIN users
# ON posts.user_id = users.id
# JOIN phone
# ON users.id = phone.user_id
# WHERE phone.phone = '0123'

-- Lấy danh sách khóa học của user có email là user2@gmail.com
# SELECT courses.*, users.email
# FROM courses
# JOIN users_courses
# ON courses.id = users_courses.course_id
# JOIN users
# ON users_courses.user_id = users.id
# WHERE users.email = 'user2@gmail.com'