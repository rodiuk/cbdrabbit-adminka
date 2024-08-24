import React from "react";
import { List } from "@mui/material";

// project imports
import {
  ConfirmationNumber,
  Dashboard,
  ListAlt,
  People,
} from "@mui/icons-material";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";

export interface ILink {
  id: string;
  title: string;
  url: string;
  icon: any;
}

const managerLinks: ILink[] = [
  {
    id: "dashboard",
    title: "Дошка",
    url: "/dashboard",
    icon: <Dashboard />,
  },
  {
    id: "orders",
    title: "Замовлення",
    url: "/orders",
    icon: <ListAlt />,
  },
];

const adminLinks: ILink[] = [
  {
    id: "promocodes",
    title: "Промокоди",
    url: "/promocodes",
    icon: <ConfirmationNumber />,
  },
  {
    id: "users",
    title: "Користувачі",
    url: "/users",
    icon: <People />,
  },
];

// ==============================|| SIDEBAR MENU LIST ||============================== //

interface MenuListProps {
  toggleSidebar?: () => void;
}

const MenuList = ({ toggleSidebar }: MenuListProps) => {
  const { data } = useSession();

  const role = data?.user?.role;

  const links = React.useMemo(() => {
    if (role === "ADMIN") {
      return [...managerLinks, ...adminLinks];
    }
    return managerLinks;
  }, [role]);

  const navItems = links?.map((item) => (
    <NavItem key={item.id} link={item} toggleSidebar={toggleSidebar} />
  ));

  return <List>{navItems}</List>;
};

export default MenuList;
