import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const UpdateInstagramOrderFormSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  comment: z.coerce.string().optional().nullable(),
  customerInitials: z.coerce.string().optional().nullable(),
  customerPhone: z.coerce.string().optional().nullable(),
  customerAddress: z.coerce.string().optional().nullable(),
  customerNickname: z.coerce.string().optional().nullable(),
  totalSum: z.coerce.number().optional().nullable(),
  itemPrice: z.coerce.number().optional().nullable(),
  trackingNumber: z
    .string()
    .max(14, "Номер ТТН повинен містити 14 символів")
    .optional()
    .nullable(),
});

export type UpdateInstagramOrderFormType = z.infer<
  typeof UpdateInstagramOrderFormSchema
>;
