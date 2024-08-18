import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email("Email не валідний").max(255),
  password: z
    .string()
    .min(8, "Мінімальна довжина паролю - 8 символів")
    .max(255, "Пвроль надто довгий"),
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  phoneNumber: z
    .string()
    .regex(
      /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}?\)?[-.\s]?)?[\d\s-]{7,10}$/,
      "Номер телефону не валідний. Спробуйте щось на зразок +380123456789"
    )
    .min(10, "Мінімальна довжина номера телефону - 10 символів")
    .max(15, "Номер телефону надто довгий"),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
