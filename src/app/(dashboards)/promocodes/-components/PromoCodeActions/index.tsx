import React from "react";
import { Promocode } from "@prisma/client";
import PopConfirm from "@/features/PopConfirm";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { usePromoCodesActions } from "./usePromoCodesActions";
import ObjectModal from "@/features/ObjectModal";
import { EditPromoCodeForm } from "./EditPromoCodeForm";

interface PromoCodeActionsProps {
  promoCode: Promocode;
}

export const PromoCodeActions = (
  props: PromoCodeActionsProps
): React.JSX.Element => {
  const { promoCode } = props;

  const { remove, isDeleting, edit, isEditing, openEdit, setOpenEdit } =
    usePromoCodesActions(promoCode.id);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Tooltip placement="top" title="Редагувати промокод">
        <IconButton
          color="primary"
          size="small"
          onClick={() => setOpenEdit(true)}
        >
          <EditOutlined />
        </IconButton>
      </Tooltip>

      <ObjectModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Редагування промокоду"
        maxWidth="xs"
        fullWidth
        content={
          <EditPromoCodeForm
            promoCode={promoCode}
            onSubmit={edit}
            isLoading={isEditing}
          />
        }
      />

      <PopConfirm
        title={"Видалення промокоду"}
        message={`Ви впевнені, що хочете видалити промокод <b>"${promoCode.code}"</b>?`}
        confirmText={"Так, видалити"}
        cancelText={"Скасувати"}
        reverseButtonColors
        onConfirm={remove}
        isLoading={isDeleting}
        node={
          <Tooltip placement="top" title="Видалити промокод">
            <IconButton color="error" size="small">
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        }
      />
    </Stack>
  );
};
