import React from "react";
import { IOrderFull } from "@/types/interfaces/order.interface";
import { Box, List, ListItem, Typography } from "@mui/material";

interface Props {
  order: IOrderFull;
}

export const DeliveryInfoSection = (props: Props): React.JSX.Element => {
  const { order } = props;

  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "primary.light",
        py: 0.5,
      }}
    >
      <List
        sx={{
          "& li": {
            py: 0,
            color: "primary.main",
          },
        }}
      >
        <ListItem>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "primary.main", mb: 1 }}
          >
            Адреса доставки
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color={"inherit"}>
            {order?.user?.firstName} {order?.user?.lastName}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color={"inherit"}>
            {order?.user?.address?.phoneNumber}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color={"inherit"}>
            {order?.user?.address?.city}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color={"inherit"}>
            {order?.user?.address?.npDepartment}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};
