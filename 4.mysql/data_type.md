# Các kiểu dữ liệu Mysql

## Number

- tinyint: Kiểu số nguyên (Lưu trữ -128 đến 127)
- int: Kiểu số nguyên
- bigInt: Kiểu số nguyên (Kích thước lớn hơn)
- double: Kiểu số thực (Có phần thập phân)
- float: Kiểu số thực (Lưu trữ nhỏ hơn double)

## String

- char(n): Chuỗi nhưng độ dài cố định. Ví dụ: char(5)
- varchar(n): Chuỗi nhưng độ dài biến đổi
- text: Chuỗi không xác định độ dài
- enum: Danh sách chuỗi cố định: (pending, completed, cancel,...)

## Datetime

- date: Chỉ lưu trữ ngày tháng năm (YYYY-MM-DD)
- datetime: Lưu trữ ngày tháng năm và thời gian (YYYY-MM-DD HH:mm:ss)
- timestamp: Lưu trữ ngày tháng năm và thời gian (Tự chuyển về múi giờ UTC để lưu trữ)
