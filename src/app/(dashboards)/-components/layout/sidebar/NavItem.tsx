"use client";

// material-ui
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// assets
import { usePathname } from "next/navigation";
import { ILink } from "./MenuList";
import Link from "next/link";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface Props {
  link: ILink;
  toggleSidebar?: () => void;
}

const NavItem = ({ link, toggleSidebar }: Props) => {
  const pathname = usePathname();
  const isActive =
    (pathname?.includes(link.url) && link.url !== "/") || pathname === link.url;

  const itemHandler = (id: string) => {
    // dispatch({ type: MENU_OPEN, id });
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  return (
    <ListItemButton
      component={Link}
      href={link.url}
      prefetch
      sx={{
        mb: 1,
        alignItems: "flex-start",
        backgroundColor: "inherit",
        py: 1.25,
        pl: `24px`,
        borderRadius: "8px",
      }}
      selected={isActive}
      onClick={() => {
        itemHandler(link.id);
        toggleSidebar?.();
      }}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !link?.icon ? 18 : 36 }}>
        {link.icon && link.icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={isActive ? "h5" : "body1"} color="inherit">
            {link.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
