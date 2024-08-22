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
import { UserTableRow } from "./UserTableRow";
import { IUser } from "@/types/interfaces/user.interface";
import { IPagination } from "@/types/interfaces/app.interface";
import { usePagination } from "@/hooks/usePagination";

interface UsersTableProps {
  users: IUser[];
  pagination: IPagination;
}

export const UsersTable = (props: UsersTableProps): React.JSX.Element => {
  const { users, pagination } = props;

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
              {/* <TableCell sx={{ width: "64px!important" }}></TableCell> */}
              <TableCell>Ім&apos;я користувача</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Дії
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length &&
              users?.map((row, index) => (
                <UserTableRow key={index} user={row} />
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
