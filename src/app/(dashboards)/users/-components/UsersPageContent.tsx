"use client";

import React from "react";
import { UsersBar } from "./UsersBar";
import { UsersTable } from "./UsersTable";
import { Box, Grid, Typography } from "@mui/material";
import { FilterDrawer } from "@/features/FilterDrawer";
import { IUser } from "@/types/interfaces/user.interface";
import { UsersFilterList } from "./UsersBar/UsersFilterList";
import { IPagination } from "@/types/interfaces/app.interface";

interface UsersPageContentProps {
  users: IUser[];
  pagination: IPagination;
  isSearch: boolean;
}

export const UsersPageContent = (
  props: UsersPageContentProps
): React.JSX.Element => {
  const { users, pagination, isSearch } = props;

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  return (
    <Box sx={{ display: drawerOpen ? "flex" : "block" }}>
      <Grid
        container
        sx={{
          position: "relative",
          display: "flex",
        }}
      >
        <Grid
          item
          xs={12}
          {...{
            sm: drawerOpen && 6,
            md: drawerOpen && 8,
            lg: drawerOpen && 9,
          }}
        >
          <UsersBar handleToggleDrawer={() => setDrawerOpen(!drawerOpen)} />

          {users?.length > 0 && (
            <UsersTable users={users} pagination={pagination} />
          )}

          {!users?.length && (
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign={"center"}
              sx={{
                mt: 3,
                py: 2,
              }}
            >
              {isSearch && (
                <>
                  За вашим запитом не знайдено користувачів в базі даних.
                  Спробуйте змінити параметри пошуку.
                </>
              )}

              {!isSearch &&
                "Користувачі відсутні в базі даних. Схоже, ще ніхто не спробував цукерочки."}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={drawerOpen ? 6 : 0}
          md={drawerOpen ? 4 : 0}
          lg={drawerOpen ? 3 : 0}
          sx={{
            borderLeft: "1px solid",
            borderColor: "divider",
          }}
        >
          <FilterDrawer
            open={drawerOpen}
            handleToggleDrawer={() => setDrawerOpen(!drawerOpen)}
            filters={<UsersFilterList />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
