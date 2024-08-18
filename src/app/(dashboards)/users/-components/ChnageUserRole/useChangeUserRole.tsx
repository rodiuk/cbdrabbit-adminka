import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { SelectChangeEvent } from "@mui/material";
import { updateUserRole } from "@/libs/api/user.api";
import { IUser } from "@/types/interfaces/user.interface";

export const useChangeUserRole = (user: IUser, onClose?: () => void) => {
  const [role, setRole] = React.useState(user.role);
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  React.useLayoutEffect(() => {
    setRole(user.role);
  }, [user]);

  const onChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setRole(event.target.value as string);
  };

  const updateRole = async () => {
    try {
      setIsLoading(true);
      await updateUserRole(user.id, role);
      toast("success", "Успіх", "Роль користувача успішно змінена!");
      onClose && onClose();
    } catch (error) {
      toast(
        "error",
        "Помилка",
        "Не вдалося змінити роль користувачу! Спробуйте ще раз."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    role,
    onChange,
    updateRole,
  };
};
