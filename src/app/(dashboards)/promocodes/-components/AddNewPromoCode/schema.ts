import { z } from "zod";

export const PromoCodeSchema = z
  .object({
    code: z.string().min(1, "Промокод обов'язковий до заповнення"),
    type: z.enum(["fixed", "percent"]),
    newPrice: z.coerce.number().optional(),
    percentDiscount: z.coerce.number().optional(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.type === "fixed") {
        return data.newPrice !== undefined;
      } else if (data.type === "percent") {
        return data.percentDiscount !== undefined;
      }
      return false;
    },
    {
      message: "Поле обов'язкове до заповнення",
      path: ["newPrice", "percentDiscount"],
    }
  );

export type PromoCodeType = z.infer<typeof PromoCodeSchema>;
