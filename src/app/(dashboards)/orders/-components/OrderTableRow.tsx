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
import { toZonedTime, format } from "date-fns-tz";
import { OrderActions } from "./OrderActions";
import { OrderDeliveryInfo } from "./OrderDeliveryInfo";
import { ChangeOrderStatus } from "./ChangeOrderStatus";
import { IOrderForList } from "@/types/interfaces/order.interface";
import { appConfig } from "@/config/app.config";

interface UserTableRowProps {
  order: IOrderForList;
  handleOpenOrderModal: () => void;
}

export const OrderTableRow = (props: UserTableRowProps): React.JSX.Element => {
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
                alt={order?.user?.firstName + " " + order?.user?.lastName}
                // src={`${avatarImage}/${row.avatar}`}
              />
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <Typography align="left" variant="subtitle1" component="div">
              {order?.user?.firstName} {order?.user?.lastName}
            </Typography>
            <Typography align="left" variant="subtitle2" noWrap>
              {order?.user?.email}
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
          <Tooltip
            title={format(
              toZonedTime(order.createdAt, appConfig.CURRENT_TIMEZONE),
              "yyyy-MM-dd HH:mm:ss"
            )}
          >
            <Box sx={{ fontWeight: 500, cursor: "help" }}>
              {format(order.createdAt, "yyyy-MM-dd")}
            </Box>
          </Tooltip>
        </TableCell>
      )}

      {isSm && (
        <TableCell align="center" sx={{ pr: 3 }}>
          <OrderActions order={order} />
        </TableCell>
      )}
    </TableRow>
  );
};
