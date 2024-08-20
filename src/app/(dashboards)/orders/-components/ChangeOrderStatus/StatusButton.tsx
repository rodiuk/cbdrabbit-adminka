import React from "react";
import { OrderStatus } from "@prisma/client";
import { Box, Chip, Icon } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { useStatusColor } from "./useStatusColor";
import { orderStatusList } from "../order.maps";

interface RoleButtonProps {
  showPopper: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  status?: OrderStatus | null;
  isDisabled?: boolean;
}

export const RoleButton = (props: RoleButtonProps): React.JSX.Element => {
  const { status, onClick, showPopper, isDisabled } = props;

  const { labelColor } = useStatusColor(status);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Chip
        label={orderStatusList.find((s) => s.value === status)?.title}
        color={labelColor}
        deleteIcon={
          <Box
            sx={{
              borderLeft: 1,
              borderColor: "white",
              pl: 0.5,
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            <Icon
              sx={{
                width: "auto",
                height: "auto",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              {showPopper ? (
                <Close sx={{ fontSize: "16px" }} />
              ) : (
                <Edit sx={{ fontSize: "16px" }} />
              )}
            </Icon>
          </Box>
        }
        onDelete={(e) => {
          !isDisabled && onClick(e);
        }}
      />
    </Box>
  );
};
