import { z } from "zod";

export const InstagramOrderFormSchema = z.object({
  comment: z.coerce.string().optional().nullable(),
  totalSum: z.coerce.number(),
  itemPrice: z.coerce.number(),

  customerInitials: z.string().optional().nullable(),
  customerPhone: z.string().optional().nullable(),
  customerAddress: z.string().optional().nullable(),
  customerNickname: z.string().optional().nullable(),
});

export type InstagramOrderFormType = z.infer<typeof InstagramOrderFormSchema>;
