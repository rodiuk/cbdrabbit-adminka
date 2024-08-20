"use client";

// material-ui
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { usePathname, useRouter } from "next/navigation";
import { ILink } from "./MenuList";
import React, { useTransition } from "react";
import { CircularProgress, Theme, useMediaQuery } from "@mui/material";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

interface Props {
  link: ILink;
  toggleSidebar?: () => void;
}

const NavItem = ({ link, toggleSidebar }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const isDownMd = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const isActive =
    (pathname?.includes(link.url) && link.url !== "/") || pathname === link.url;

  const handleNav = async () => {
    startTransition(() => router.push(link.url));
  };

  React.useEffect(() => {
    isDownMd && toggleSidebar?.();
  }, [pathname]);

  return (
    <ListItemButton
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
        handleNav();
        // toggleSidebar?.();
      }}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !link?.icon ? 18 : 36 }}>
        {isLoading && <CircularProgress size={18} color={"secondary"} />}
        {link.icon && !isLoading && link.icon}
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
