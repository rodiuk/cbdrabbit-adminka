import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/Toast/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrackingNumberSchema, TrackingNumberType } from "./schema";
import { addOrUpdateTrackingNumberToOrder } from "@/libs/api/order.api";

export const useAddTrackingNumber = (
  orderId: string,
  handleClose: () => void,
  currentTrackingNumber?: string | null
) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackingNumberType>({
    resolver: zodResolver(TrackingNumberSchema),
    defaultValues: {
      trackingNumber: currentTrackingNumber || "",
    },
  });

  const onSubmit = async (data: TrackingNumberType) => {
    try {
      setIsLoading(true);
      await addOrUpdateTrackingNumberToOrder(orderId, data.trackingNumber);
      toast("success", "Успішно", "ТТН успішно додано до замовлення");
      handleClose();
    } catch (error) {
      toast("error", "Уппссс....", "Виникла помилка при додаванні ТТН");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading: isLoading || isSubmitting,
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
};
