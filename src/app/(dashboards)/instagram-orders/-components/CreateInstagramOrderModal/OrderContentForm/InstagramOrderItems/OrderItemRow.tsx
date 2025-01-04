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
          value={Number(orderItem?.giftQuantity)}
          onChange={(e) =>
            setOrderItems((prev) =>
              prev.map((item) =>
                item.id === orderItem.id
                  ? { ...item, giftQuantity: Number(e.target.value) }
                  : item
              )
            )
          }
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
                    itemPrice * orderItem?.quantity
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
            value={Number(orderItem?.quantity)}
            onChange={(e) =>
              setOrderItems((prev) =>
                prev.map((item) =>
                  item.id === orderItem.id
                    ? { ...item, quantity: Number(e.target.value) }
                    : item
                )
              )
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};
