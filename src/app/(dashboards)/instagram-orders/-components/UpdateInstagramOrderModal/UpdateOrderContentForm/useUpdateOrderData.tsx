import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { UpdateInstagramOrderFormType } from "./schema";
import { updateManagerInstagramOrder } from "@/libs/api/instagram-order.api";
import {
  ICreateInstagramOrderItemFull,
  IInstagramOrderFull,
} from "@/types/interfaces/instagramOrder.interface";

export const useUpdateInstagramOrderData = (
  order: IInstagramOrderFull,
  onClose?: () => void
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [orderItems, setOrderItems] = React.useState<
    ICreateInstagramOrderItemFull[]
  >([]);

  React.useEffect(() => {
    if (order?.orderItems) {
      setOrderItems(order.orderItems);
    }
  }, []);

  const toast = useToast();

  const onUpdate = async (data: UpdateInstagramOrderFormType) => {
    try {
      setIsLoading(true);
      const updatedOrder = await updateManagerInstagramOrder(order.id, {
        ...data,
        orderItems: orderItems?.map((item) => ({
          productId: item?.product?.id!,
          quantity: item.quantity,
        })),
      });

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
    orderItems,
    setOrderItems,
  };
};
