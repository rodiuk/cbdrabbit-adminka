// material-ui
import { Divider, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";

// third-party
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import MenuList from "./MenuList";
import LogoSection from "../LogoSection";
import appConstants from "@/constants/app.constants";

interface Props {
  drawerOpen: boolean;
  drawerToggle: () => void;
}

const Sidebar = ({ drawerOpen, drawerToggle }: Props) => {
  const theme = useTheme();

  const drawerWidth = appConstants.drawerWidth;
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box
          sx={{
            display: "flex",
            p: 3,
            mx: "auto",
            justifyContent: "center",
          }}
        >
          <LogoSection />
        </Box>
        <Divider
          sx={{
            maxWidth: "90%",
            mx: "auto",
          }}
        />
      </Box>
      <BrowserView>
        <Box
          sx={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            pt: { sm: "auto" },
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <MenuList />
        </Box>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList toggleSidebar={drawerToggle} />
        </Box>
      </MobileView>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
