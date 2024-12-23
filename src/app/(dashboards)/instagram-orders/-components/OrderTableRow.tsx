import React from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Grid,
  TableCell,
  TableRow,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";
import { InstagramOrder } from "@prisma/client";
import { ChangeOrderStatus } from "./ChangeOrderStatus";
import { InstagramOrderActions } from "./InstagramOrderActions";
import { OrderDeliveryInfo } from "./InstagramOrderDeliveryInfo";

interface InstagramOrderTableRowProps {
  order: InstagramOrder;
  handleOpenOrderModal: () => void;
}

export const InstagramOrderTableRow = (
  props: InstagramOrderTableRowProps
): React.JSX.Element => {
  const { order, handleOpenOrderModal } = props;

  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <TableRow hover onClick={handleOpenOrderModal}>
      {isSm && (
        <TableCell sx={{ width: "64px!important" }}>
          <Checkbox onClick={(e) => e.stopPropagation()} />
        </TableCell>
      )}

      <TableCell sx={{ width: "64px!important" }}>
        {"#" + order?.checkId}
      </TableCell>

      <TableCell>
        <Grid container spacing={2} alignItems="center">
          {isSm && (
            <Grid item>
              <Avatar
                alt={order?.customerInitials || ""}
                // src={`${avatarImage}/${row.avatar}`}
              />
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <Typography align="left" variant="subtitle1" component="div">
              {order?.customerInitials}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>

      {isSm && (
        <TableCell>
          <OrderDeliveryInfo order={order} />
        </TableCell>
      )}

      <TableCell>
        <ChangeOrderStatus order={order} />
      </TableCell>

      {isSm && <TableCell>{order?.totalSum + " ₴"}</TableCell>}

      {isSm && (
        <TableCell>
          <Tooltip title={format(order.createdAt, "yyyy-MM-dd HH:mm:ss")}>
            <Box sx={{ fontWeight: 500, cursor: "help" }}>
              {format(order.createdAt, "yyyy-MM-dd")}
            </Box>
          </Tooltip>
        </TableCell>
      )}

      {isSm && (
        <TableCell align="center" sx={{ pr: 3 }}>
          <InstagramOrderActions order={order} />
        </TableCell>
      )}
    </TableRow>
  );
};
