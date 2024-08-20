import { styled } from "@mui/material";

import appConstants from "@/constants/app.constants";
const drawerWidth = appConstants.drawerWidth;

export const ContentWrapper = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "theme",
})(({ theme, open }: { theme: any; open: boolean }) => ({
  ...theme.typography.mainContent,
  borderRadius: "12px",
  minHeight: "calc(100vh - 165px)",
  display: "flex",
  flexDirection: "column",

  transition: theme.transitions.create(
    "margin",
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }
  ),
  [theme.breakpoints.up("md")]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`,
    minHeight: "calc(100vh - 155px)",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "20px",
    width: `calc(100% - ${drawerWidth}px)`,
    minHeight: "calc(100vh - 95px)",
    padding: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "10px",
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: "10px",
  },
}));
