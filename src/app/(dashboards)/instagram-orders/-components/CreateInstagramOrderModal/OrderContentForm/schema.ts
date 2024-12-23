import { z } from "zod";

export const InstagramOrderFormSchema = z.object({
  comment: z.string().optional().nullable(),
  totalSum: z.number(),
  itemPrice: z.number(),

  customerInitials: z.string().optional().nullable(),
  customerPhone: z.string().optional().nullable(),
  customerAddress: z.string().optional().nullable(),
});

export type InstagramOrderFormType = z.infer<typeof InstagramOrderFormSchema>;
