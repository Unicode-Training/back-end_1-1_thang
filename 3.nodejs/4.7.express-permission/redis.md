# Các lệnh redis cli

- Kết nối redis thông qua cli: npx redis-cli -p {port}
- Lấy danh sách các keys: `keys *`
- Lấy value 1 key: `get {ten-key}`
- Set value cho 1 key: `set {ten-key}`
- Kiểm tra thời gian của 1 key: `ttl {ten-key}`
- Set thời gian cho 1 key: `expire {ten-key}`
- Xóa 1 key: `del {ten-key}`
- Xóa tất cả các key: `flushall`
- Chọn DB: `select {db_index}` (Từ 0 đến 15)
