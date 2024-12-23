import { z } from "zod";

export const TrackingNumberSchema = z.object({
  trackingNumber: z
    .string()
    .min(14, "Номер ТТН повинен містити 14 символів")
    .max(14, "Номер ТТН повинен містити 14 символів"),
});

export type TrackingNumberType = z.infer<typeof TrackingNumberSchema>;
