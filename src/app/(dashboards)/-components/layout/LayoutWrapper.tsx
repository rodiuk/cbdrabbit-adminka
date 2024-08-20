"use client";

import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Header from "./header";
import { useAtom } from "jotai";
import Sidebar from "./sidebar";
import { useTheme } from "@emotion/react";
import { ContentWrapper } from "./ContentWrapper";
import { ContentBar } from "./content/ContentBar";
import { leftDrawerOpenedAtom } from "@/libs/atoms/app.atoms";
import { PageWrapper } from "@/components/Wrappers/PageWrapper";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme() as any;
  const matchDownMd = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );
  // Handle left drawer
  const [leftDrawerOpened, setLeftDrawerOpened] = useAtom(leftDrawerOpenedAtom);

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <ContentWrapper theme={theme} open={leftDrawerOpened}>
        <ContentBar />

        <PageWrapper>{children}</PageWrapper>
      </ContentWrapper>
    </Box>
  );
};
