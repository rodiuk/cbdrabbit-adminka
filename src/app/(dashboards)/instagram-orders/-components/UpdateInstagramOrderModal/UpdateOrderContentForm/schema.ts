import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const UpdateInstagramOrderFormSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  comment: z.string().optional().nullable(),
  customerInitials: z.string().optional().nullable(),
  customerPhone: z.string().optional().nullable(),
  customerAddress: z.string().optional().nullable(),
  totalSum: z.number().optional().nullable(),
  itemPrice: z.number().optional().nullable(),
  trackingNumber: z
    .string()
    .max(14, "Номер ТТН повинен містити 14 символів")
    .optional()
    .nullable(),
});

export type UpdateInstagramOrderFormType = z.infer<
  typeof UpdateInstagramOrderFormSchema
>;
