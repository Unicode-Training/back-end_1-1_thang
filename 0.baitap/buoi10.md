# Bài tập buổi 10 (Prisma)

## Schema

Tạo model `Product` có tên `product.prisma`

- id: Kiểu Int, tự động tăng, primary key
- name: Kiểu String, bắt buộc
- price: Kiểu Float, bắt buộc
- description: Kiểu String, không bắt buộc
- createdAt: Kiểu DateTime, db kiểu Timestamp tự động lấy thời gian hiện tại
- updatedAt: Kiểu DateTime, db kiểu Timestamp tự động lấy thời gian hiện tại

## Yêu cầu chức năng

- GET /api/products: Lấy toàn bộ danh sách sản phẩm
- GET /api/products/:id: Lấy thông tin chi tiết của một sản phẩm theo id. Nếu không tìm thấy, trả về lỗi 404.
- POST /api/products: Tạo mới một sản phẩm. Yêu cầu validate bắt buộc phải có name và price. Trả về sản phẩm vừa tạo với mã 201.
- PATCH /api/products/:id: Cập nhật thông tin sản phẩm theo id. Trả về sản phẩm sau khi sửa.
- DELETE /api/products/:id: Xóa sản phẩm theo id. Trả về thông báo xóa thành công.

Params với endpoint `GET /api/products`

- search: Tìm kiếm sản phẩm theo tên hoặc mô tả
- minPrice: Lọc các sản phẩm có giá >= giá trị truyền vào
- maxPrice: Lọc các sản phẩm có giá <= giá trị truyền vào
- limit: Giới hạn số lượng sản phẩm trả về
- fields: Tên cột muốn trả về (Ví dụ: `GET /api/products?fields=id,name,price` sẽ chỉ trả về 3 field). Nếu không truyền vào hoặc để trống (`fields=`) sẽ hiển thị tất cả
