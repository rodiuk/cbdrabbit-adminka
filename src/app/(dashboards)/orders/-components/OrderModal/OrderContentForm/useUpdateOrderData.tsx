import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { updateManagerOrder } from "@/libs/api/order.api";
import { OrderFormType } from "./schema";

export const useUpdateOrderData = (orderId: string, onClose?: () => void) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toast = useToast();

  const onUpdate = async (data: OrderFormType) => {
    try {
      setIsLoading(true);
      const updatedOrder = await updateManagerOrder(orderId, data);

      if (updatedOrder) {
        toast("success", "Успіх", "Замовлення успішно оновлено!");
        onClose?.();
        return;
      }
      toast("error", "Помилка", "Не вдалося оновити замовлення!");
    } catch (error) {
      toast("error", "Помилка", "Не вдалося оновити замовлення!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onUpdate,
  };
};
