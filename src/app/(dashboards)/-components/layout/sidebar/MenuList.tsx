import { List } from "@mui/material";

// project imports
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import { Dashboard, ListAlt, People } from "@mui/icons-material";
import React from "react";

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
    url: "/",
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
    id: "users",
    title: "Користувачі",
    url: "/users",
    icon: <People />,
  },
];

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { data } = useSession();

  const role = data?.user?.role;

  const links = React.useMemo(() => {
    if (role === "ADMIN") {
      return [...managerLinks, ...adminLinks];
    }
    return managerLinks;
  }, [role]);

  const navItems = links?.map((item) => <NavItem key={item.id} link={item} />);

  return <List>{navItems}</List>;
};

export default MenuList;
