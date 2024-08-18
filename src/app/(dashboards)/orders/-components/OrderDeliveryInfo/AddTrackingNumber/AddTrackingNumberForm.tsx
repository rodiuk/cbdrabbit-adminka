import React from "react";
import { Controller } from "react-hook-form";
import { useAddTrackingNumber } from "./useAddTrackingNumber";
import { Box, Button, CircularProgress, TextField } from "@mui/material";

interface AddTrackingNumberFormProps {
  orderId: string;
  onClose: () => void;
  currentTrackingNumber?: string | null;
}

export const AddTrackingNumberForm = ({
  orderId,
  onClose,
  currentTrackingNumber,
}: AddTrackingNumberFormProps): React.JSX.Element => {
  const { control, handleSubmit, onSubmit, errors, isLoading } =
    useAddTrackingNumber(orderId, onClose, currentTrackingNumber);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: "20px" }}
    >
      <Controller
        name="trackingNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size="small"
            label="Номер ТТН"
            type="text"
            error={!!errors.trackingNumber}
            helperText={
              !!errors?.trackingNumber ? errors.trackingNumber?.message : ""
            }
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color={"secondary"}
        endIcon={isLoading && <CircularProgress size={21} />}
        sx={{
          mt: 2,
          width: "100%",
        }}
      >
        {currentTrackingNumber ? "Змінити" : "Додати"}
      </Button>
    </Box>
  );
};
