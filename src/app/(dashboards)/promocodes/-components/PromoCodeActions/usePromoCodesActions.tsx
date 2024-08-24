import React from "react";
import { useToast } from "@/hooks/Toast/useToast";
import { PromoCodeType } from "../AddNewPromoCode/schema";
import { deletePromoCode, updatePromoCode } from "@/libs/api/promocodes.api";

export const usePromoCodesActions = (promoCodeId: string) => {
  const toast = useToast();
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);

  const remove = async () => {
    try {
      setIsDeleting(true);
      await deletePromoCode(promoCodeId);
      toast("success", "Успіх", "Промокод успішно видалено");
    } catch (error) {
      toast("error", "Упппссс...", "Сталась помилка при видаленні промокоду");
    } finally {
      setIsDeleting(false);
    }
  };

  const edit = async (data: PromoCodeType) => {
    try {
      setIsEditing(true);
      const payload = {
        iasActive: data.isActive,
        code: data.code,
        ...(data.type == "percent" && {
          percentDiscount: data.percentDiscount,
        }),
        ...(data.type === "fixed" && { newPrice: data.newPrice }),
      };

      const res = await updatePromoCode(promoCodeId, payload);
      if (res?.id) {
        setOpenEdit(false);
        return toast("success", "Успіх", "Промокод успішно оновлено");
      }
      toast(
        "error",
        "Упппссс...",
        "Схоже, щось пішло не так при оновленні промокоду"
      );
    } catch (error) {
      toast("error", "Упппссс...", "Сталась помилка при оновленні промокоду");
    } finally {
      setIsEditing(false);
    }
  };

  return {
    isDeleting,
    isEditing,
    remove,
    edit,
    openEdit,
    setOpenEdit,
  };
};
