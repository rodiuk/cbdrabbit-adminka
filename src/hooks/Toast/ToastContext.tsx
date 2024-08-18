import React from "react";
import { Box, IconButton, Snackbar, Typography } from "@mui/material";
import { Close, InfoOutlined, TaskAlt } from "@mui/icons-material";

type ShowSnackbar = (
  severity: "success" | "error",
  title: string,
  description: string
) => void;

export const ToastContext = React.createContext<ShowSnackbar | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: "success",
    title: "",
    description: "",
  });

  const isSuccess = snackbar.severity === "success";

  const showSnackbar: ShowSnackbar = React.useCallback(
    (severity, title, description) => {
      setSnackbar({
        open: true,
        severity,
        title,
        description,
      });
      setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
      }, 5000);
    },
    []
  );

  const closeSnackbar = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "12px",
            padding: "16px",
            borderRadius: "12px",
            width: "330px",
            border: 1,
            borderColor: isSuccess ? "primary.dark" : "error.dark",
            backgroundColor: isSuccess ? "primary.main" : "error.main",
            boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: "8px",
              borderRadius: "100px",
              backgroundColor: isSuccess ? "primary.light" : "warning.light",
            }}
          >
            {isSuccess ? (
              <TaskAlt
                sx={{
                  color: "primary.dark",
                  fontSize: "16px",
                }}
              />
            ) : (
              <InfoOutlined
                sx={{
                  color: "error.dark",
                  fontSize: "16px",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              color: "white",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "inherit", fontWeight: 600 }}
            >
              {snackbar.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "inherit" }}
            >
              {snackbar.description}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            sx={{ ml: "auto" }}
          >
            <Close sx={{ fontSize: "20px", color: "white" }} />
          </IconButton>
        </Box>
      </Snackbar>
    </ToastContext.Provider>
  );
};
