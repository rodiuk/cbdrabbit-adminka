"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { OrderModal } from "./OrderModal";
import { OrderTableRow } from "./OrderTableRow";
import { usePagination } from "@/hooks/usePagination";
import { IPagination } from "@/types/interfaces/app.interface";
import { IOrderForList } from "@/types/interfaces/order.interface";

interface UsersTableProps {
  orders: IOrderForList[];
  pagination: IPagination;
}

export const OrdersTable = (props: UsersTableProps): React.JSX.Element => {
  const { orders, pagination } = props;

  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const [openOrder, setOpenOrder] = React.useState<string | null>(null);

  const { onChangePage } = usePagination();

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: {
            xs: "fit-content",
            sm: "calc(100vh - 365px)",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                "& th": {
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                },
              }}
            >
              {isSm && <TableCell sx={{ width: "64px!important" }}></TableCell>}
              <TableCell sx={{ width: "64px!important" }}>Чек</TableCell>
              <TableCell>Клієнт</TableCell>

              {isSm && <TableCell>Номер відправлення</TableCell>}

              <TableCell>Статус</TableCell>

              {isSm && <TableCell>Сума</TableCell>}
              {isSm && <TableCell>Дата</TableCell>}
              {isSm && (
                <TableCell align="center" sx={{ pr: 3 }}>
                  Дії
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr": {
                cursor: "pointer",
              },
            }}
          >
            {orders?.length &&
              orders?.map((row, index) => (
                <OrderTableRow
                  key={index}
                  order={row}
                  handleOpenOrderModal={() => setOpenOrder(row.id)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={pagination?.total}
        rowsPerPage={15}
        page={pagination?.currentPage - 1}
        onPageChange={onChangePage}
        sx={{
          "& .MuiToolbar-root": {
            pb: "0!important",
          },
        }}
      />

      {openOrder && (
        <OrderModal
          open={!!openOrder}
          onClose={() => setOpenOrder(null)}
          orderId={openOrder}
        />
      )}
    </>
  );
};
