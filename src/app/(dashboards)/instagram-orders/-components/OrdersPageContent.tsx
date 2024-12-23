"use client";

import React from "react";
import { InstagramOrder } from "@prisma/client";
import { OrdersBar } from "./InstagramOrdersBar";
import { InstagramOrdersTable } from "./OrdersTable";
import { Box, Grid, Typography } from "@mui/material";
import { FilterDrawer } from "@/features/FilterDrawer";
import { IPagination } from "@/types/interfaces/app.interface";
import { OrdersFilterList } from "./InstagramOrdersBar/OrdersFilterList";

interface OrdersPageWrapperProps {
  orders: InstagramOrder[];
  pagination: IPagination;
  isSearch: boolean;
}

export const InstagramOrdersPageContent = (
  props: OrdersPageWrapperProps
): React.JSX.Element => {
  const { orders, pagination, isSearch } = props;

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
          <OrdersBar handleToggleDrawer={() => setDrawerOpen(!drawerOpen)} />

          {orders?.length > 0 && (
            <InstagramOrdersTable orders={orders} pagination={pagination} />
          )}

          {!orders?.length && (
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
                  За вашим запитом не знайдено замовлень в базі даних. Спробуйте
                  змінити параметри пошуку.
                </>
              )}

              {!isSearch &&
                "Замовлення відсутні в базі даних. Схоже, ще ніхто не спробував цукерочки."}
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
            filters={<OrdersFilterList />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
