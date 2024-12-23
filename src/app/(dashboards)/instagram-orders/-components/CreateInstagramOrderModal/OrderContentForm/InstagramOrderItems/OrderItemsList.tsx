import React from "react";
import { Box, Typography } from "@mui/material";
import { OrderItemView } from "./OrderItemView";
import { AddNewProductForOrder } from "./AddNewProductForOrder";
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
        }}
      >
        {orderItems?.length > 0 ? (
          orderItems.map((item) => (
            <OrderItemView
              key={item.id}
              orderItem={item}
              itemPrice={orderItemPrice}
              onDelete={() =>
                setOrderItems((prev) => prev.filter((x) => x.id !== item.id))
              }
            />
          ))
        ) : (
          <Typography variant="body1">
            Додайте позиції для створення замовлення
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <AddNewProductForOrder
          orderItems={orderItems}
          setOrderItems={setOrderItems}
        />
      </Box>
    </Box>
  );
};
