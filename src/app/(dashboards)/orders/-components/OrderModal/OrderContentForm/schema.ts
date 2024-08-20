import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const OrderFormSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  serviceComment: z.string().optional().nullable(),
  trackingNumber: z
    .string()
    .max(14, "Номер ТТН повинен містити 14 символів")
    .optional()
    .nullable(),
});

export type OrderFormType = z.infer<typeof OrderFormSchema>;
