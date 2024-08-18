// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// project imports
import LogoSection from "../LogoSection";
// import SearchSection from "./SearchSection";
// import NotificationSection from "./NotificationSection";
import ProfileSection from "./ProfileSection";
import { Menu } from "@mui/icons-material";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

interface Props {
  handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: Props) => {
  const theme = useTheme() as any;

  return (
    <>
      <Box
        sx={{
          width: 260,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: {
              xs: "none",
              md: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            flexGrow: 1,
          }}
        >
          <LogoSection />
        </Box>
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
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <Menu
              sx={{
                fontSize: "1.3rem",
              }}
            />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      <ProfileSection />
    </>
  );
};

export default Header;
