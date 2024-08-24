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
import { RoleButton } from "./RoleButton";
import { Check } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useChangeUserRole } from "./useChangeUserRole";
import { IUser } from "@/types/interfaces/user.interface";

interface ChangeUserRoleProps {
  user: IUser;
}

export const ChangeUserRole = ({
  user,
}: ChangeUserRoleProps): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const systemUser = useSession().data?.user;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { isLoading, role, updateRole, onChange } = useChangeUserRole(
    user,
    () => setAnchorEl(null)
  );

  return (
    <>
      <RoleButton
        role={user.role}
        onClick={handleClick}
        showPopper={open}
        isDisabled={user?.id === systemUser?.id}
      />

      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
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
                id="user-role"
                size="small"
                value={role}
                onChange={onChange}
                sx={{ width: 200 }}
              >
                {["ADMIN", "USER", "MANAGER"].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>

              <IconButton
                size={"small"}
                color="primary"
                disabled={isLoading}
                onClick={updateRole}
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
