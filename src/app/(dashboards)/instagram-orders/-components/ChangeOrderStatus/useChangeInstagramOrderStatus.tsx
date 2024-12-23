import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { SelectChangeEvent } from "@mui/material";
import { InstagramOrder, OrderStatus } from "@prisma/client";
import { changeInstagramOrderStatus } from "@/libs/api/instagram-order.api";

export const useChangeInstagramOrderStatus = (
  order: InstagramOrder,
  onClose?: () => void
) => {
  const [status, setStatus] = React.useState<OrderStatus | null>(
    order?.status || null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  React.useLayoutEffect(() => {
    !!order?.status && setStatus(order?.status);
  }, [order]);

  const onChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setStatus(event.target.value as OrderStatus);
  };

  const updateStatus = async () => {
    try {
      if (!status) return;

      setIsLoading(true);
      await changeInstagramOrderStatus(order.id, status);
      toast("success", "Успіх", "Статус замовлення успішно змінено!");
      onClose && onClose();
    } catch (error) {
      toast(
        "error",
        "Помилка",
        "Не вдалося змінити статус замовлення! Спробуйте ще раз."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    status,
    onChange,
    updateStatus,
  };
};
