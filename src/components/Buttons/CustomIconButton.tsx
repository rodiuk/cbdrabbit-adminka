import React from "react";
import { Avatar, ButtonBase, SxProps, Theme, useTheme } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  buttonStyles?: SxProps<Theme>;
}

export const CustomIconButton = (props: Props): React.JSX.Element => {
  const { icon, buttonStyles } = props;

  const theme = useTheme() as any;

  return (
    <ButtonBase sx={{ borderRadius: "8px", overflow: "hidden" }}>
      <Avatar
        variant="rounded"
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          transition: "all .2s ease-in-out",
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
          "&:hover": {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light,
          },

          ...buttonStyles,
        }}
        color="inherit"
      >
        {icon}
      </Avatar>
    </ButtonBase>
  );
};
