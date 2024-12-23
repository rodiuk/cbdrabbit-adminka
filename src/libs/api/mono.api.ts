"use server";

import {
  getFullInstagramOrderById,
  updatePaymentLink,
} from "./instagram-order.api";
import { getOrderNewReference } from "./order.api";
import { IMonoPayUrlRes } from "@/types/interfaces/mono.interface";

export const createUrlForCheckout = async (
  orderId: string
): Promise<IMonoPayUrlRes | null> => {
  console.log("orderId", orderId);
  const convertPrice = (price: number) =>
    Number(String(price.toFixed(2).replace(".", "")));

  const reference = await getOrderNewReference();

  const order = await getFullInstagramOrderById(orderId);

  if (!order) {
    return null;
  }

  const arg = {
    amount: convertPrice(order.totalSum),
    ccy: 980,
    merchantPaymInfo: {
      reference,
      destination: "Rabbit CBD",
      basketOrder: order?.orderItems.map((item) => ({
        name: item?.product?.productName,
        qty: item.quantity,
        sum: convertPrice(order.itemPrice),
        icon: (item?.product?.images && item?.product?.images[0]?.url) ?? "",
        unit: "шт.",
        code: item.id,
        tax: [0],
        uktzed: "uktzedcode",
      })),
    },
    redirectUrl: `https://cbdrabbit.shop/uk/checkout?successOrder=${reference}`,
    webHookUrl: "https://cbdrabbit.shop/api/checkout",
    validity: 10800,
    paymentType: "debit",
  };

  try {
    const res = await fetch(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Token": "uuQ6VjssSwihvTMlQGy3tWsdeiwSN_3TmQw8TU1fKRFo",
        },
        body: JSON.stringify(arg),
      }
    );

    if (res.ok) {
      const data = await res.json();

      await updatePaymentLink(orderId, data.pageUrl, data.invoiceId);

      return data;
    }

    // TODO: for validate logs on server
    console.log(await res.json());

    return null;
  } catch (error) {
    throw error;
  }
};
