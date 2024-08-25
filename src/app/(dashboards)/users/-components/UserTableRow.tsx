import React from "react";
import {
  Avatar,
  Chip,
  Grid,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { UserActions } from "./UserActions";
import { ChangeUserRole } from "./ChnageUserRole";
import { CheckCircle } from "@mui/icons-material";
import { IUser } from "@/types/interfaces/user.interface";

interface UserTableRowProps {
  user: IUser;
}

export const UserTableRow = (props: UserTableRowProps): React.JSX.Element => {
  const { user } = props;

  const theme = useTheme() as any;

  return (
    <TableRow hover>
      {/* <TableCell sx={{ width: "64px!important" }}>
        <Checkbox />
      </TableCell> */}
      <TableCell>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={user?.firstName + " " + user?.lastName}
              // src={`${avatarImage}/${row.avatar}`}
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography align="left" variant="subtitle1" component="div">
              {user?.firstName} {user?.lastName}
              {user?.isActive && (
                <CheckCircle
                  sx={{
                    color: "success.dark",
                    width: 14,
                    height: 14,
                  }}
                />
              )}
            </Typography>
            <Typography align="left" variant="subtitle2" noWrap>
              {user.email}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <ChangeUserRole user={user} />
      </TableCell>
      <TableCell>
        {user.isActive && (
          <Chip
            label="Active"
            size="small"
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.success.light + 90,
              color: theme.palette.success.dark,
            }}
          />
        )}
        {!user.isActive && (
          <Chip
            label="Rejected"
            size="small"
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.orange.light + 80,
              color: theme.palette.orange.dark,
            }}
          />
        )}
      </TableCell>
      <TableCell align="center" sx={{ pr: 3 }}>
        <UserActions user={user} />
      </TableCell>
    </TableRow>
  );
};
