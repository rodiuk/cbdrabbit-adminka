import React from "react";
import { InstagramOrder } from "@prisma/client";
import { AddTrackingNumber } from "./AddTrackingNumber";

interface OrderDeliveryInfoProps {
  order: InstagramOrder;
}

export const OrderDeliveryInfo = (
  props: OrderDeliveryInfoProps
): React.JSX.Element => {
  const { order } = props;

  return (
    <AddTrackingNumber
      orderId={order?.id}
      trackingNumber={order?.trackingNumber}
    />
  );
};
