import z from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .refine(
      (name: string) => {
        return name === name.toUpperCase();
      },
      {
        message: "Tên phải viết hoa",
      },
    )
    .prefault(""),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Email invalid"))
    .prefault(""),
  status: z
    .enum(["active", "inactive"], "Status invalid")
    .transform((value: string) => value === "active")
    .optional(),
  images: z.array(z.string({ error: "Ảnh không hợp lệ" }), "Không hợp lệ"),
});

//mass assignment
//Ví dụ:
//Database, bảng users có các trường
// - id
// - name
// - email
// - password
// - status
