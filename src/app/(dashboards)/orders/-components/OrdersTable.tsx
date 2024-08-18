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

  const { onChangePage } = usePagination();

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: {
            xs: "calc(100vh - 320px)",
            sm: "calc(100vh - 325px)",
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
              {isSm && (
                <TableCell sx={{ width: "64px!important" }}>Чек</TableCell>
              )}
              <TableCell>Клієнт</TableCell>
              <TableCell>Номер відправлення</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Сума</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Дії
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length &&
              orders?.map((row, index) => (
                <OrderTableRow key={index} order={row} />
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
    </>
  );
};
