import React from "react";
import { Box, CircularProgress, Theme, useMediaQuery } from "@mui/material";

export const ModalLoader = (): React.JSX.Element => {
  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: isSm ? "calc(100vh - 400px)" : "calc(100vh - 100px)",
      }}
    >
      <CircularProgress size={isSm ? 92 : 60} color="primary" />
    </Box>
  );
};
