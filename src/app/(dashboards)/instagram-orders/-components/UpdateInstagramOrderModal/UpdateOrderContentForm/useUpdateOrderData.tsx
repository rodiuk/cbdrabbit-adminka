import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { UpdateInstagramOrderFormType } from "./schema";
import { updateManagerInstagramOrder } from "@/libs/api/instagram-order.api";
import {
  ICreateInstagramOrderItemFull,
  IInstagramOrderFull,
} from "@/types/interfaces/instagramOrder.interface";
import { uploadMedia } from "@/libs/api/media.api";

export const useUpdateInstagramOrderData = (
  order: IInstagramOrderFull,
  onClose?: () => void,
  imageUrl?: string | null,
  file?: File | null
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
      let mediaPath: string | undefined | null = imageUrl;

      if (file) {
        const res = await uploadAttachment(file);

        if (res?.mediaPath) {
          mediaPath = res.mediaPath;
        }
      }

      const updatedOrder = await updateManagerInstagramOrder(order.id, {
        ...data,
        attachmentUrl: mediaPath,
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

  const uploadAttachment = async (file: File) => {
    console.log("file upload", file);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });

      const base64Data = base64.split(",")[1];

      return await uploadMedia(base64Data, file.name);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading,
    onUpdate,
    orderItems,
    setOrderItems,
  };
};
