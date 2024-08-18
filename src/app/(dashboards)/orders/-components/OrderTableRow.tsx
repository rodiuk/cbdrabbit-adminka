import React from "react";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BlockTwoTone } from "@mui/icons-material";
import { OrderDeliveryInfo } from "./OrderDeliveryInfo";
import { IOrderForList } from "@/types/interfaces/order.interface";
import { ChangeOrderStatus } from "./ChangeOrderStatus";

interface UserTableRowProps {
  order: IOrderForList;
}

export const OrderTableRow = (props: UserTableRowProps): React.JSX.Element => {
  const { order } = props;

  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const theme = useTheme() as any;

  return (
    <TableRow hover>
      {isSm && (
        <TableCell sx={{ width: "64px!important" }}>
          <Checkbox />
        </TableCell>
      )}

      {isSm && (
        <TableCell sx={{ width: "64px!important" }}>
          {"#" + order?.checkId}
        </TableCell>
      )}

      <TableCell>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={order?.user?.firstName + " " + order?.user?.lastName}
              // src={`${avatarImage}/${row.avatar}`}
            />
          </Grid>
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

      <TableCell>
        <OrderDeliveryInfo order={order} />
      </TableCell>

      <TableCell>
        <ChangeOrderStatus order={order} />
      </TableCell>

      <TableCell>{order?.totalSum + " ₴"}</TableCell>

      <TableCell>
        <Tooltip title={format(order.createdAt, "yyyy-MM-dd HH:mm:ss")}>
          <Box sx={{ fontWeight: 500, cursor: "help" }}>
            {format(order.createdAt, "yyyy-MM-dd")}
          </Box>
        </Tooltip>
      </TableCell>

      <TableCell align="center" sx={{ pr: 3 }}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Tooltip placement="top" title="Блокувати користувача">
            <IconButton
              color="primary"
              sx={{
                color: theme.palette.orange.dark,
                borderColor: theme.palette.orange.main,
                "&:hover ": {
                  background: theme.palette.orange.light,
                },
              }}
              size="large"
            >
              <BlockTwoTone sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
