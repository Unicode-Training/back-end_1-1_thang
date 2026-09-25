# Chức năng kích hoạt tài khoản

Có 2 cách:

- Dùng link active
- Dùng OTP -> Nên dùng

## Quy trình

### Bước 1: User đăng ký tài khoản

- Insert Database (status = false)
- Tạo OTP 6 số, thời hạn 5 phút -> Lưu redis
- Gửi email cho người dùng
- Trả về token (Tự động đăng nhập)

## Bước 2: Xác thực tài khoản

- Xây dựng endpoint API nhận OTP
- Check OTP có tồn tại hay không?, còn hạn hay không?
- Hợp lệ -> cập nhật status trong Database -> xóa OTP
- Gửi email chúc mừng
