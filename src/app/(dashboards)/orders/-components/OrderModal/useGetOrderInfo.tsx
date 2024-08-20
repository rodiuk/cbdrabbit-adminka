import React from "react";
import { getFullOrderById } from "@/libs/api/order.api";
import { IOrderFull } from "@/types/interfaces/order.interface";

export const useGetOrderInfo = (orderId?: string | null) => {
  const [order, setOrder] = React.useState<IOrderFull | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      (async function fetch() {
        try {
          const order = await getFullOrderById(orderId);
          if (order?.id) {
            setOrder(order);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [orderId]);

  const title = React.useMemo(() => {
    if (!order) return "Завантажуємо інформацію...";

    return `Замовлення: #${order?.checkId}`;
  }, [order]);

  return {
    order,
    isLoading,
    title,
  };
};
