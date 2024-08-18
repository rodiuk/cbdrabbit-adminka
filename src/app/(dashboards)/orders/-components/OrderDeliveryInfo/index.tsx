import React from "react";
import { AddTrackingNumber } from "./AddTrackingNumber";
import { IOrderForList } from "@/types/interfaces/order.interface";

interface OrderDeliveryInfoProps {
  order: IOrderForList;
}

export const OrderDeliveryInfo = (
  props: OrderDeliveryInfoProps
): React.JSX.Element => {
  const { order } = props;

  return (
    <AddTrackingNumber
      orderId={order?.id}
      trackingNumber={order?.deliveryInfo?.trackingNumber}
    />
  );
};
