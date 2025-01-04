import React from "react";
import { nanoid } from "nanoid";
import {
  createInstagramOrder,
  uploadOrderMedia,
} from "@/libs/api/instagram-order.api";
import { InstagramMedia } from "@prisma/client";
import { CreateMedia } from "./OrderContentForm";
import { useToast } from "@/hooks/Toast/useToast";
import { uploadMedia } from "@/libs/api/media.api";
import { InstagramOrderFormType } from "./OrderContentForm/schema";
import { getAllActiveProducts, getProductPrice } from "@/libs/api/products.api";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

export const useCreateInstagramOrder = (
  onClose?: () => void,
  medias?: CreateMedia[]
) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingItems, setIsLoadingItems] = React.useState(false);
  const [orderItems, setOrderItems] = React.useState<
    ICreateInstagramOrderItemFull[]
  >([]);
  const [productPrice, setProductPrice] = React.useState<number>(0);

  React.useEffect(() => {
    (async function fetch() {
      try {
        setIsLoadingItems(true);
        const products = await getAllActiveProducts();
        if (products) {
          setOrderItems(
            products?.map((product) => ({
              product,
              quantity: 0,
              giftQuantity: 0,
              id: nanoid(),
            }))
          );
        }
      } catch (error) {
        console.error("Error in fetch products:", error);
      } finally {
        setIsLoadingItems(false);
      }
    })();
  }, []);

  const create = async (payload: InstagramOrderFormType) => {
    try {
      setIsLoading(true);

      const savedMedias = await uploadMedias();

      const order = await createInstagramOrder({
        ...payload,

        ...(savedMedias?.length > 0 && {
          attachmentUrls: savedMedias,
        }),

        orderItems: orderItems.map((item) => ({
          productId: item?.product?.id!,
          quantity: item.quantity,
          giftQuantity: item.giftQuantity,
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

  const uploadMedias = async () => {
    const createdMedias: InstagramMedia[] = [];

    if (!medias) return createdMedias;

    for await (const media of medias) {
      await uploadAttachment(media.media);
      const uploadedMedia = await uploadAttachment(media.media);

      if (uploadedMedia?.mediaPath) {
        const savedMedia = await uploadOrderMedia(uploadedMedia?.mediaPath);
        createdMedias.push(savedMedia);
      }
    }

    return createdMedias;
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
    isLoadingItems,
  };
};
