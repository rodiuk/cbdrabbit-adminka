import React from "react";
import { Box } from "@mui/material";
import { OrderItemRow } from "./OrderItemRow";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

interface OrderItemsListProps {
  orderItems: ICreateInstagramOrderItemFull[];
  setOrderItems: React.Dispatch<
    React.SetStateAction<ICreateInstagramOrderItemFull[]>
  >;
  orderItemPrice: number;
}

export const OrderItemsList = (
  props: OrderItemsListProps
): React.JSX.Element => {
  const { orderItems, orderItemPrice, setOrderItems } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {orderItems?.length > 0 &&
          orderItems.map((item) => (
            <OrderItemRow
              key={item.id}
              orderItem={item}
              itemPrice={orderItemPrice}
              setOrderItems={setOrderItems}
            />
          ))}
      </Box>
    </Box>
  );
};
