import React from "react";
import { Add, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import ObjectModal from "@/features/ObjectModal";
import { AddTrackingNumberForm } from "./AddTrackingNumberForm";
import { formatTTNView } from "@/utils/formatTTNView";

interface AddTrackingNumberProps {
  orderId: string;
  trackingNumber?: string | null;
}

export const AddTrackingNumber = ({
  orderId,
  trackingNumber,
}: AddTrackingNumberProps): React.JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const title = trackingNumber
    ? "Редагування ТТН відправлення"
    : "Додавання ТТН відправлення";

  return (
    <>
      {!trackingNumber && (
        <Button
          startIcon={<Add />}
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          Додати ТТН
        </Button>
      )}

      {trackingNumber && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Typography
            fontWeight={500}
            sx={{ textTransform: "uppercase", lineHeight: 1 }}
          >
            {formatTTNView(trackingNumber)}
          </Typography>

          <Tooltip title="Редагувати ТТН" arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              size="small"
              color="primary"
            >
              <Edit sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <ObjectModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        fullWidth
        maxWidth="xs"
        content={
          <AddTrackingNumberForm
            orderId={orderId}
            onClose={() => setOpen(false)}
            currentTrackingNumber={trackingNumber}
          />
        }
      />
    </>
  );
};
