# Chức năng đổi mật khẩu

Lưu ý: Chức này dành cho user vẫn đăng nhập

## Luồng

- User gửi mật khẩu cũ, mật khẩu mới lên backend (Kèm token)
- Backend kiểm tra tính hợp lệ mật khẩu cũ
- Nếu đúng: Cập nhật mật khẩu mới (Hash)
- Gửi email cho user
