# Xây dựng RESTful API

Xây dựng API quản lý sản phẩm theo các yêu cầu sau

Thông tin sản phẩm

- id: Dùng UUID để generate
- sku: Mã sản phẩm
- name: Tên sản phẩm
- price: Giá sản phẩm
- thumbnail: Ảnh sản phẩm
- images: Chứa nhiều ảnh thư viện sản phẩm
- createdAt: Thời gian tạo sản phẩm
- updatedAt: Thời gian cập nhật sản phẩm

Lưu trữ vào file json, dùng fs để CRUD

- GET /api/products --> Trả về danh sách sản phẩm
- GET /api/products/:id --> Trả về thông tin chi tiết sản phẩm
- POST /api/products --> Thêm sản phẩm
- PATCH /api/products/:id --> Cập nhật sản phẩm (Gửi thông tin nào cập nhật thông tin đó)
- DELETE /api/products/:id --> Xóa sản phẩm
- POST /api/uploads --> Upload ảnh --> Response sẽ trả về link ảnh tuyệt đối sau khi đã upload

Lưu ý:

- Thumbnail sẽ nhận vào 1 chuỗi
- Images sẽ chứa 1 mảng chuỗi
- Validation đầy đủ, check sku trùng lặp
- Error Handling đầy đủ
