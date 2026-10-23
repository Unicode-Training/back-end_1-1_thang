# Endpoint

## Auth

1. Register

POST /api/auth/register

Body:

```json
{
    "name": "string",
    "email": "string",
    "password": "password",
    "role": "CANDIDATE" | "EMPLOYER"
}
```

2. Login

POST /api/auth/login

Body:

```json
{
  "email": "string",
  "password": "string"
}
```

## Uloads

1. Upload Logo

POST /api/upload/logo

Body:

```
file: Binary file
replacePath: string
```

## Company

1. Create Company

POST /api/employer/company

2. Update Company

PATCH /api/employer/company/:id

3. Delete Company

DELETE /api/employer/company/:id

## Company Document

1. Get list document

GET /api/employer/company/documents

2. Create document

POST /api/employer/company/documents

3. Update document

PATCH /api/employer/company/documents/:id

4. Delete document

DELETE /api/employer/company/documents/:id

## Profile

(Những nhân viên quản lý trong khu vực dành cho nhà tuyển dùng)

1. Get list profiles

GET /api/emloyer/company/profiles

2. Create profile

POST /api/employer/company/profiles

3. Delete profile

DELETE /api/employer/company/profiles/:id

## Address

1. Get list address

GET /api/employer/company/address
