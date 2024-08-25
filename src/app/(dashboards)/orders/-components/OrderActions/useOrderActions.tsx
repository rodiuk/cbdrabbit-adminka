import React from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/Toast/useToast";
import { deleteOrder } from "@/libs/api/order.api";
import { IOrderForList } from "@/types/interfaces/order.interface";

export const useOrderActions = (order: IOrderForList) => {
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const toast = useToast();
  const { data } = useSession();
  const isAdmin = data?.user?.role === "ADMIN";

  const remove = async () => {
    try {
      setIsDeleting(true);
      await deleteOrder(order.id);
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
