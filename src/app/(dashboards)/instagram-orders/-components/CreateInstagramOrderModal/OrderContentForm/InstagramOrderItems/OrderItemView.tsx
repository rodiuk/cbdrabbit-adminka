import React from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

interface OrderItemViewProps {
  orderItem: ICreateInstagramOrderItemFull;
  itemPrice: number;
  onDelete: () => void;
}

export const OrderItemView = (props: OrderItemViewProps): React.JSX.Element => {
  const { orderItem, itemPrice, onDelete } = props;

  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={6}>
        <Typography variant="body1" fontWeight={600}>
          {orderItem?.product?.productName}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" fontWeight={500}>
          {orderItem?.quantity}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" fontWeight={500}>
          {itemPrice * orderItem?.quantity} грн
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <IconButton
            onClick={onDelete}
            size="small"
            color="error"
            sx={{
              ml: "auto",
            }}
          >
            <DeleteOutline />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
