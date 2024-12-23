import React from "react";
import { getFullInstagramOrderById } from "@/libs/api/instagram-order.api";
import { IInstagramOrderFull } from "@/types/interfaces/instagramOrder.interface";
import { createUrlForCheckout } from "@/libs/api/mono.api";

export const useOrderData = (orderId?: string | null) => {
  const [order, setOrder] = React.useState<IInstagramOrderFull | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  const generatePaymentLink = async (orderId: string) => {
    try {
      setIsGenerating(true);
      const res = await createUrlForCheckout(orderId);
      if (res?.pageUrl) {
        setOrder((prev) => ({
          ...prev!,
          paymentLink: res.pageUrl,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      (async function fetch() {
        try {
          const order = await getFullInstagramOrderById(orderId);
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

    return `Інстаграм замовлення: #${order?.checkId}`;
  }, [order]);

  return {
    order,
    generatePaymentLink,
    isGenerating,
    isLoading,
    title,
  };
};
