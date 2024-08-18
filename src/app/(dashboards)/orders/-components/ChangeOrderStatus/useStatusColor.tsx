import React from "react";
import { OrderStatus } from "@prisma/client";
import { ChipOwnProps } from "@mui/material";

export const useStatusColor = (status?: OrderStatus | null) => {
  const labelColor = React.useMemo(() => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return "success";
      case OrderStatus.CANCELED:
        return "error";
      case OrderStatus.SENDED:
      case OrderStatus.PAID:
      case OrderStatus.COMPLETED:
        return "warning";
      default:
        return "primary";
    }
  }, [status]) as ChipOwnProps["color"];

  return { labelColor };
};
