import React from "react";
import {
  addInstagramOrderImage,
  deleteInstagramOrderImage,
  updateManagerInstagramOrder,
} from "@/libs/api/instagram-order.api";
import { useToast } from "@/hooks/Toast/useToast";
import {
  ICreateInstagramOrderItemFull,
  IInstagramOrderFull,
} from "@/types/interfaces/instagramOrder.interface";
import { UpdateInstagramOrderFormType } from "./schema";
import { InstagramMedia, MediaType } from "@prisma/client";
import { deleteMedia, uploadMedia } from "@/libs/api/media.api";

export const useUpdateInstagramOrderData = (
  order: IInstagramOrderFull,
  setOrder: (order: IInstagramOrderFull) => void,
  onClose?: () => void
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = React.useState<boolean>(false);

  const [orderItems, setOrderItems] = React.useState<
    ICreateInstagramOrderItemFull[]
  >([]);

  React.useEffect(() => {
    if (order?.orderItems) {
      setOrderItems(
        order.orderItems?.map((item) => ({
          ...item,
          giftQuantity: item?.giftQuantity || 0,
        }))
      );
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
          quantity: Number(item.quantity) || 0,
          giftQuantity: Number(item.giftQuantity) || 0,
        })),
        itemPrice: data.itemPrice ?? undefined,
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

  const addOrderImage = async (file: File) => {
    try {
      setUploadingImage(true);
      const res = await uploadAttachment(file);

      if (!res?.mediaPath) return;

      const updatedOrder = await addInstagramOrderImage(
        order.id,
        res?.mediaPath,
        file.type?.includes("pdf") ? MediaType.PDF : MediaType.IMAGE
      );

      setOrder({
        ...order,
        attachmentUrls: updatedOrder.attachmentUrls,
      });
      return updatedOrder;
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteOrderImage = async (media: InstagramMedia) => {
    try {
      setOrder({
        ...order,
        attachmentUrls: order.attachmentUrls?.filter(
          (item) => item.id !== media.id
        ),
      });

      await deleteMedia(media.mediaPath);

      const updatedOrder = await deleteInstagramOrderImage(media.id);

      return updatedOrder;
    } catch (error) {
      console.error(error);
    }
  };

  const uploadAttachment = async (file: File) => {
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
    isUploadingImage: uploadingImage,
    onUpdate,
    orderItems,
    setOrderItems,
    addOrderImage,
    deleteOrderImage,
  };
};
