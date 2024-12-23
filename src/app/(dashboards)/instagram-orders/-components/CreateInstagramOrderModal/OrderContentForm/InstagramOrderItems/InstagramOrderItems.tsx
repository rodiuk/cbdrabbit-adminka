import React from "react";
import { OrderItemView } from "./OrderItemView";
import { Box, Divider, Typography } from "@mui/material";
import { AddNewProductForOrder } from "./AddNewProductForOrder";
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
