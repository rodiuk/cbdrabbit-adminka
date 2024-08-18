"use client";

import React from "react";
import { Provider } from "jotai";
import theme from "@/config/theme";
import { ThemeProvider } from "@mui/system";
import { SessionProvider } from "next-auth/react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ToastProvider } from "@/hooks/Toast/ToastContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme({})}>
            <CssBaseline />
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </SessionProvider>
  );
};
