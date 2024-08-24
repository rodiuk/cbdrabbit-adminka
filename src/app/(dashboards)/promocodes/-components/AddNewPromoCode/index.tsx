import React from "react";
import { Add } from "@mui/icons-material";
import { PromoCodeType } from "./schema";
import { Fab, Tooltip } from "@mui/material";
import ObjectModal from "@/features/ObjectModal";
import { useToast } from "@/hooks/Toast/useToast";
import { AddPromoCodeForm } from "./AddPromoCodeForm";
import { createPromoCode } from "@/libs/api/promocodes.api";

export const AddNewPromoCode = (): React.JSX.Element => {
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const toast = useToast();

  const handleCreatePromoCode = async (data: PromoCodeType) => {
    try {
      setIsLoading(true);

      const payload = {
        iasActive: data.isActive,
        code: data.code,
        ...(data.type == "percent" && {
          percentDiscount: data.percentDiscount,
        }),
        ...(data.type === "fixed" && { newPrice: data.newPrice }),
      };

      const res = await createPromoCode(payload);
      if (res?.id)
        return toast("success", "Успіх", "Промокод успішно створено");
      toast(
        "error",
        "Упппссс...",
        "Схоже, щось пішло не так при створенні промокоду"
      );
    } catch (error) {
      console.error(error);
      toast("error", "Упппссс...", "Сталась hомилка при створенні промокоду");
    } finally {
      setIsLoading(false);
      setOpenCreate(false);
    }
  };

  return (
    <>
      <Tooltip title="Створити новий промокод">
        <Fab
          color="primary"
          size="small"
          onClick={() => setOpenCreate(true)}
          sx={{
            boxShadow: "none",
            ml: 1,
            width: 32,
            height: 32,
            minHeight: 32,
          }}
        >
          <Add fontSize="small" />
        </Fab>
      </Tooltip>

      <ObjectModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Створення нового промокоду"
        maxWidth="xs"
        fullWidth
        content={
          <AddPromoCodeForm
            onSubmit={handleCreatePromoCode}
            isLoading={isLoading}
          />
        }
      />
    </>
  );
};
