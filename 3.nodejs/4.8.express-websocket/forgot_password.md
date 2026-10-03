# Chức năng quên mật khẩu

## Endpoint 1: Kiểm tra sự tồn tại của tài khoản

- User gửi email lên Backend
- Backend check email có tồn tại hay không?
- Nếu tồn tại: Tạo OTP, thời gian 1 phút, lưu redis
- Gửi email cho user đó

## Endpoint 2: Reset password

- User gửi OTP, password lên backend
- Backend kiểm tra otp có tồn tại trên Redis hay không?
- Nếu có: Cập nhật lại mật khẩu cho user (Hash password)
- Xóa otp trên redis
- Gửi email
