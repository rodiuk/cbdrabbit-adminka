import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Введіть коректний email")
    .max(255, "Email занадто довгий"),
  password: z
    .string()
    .min(6, "Пароль занадто короткий. Мінімум 6 символів")
    .max(255, "Пароль занадто довгий"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
