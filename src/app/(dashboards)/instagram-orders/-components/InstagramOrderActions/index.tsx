import React from "react";
import PopConfirm from "@/features/PopConfirm";
import { InstagramOrder } from "@prisma/client";
import { DeleteOutline } from "@mui/icons-material";
import { useInstagramOrderActions } from "./useOrderActions";
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";

interface InstagramOrderActionsProps {
  order: InstagramOrder;
}

export const InstagramOrderActions = (
  props: InstagramOrderActionsProps
): React.JSX.Element => {
  const { order } = props;

  const { isAdmin, isDeleting, remove } = useInstagramOrderActions(order);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <PopConfirm
        title={`Видалення замовлення: <b>#${order.checkId}</b>`}
        message="Ви впевнені, що хочете видалити це замовлення? Це <b>безповоротна дія</b>, і вся повязана інформація з цим замовленням <b>буде втрачена</b>."
        confirmText="Так, видалити"
        cancelText="Скасувати"
        reverseButtonColors
        isLoading={isDeleting}
        onConfirm={remove}
        node={
          <Tooltip
            placement="top"
            title={
              isAdmin
                ? "Видалити замовлення"
                : "Дія доступна тільки для адміністратора"
            }
          >
            <IconButton color="error" size="small" disabled={!isAdmin}>
              {isDeleting ? (
                <CircularProgress size={20} />
              ) : (
                <DeleteOutline sx={{ color: "error" }} />
              )}
            </IconButton>
          </Tooltip>
        }
      />
    </Stack>
  );
};
