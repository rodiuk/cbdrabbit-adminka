import React from "react";
import { Box } from "@mui/material";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        borderRadius: "20px",
        padding: "20px",
        background: (theme) => theme.palette.background.paper,
      }}
    >
      {children}
    </Box>
  );
};
