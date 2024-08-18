import React from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
