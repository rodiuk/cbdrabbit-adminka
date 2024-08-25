import React from "react";
import PopConfirm from "@/features/PopConfirm";
import { DeleteOutline } from "@mui/icons-material";
import { useOrderActions } from "./useOrderActions";
import { IOrderForList } from "@/types/interfaces/order.interface";
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";

interface OrderActionsProps {
  order: IOrderForList;
}

export const OrderActions = (props: OrderActionsProps): React.JSX.Element => {
  const { order } = props;

  const { isAdmin, isDeleting, remove } = useOrderActions(order);

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
