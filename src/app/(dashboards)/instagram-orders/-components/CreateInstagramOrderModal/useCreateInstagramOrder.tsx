import React from "react";
import { getProductPrice } from "@/libs/api/products.api";
import { InstagramOrderFormType } from "./OrderContentForm/schema";
import { createInstagramOrder } from "@/libs/api/instagram-order.api";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";
import { useToast } from "@/hooks/Toast/useToast";

export const useCreateInstagramOrder = (onClose?: () => void) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = React.useState(false);
  const [orderItems, setOrderItems] = React.useState<
    ICreateInstagramOrderItemFull[]
  >([]);
  const [productPrice, setProductPrice] = React.useState<number>(0);

  const create = async (payload: InstagramOrderFormType) => {
    try {
      setIsLoading(true);
      const order = await createInstagramOrder({
        ...payload,
        orderItems: orderItems?.map((item) => ({
          productId: item?.product?.id!,
          quantity: item.quantity,
        })),
      });

      if (order) {
        toast("success", "Успіх", "Замовлення успішно створено");
        onClose?.();
      }
    } catch (error) {
      toast("error", "Уппссс....", "Виникла помилка при створенні замовлення");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    (async function fetch() {
      const productPrice = await getProductPrice();

      productPrice && setProductPrice(productPrice);
    })();
  }, []);

  return {
    create,
    orderItems,
    setOrderItems,
    productPrice,
    isLoading,
  };
};
