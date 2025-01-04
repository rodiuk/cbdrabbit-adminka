import React from "react";
import { OrderItemRow } from "./OrderItemRow";
import { Box, Divider, Typography } from "@mui/material";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

interface InstagramOrderItemsProps {
  orderItems: ICreateInstagramOrderItemFull[];
  setOrderItems: React.Dispatch<
    React.SetStateAction<ICreateInstagramOrderItemFull[]>
  >;
  orderItemPrice: number;
  totalSum: number;
}

export const InstagramOrderItems = (
  props: InstagramOrderItemsProps
): React.JSX.Element => {
  const { orderItems, orderItemPrice, setOrderItems, totalSum } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        p: 1,
        gap: 1,

        backgroundColor: "grey.50",
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

      {orderItems?.length > 0 && (
        <>
          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>
              Загальна сума:
            </Typography>

            <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>
              {totalSum} грн
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
