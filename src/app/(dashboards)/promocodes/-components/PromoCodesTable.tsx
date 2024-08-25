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
} from "@mui/material";
import { Promocode } from "@prisma/client";
import { usePagination } from "@/hooks/usePagination";
import { PromoCodesTableRow } from "./PromoCodesTableRow";
import { IPagination } from "@/types/interfaces/app.interface";

interface PromoCodesTableProps {
  promcodes: Promocode[];
  pagination: IPagination;
}

export const PromoCodesTable = (
  props: PromoCodesTableProps
): React.JSX.Element => {
  const { promcodes, pagination } = props;

  const { onChangePage } = usePagination();

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: {
            xs: "fit-content",
            sm: "calc(100vh - 305px)",
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
                },
              }}
            >
              <TableCell>Промокод</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Номінал</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Дії
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promcodes?.length &&
              promcodes?.map((row, index) => (
                <PromoCodesTableRow key={index} promocodes={row} />
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
