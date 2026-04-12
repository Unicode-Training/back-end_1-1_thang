# CRUD

## Insert

```sql
INSERT INTO tenbang(tencot1, tencot2, tencot3)
VALUES(giatri1, giatri2, giatri3)
```

Lưu ý: Nếu giá trị là string => Thêm dấu nháy đơn (')

## Update

Bắt buộc phải có WHERE (Mệnh đề xác định điều kiện)

```sql
WHERE dieukien
```

tencot toantu giatri

```sql
UPDATE tenbang
SET
    tencot1=giatri1,
    tencot2=giatri2
WHERE dieukien
```

## Delete

Bắt buộc phải có WHERE (Mệnh đề xác định điều kiện)

```sql
DELETE FROM tenbang WHERE dieukien
```

## Queries

Lấy tất cả dữ liệu

```sql
SELECT * FROM tenbang
```

```sql
SELECT tencot1, tencot2,... FROM tenbang
```

Lọc dữ liệu

```sql
WHERE dieukien
```

Toán tử

`> , >=, <, <=, <>, !=, =`
`IS NULL`
`AND, OR, NOT`
`LIKE`
`BETWEEN`
`IN`
`EXISTS`

## Sắp xếp

```sql
ORDER BY tencot kieusapxep, tencot2 kieusapxep
```

kieusapxep

- ASC: Sắp xếp tăng dần (Mặc định, không cần viết)
- DESC: Sắp xếp giảm dần

## Limit / Offset

```sql
LIMIT number OFFSET number
```

## Relationship (Bắt buộc phải có khóa ngoại)

1. Quan hệ 1-1

- 1 bản ghi của bảng này chỉ liên kết tới 1 bản ghi của bảng khác
- Khóa ngoại phải là unique

2. Quan hệ 1-1

- 1 bản ghi của bảng này có thể liên kết tới 1 hoặc nhiều bản ghi của bảng khác

3. Quan hệ n-n

Bắt buộc phải có bảng trung gian

## Join

- Inner join: Lấy phần giao nhau giữa 2 bảng
- Left join: Lấy tất cả dữ liệu của bảng viết phía trước mệnh đề join

Cách join nhiều bảng

```sql
SELECT *
FROM bang1
JOIN bang2
ON lienket1va2
JOIN bang3
ON lienket2va3
JOIN bang4
ON lienket3va4
```
