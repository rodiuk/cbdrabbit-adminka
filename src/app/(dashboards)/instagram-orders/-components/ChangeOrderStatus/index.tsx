import React from "react";
import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  MenuItem,
  Popper,
  Select,
} from "@mui/material";
import { RoleButton } from "./StatusButton";
import { Check } from "@mui/icons-material";
import { orderStatusList } from "../order.maps";
import { InstagramOrder } from "@prisma/client";
import { useChangeInstagramOrderStatus } from "./useChangeInstagramOrderStatus";

interface ChangeOrderStatusProps {
  order: InstagramOrder;
}

export const ChangeOrderStatus = ({
  order,
}: ChangeOrderStatusProps): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { isLoading, status, updateStatus, onChange } =
    useChangeInstagramOrderStatus(order, () => setAnchorEl(null));

  return (
    <>
      <RoleButton
        status={order?.status}
        onClick={handleClick}
        showPopper={open}
        isDisabled={order?.status === "DELIVERED"}
      />

      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                border: 1,
                borderRadius: "8px",
                borderColor: "divider",
                boxShadow: 1,
                p: 1,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                position: "relative",
              }}
            >
              <Select
                id="order-status"
                size="small"
                value={status?.toString() || ""}
                onChange={onChange}
                sx={{ width: 200 }}
              >
                {orderStatusList.map((role) => (
                  <MenuItem key={role.title} value={role.value}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>

              <IconButton
                size={"small"}
                color="primary"
                disabled={isLoading}
                onClick={updateStatus}
              >
                {isLoading ? <CircularProgress size={24} /> : <Check />}
              </IconButton>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
