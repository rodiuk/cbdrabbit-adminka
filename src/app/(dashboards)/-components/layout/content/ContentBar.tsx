import React from "react";
import Link from "next/link";
import { useContentBarData } from "./useContentBarData";
import { Home, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Breadcrumbs, Grid, Typography, useTheme } from "@mui/material";

const linkSX = {
  display: "flex",
  color: "grey.900",
  textDecoration: "none",
  alignContent: "center",
  alignItems: "center",
};

export const ContentBar = (): React.JSX.Element => {
  const theme = useTheme();

  const { title, breadcrumbs } = useContentBarData();

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderRadius: "12px",
        overflow: "hidden",
        mb: { xs: "8px", sm: "20px" },
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={1}
      >
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          {breadcrumbs?.length > 0 && (
            <Breadcrumbs
              sx={{
                "& .MuiBreadcrumbs-separator": {
                  width: 16,
                  ml: 0.5,
                  mr: 0.5,
                },
              }}
              aria-label="breadcrumb"
              maxItems={8}
              separator={<KeyboardArrowRight sx={{ fontSize: "1rem" }} />}
            >
              <Typography
                component={Link}
                href="/dashboard"
                color="inherit"
                variant="subtitle1"
                sx={linkSX}
              >
                <Home
                  sx={{
                    mr: 0,
                    width: "1rem",
                    height: "1rem",
                    color: theme.palette.secondary.main,
                  }}
                />
              </Typography>

              {breadcrumbs.map((breadcrumb, index) => (
                <Typography
                  key={index}
                  component={Link}
                  href={breadcrumb.href}
                  variant="subtitle1"
                  color="textPrimary"
                >
                  {breadcrumb.title}
                </Typography>
              ))}
            </Breadcrumbs>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
