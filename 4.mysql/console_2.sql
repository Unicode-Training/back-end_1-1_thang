# SELECT COUNT(*) AS users_count, status FROM users
# GROUP BY status
# HAVING users_count > 2;

-- Tính tổng số tiền mà các user đã bỏ ra để mua khóa học
SELECT users.*, SUM(courses.price) as total_cost
FROM users
INNER JOIN users_courses
ON users.id = users_courses.user_id
INNER JOIN courses
ON users_courses.course_id = courses.id
GROUP BY users.id
ORDER BY total_cost DESC
LIMIT 1