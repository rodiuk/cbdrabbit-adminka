import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { IUser } from "@/types/interfaces/user.interface";
import { changeUserAccess, deleteUser } from "@/libs/api/user.api";

export const useUserActions = (user: IUser) => {
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [isBlocking, setIsBlocking] = React.useState<boolean>(false);
  const [isAccessing, setIsAccessing] = React.useState<boolean>(false);

  const toast = useToast();

  const remove = async () => {
    try {
      setIsDeleting(true);
      await deleteUser(user.id);
      toast("success", "Успіх", "Користувача успішно видалено");
    } catch (error) {
      toast(
        "error",
        "Упппссс...",
        "Схоже, під час видалення користувача виникла помилка"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const block = async () => {
    try {
      setIsBlocking(true);
      await changeUserAccess(user.id, false);
      toast("success", "Успіх", "Користувача успішно заблоковано");
    } catch (error) {
      toast(
        "error",
        "Упппссс...",
        "Схоже, під час блокування користувача виникла помилка"
      );
    } finally {
      setIsBlocking(false);
    }
  };

  const addAccess = async () => {
    try {
      setIsAccessing(true);
      await changeUserAccess(user.id, true);
      toast("success", "Успіх", "Користувачу успішно надано доступ");
    } catch (error) {
      toast(
        "error",
        "Упппссс...",
        "Схоже, під час надання доступу користувачу виникла помилка"
      );
    } finally {
      setIsAccessing(false);
    }
  };

  return {
    isDeleting,
    isBlocking,
    isAccessing,
    remove,
    block,
    addAccess,
  };
};
