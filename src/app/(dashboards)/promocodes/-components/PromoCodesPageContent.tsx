"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Promocode } from "@prisma/client";
import { PromoCodesBar } from "./PromoCodesBar";
import { PromoCodesTable } from "./PromoCodesTable";
import { FilterDrawer } from "@/features/FilterDrawer";
import { IPagination } from "@/types/interfaces/app.interface";
import { PromoCodesFilterList } from "./PromoCodesBar/PromoCodesFilterList";

interface PromoCodesPageWrapperProps {
  promcodes: Promocode[];
  pagination: IPagination;
  isSearch: boolean;
}

export const PromoCodesPageContent = (
  props: PromoCodesPageWrapperProps
): React.JSX.Element => {
  const { promcodes, pagination, isSearch } = props;

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
          <PromoCodesBar
            handleToggleDrawer={() => setDrawerOpen(!drawerOpen)}
          />
          {promcodes?.length > 0 && (
            <PromoCodesTable promcodes={promcodes} pagination={pagination} />
          )}
          
          {!promcodes?.length && (
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
                  За вашим запитом не знайдено промокодів в базі даних.
                  Спробуйте змінити параметри пошуку.
                </>
              )}

              {!isSearch &&
                "Промокоди відсутні в базі даних. Додайте перший промокод в систему."}
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
            filters={
              <PromoCodesFilterList
                handleToggleDrawer={() => setDrawerOpen(false)}
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};
