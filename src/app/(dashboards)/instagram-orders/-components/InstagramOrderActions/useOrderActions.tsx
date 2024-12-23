import React from "react";
import { useSession } from "next-auth/react";
import { InstagramOrder } from "@prisma/client";
import { useToast } from "@/hooks/Toast/useToast";
import { deleteInstagramOrder } from "@/libs/api/instagram-order.api";

export const useInstagramOrderActions = (order: InstagramOrder) => {
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const toast = useToast();
  const { data } = useSession();
  const isAdmin = data?.user?.role === "ADMIN";

  const remove = async () => {
    try {
      setIsDeleting(true);
      await deleteInstagramOrder(order.id);
      toast("success", "Успіх", "Замовлення успішно видалено");
    } catch (error) {
      toast(
        "error",
        "Упппссс....",
        "Схоже, під час видалення замовлення виникла неочікувана помилка"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    isAdmin,
    remove,
  };
};
