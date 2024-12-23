import React from "react";
import { usePathname } from "next/navigation";

export const useContentBarData = () => {
  const pathname = usePathname();

  const title = React.useMemo(() => {
    switch (pathname) {
      case "/dashboard":
        return "Дошка";
      case "/orders":
        return "Список замовлень";
      case "/instagram-orders":
        return "Список instagram замовлень";
      case "/users":
        return "Список користувачів";
      case "/settings":
        return "Налаштування";
      case "/promocodes":
        return "Промокоди";
      default:
        return "";
    }
  }, [pathname]);

  const breadcrumbs = React.useMemo(() => {
    switch (pathname) {
      case "/dashboard":
        return [
          {
            title: "Дошка",
            href: "/dashboard",
          },
        ];
      case "/orders":
        return [
          {
            title: "Список замовлень",
            href: "/orders",
          },
        ];
      case "/instagram-orders":
        return [
          {
            title: "Список instagram замовлень",
            href: "/instagram-orders",
          },
        ];
      case "/users":
        return [
          {
            title: "Список користувачів",
            href: "/users",
          },
        ];
      case "/promocodes":
        return [
          {
            title: "Промокоди",
            href: "/promocodes",
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
