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

POST /api/employers/company

2. Update Company

PATCH /api/employers/company/:id

3. Delete Company

DELETE /api/employers/company/:id

## Company Document

1. Get list document

GET /api/employers/company/documents

2. Create document

POST /api/employers/company/documents

3. Update document

PATCH /api/employers/company/documents/:id

4. Delete document

DELETE /api/employers/company/documents/:id

## Profile

(Những nhân viên quản lý trong khu vực dành cho nhà tuyển dùng)

1. Get list profiles

GET /api/emloyers/company/profiles

2. Create profile

POST /api/employers/company/profiles

3. Delete profile

DELETE /api/employers/company/profiles/:id

2. Assign profile (user exsiting)

PATCH /api/employers/company/profiles

## Address

1. Get list address

GET /api/employers/company/address

2. Create address

POST /api/employers/company/address

3. Update address

PATCH /api/employers/company/address/:id

4. Update Headquarter

PATCH /api/employers/company/address/:id/headquarter

5. Delete Address

DELETE /api/employers/company/address/:id
