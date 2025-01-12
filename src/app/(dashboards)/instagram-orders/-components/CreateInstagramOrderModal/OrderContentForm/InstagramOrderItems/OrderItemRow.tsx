import React from "react";
import { CalculateOutlined } from "@mui/icons-material";
import { Box, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

interface OrderItemRowProps {
  orderItem: ICreateInstagramOrderItemFull;
  setOrderItems: React.Dispatch<
    React.SetStateAction<ICreateInstagramOrderItemFull[]>
  >;
  itemPrice: number;
}

export const OrderItemRow = (props: OrderItemRowProps): React.JSX.Element => {
  const { orderItem, itemPrice, setOrderItems } = props;

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "giftQuantity" | "quantity"
  ) => {
    const value = e.target.value;
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === orderItem.id
          ? { ...item, [field]: value === "" ? "" : Number(value) }
          : item
      )
    );
  };

  return (
    <Grid container alignItems={"center"} spacing={1}>
      <Grid item xs={12} sm={true}>
        <Typography variant="body1" fontWeight={600}>
          {orderItem?.product?.productName}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          size="small"
          label="Подарунок"
          type="number"
          InputProps={{
            inputProps: { min: 0 },
          }}
          value={orderItem.giftQuantity ?? ""}
          onChange={(e) => handleQuantityChange(e, "giftQuantity")}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            size="small"
            label="Кількість"
            type="number"
            disabled={!orderItem?.product}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <Tooltip
                  title={`Сумарна вартість позиції - ${
                    itemPrice * (Number(orderItem.quantity) || 0)
                  } грн`}
                >
                  <CalculateOutlined
                    sx={{
                      color: "primary.main",
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              ),
            }}
            value={orderItem.quantity ?? ""}
            onChange={(e) => handleQuantityChange(e, "quantity")}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
