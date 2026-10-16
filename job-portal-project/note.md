# Codebase

- public: Chứa folder upload (static files)
- src/constants: Chứa các hằng số cố định: QUEUE, CACHE KEYS,...
- src/controllers: Chứa các file controllers
- src/exceptions: Chứa các file exception (Thông báo lỗi)
- src/libs: Chứa các file cấu hình của thư viện
- src/mail: Chứa template mail (.ejs)
- src/middlewares: Chứa các file middleware
- src/prisma: Chứa các schema (models), generated (prisma client)
- src/queue: Chứa các file queue
- src/routes: Chứa các file cấu hình routes
- src/schedulers: Chứa các tác vụ liên quan đến việc lập lịch (Chạy tự động). Ví dụ: 9h sáng quét toàn bộ ứng viên -> gửi job phù hợp
- src/services: Chứa các file logic nghiệp vụ
- src/socket: Xử lý websocket
- src/subscribe: Chứa logic xử lý Redis Subscriber
- src/types: Định nghĩa type cho dự án
- src/utils: Chứa các hàm xử lý độc lập
- src/validators: Chứa file schema của zod
- src/workers: Chứa các file workers để xử lý queue

## Phân tích dự án

1. Phân hệ nhà tuyển dụng

- Quản lý jobs
- Quản lý ứng viên
- Quản lý công ty
- Quản lý hồ sơ (Giấy tờ pháp lý)

2. Phân hệ ứng viên

- Quản lý CV, thông tin cá nhân, kinh nghiệm, học vấn
- Luồng ứng tuyển: Những job đã ứng tuyển, trạng thái ứng tuyển, lịch phỏng vấn

3. Phân hệ quản trị

- Quản lý nhà tuyển dụng: Phê duyệt, khóa,...
- Xem danh sách ứng viên
- Theo dõi doanh thu (Từ nhà tuyển dụng)
- Quản lý ngành nghề, mức lương, kinh nghiệm,...
