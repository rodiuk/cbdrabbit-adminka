import React from "react";
import { usePathname } from "next/navigation";

export const useContentBarData = () => {
  const pathname = usePathname();

  const title = React.useMemo(() => {
    switch (pathname) {
      case "/":
        return "Дошка";
      case "/orders":
        return "Список замовлень";
      case "/users":
        return "Список користувачів";
      case "/settings":
        return "Налаштування";
      default:
        return "";
    }
  }, [pathname]);

  const breadcrumbs = React.useMemo(() => {
    switch (pathname) {
      case "/":
        return [];
      case "/orders":
        return [
          {
            title: "Список замовлень",
            href: "/orders",
          },
        ];
      case "/users":
        return [
          {
            title: "Список користувачів",
            href: "/users",
          },
        ];
      case "/settings":
        return [
          {
            title: "Налаштування",
            href: "/settings",
          },
        ];
      default:
        return [];
    }
  }, [pathname]);

  return {
    title,
    breadcrumbs,
  };
};
