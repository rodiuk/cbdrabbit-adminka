import React from "react";
import { Box, Chip, Icon } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";

interface RoleButtonProps {
  role: string;
  showPopper: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export const RoleButton = (props: RoleButtonProps): React.JSX.Element => {
  const { role, onClick, showPopper, isDisabled } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Chip
        label={role}
        color={role === "ADMIN" ? "secondary" : "primary"}
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
