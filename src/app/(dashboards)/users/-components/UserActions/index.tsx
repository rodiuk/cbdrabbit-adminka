import React from "react";
import PopConfirm from "@/features/PopConfirm";
import { useUserActions } from "./useUserActions";
import { IUser } from "@/types/interfaces/user.interface";
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import { BlockOutlined, DeleteOutline, KeyOutlined } from "@mui/icons-material";

interface UserActionsProps {
  user: IUser;
}

export const UserActions = (props: UserActionsProps): React.JSX.Element => {
  const { user } = props;

  const isActive = user?.isActive;

  const { isDeleting, remove, block, isBlocking, isAccessing, addAccess } =
    useUserActions(user);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <PopConfirm
        title={
          isActive
            ? `Блокування користувача: ${user?.firstName} ${user?.lastName}`
            : `Розблокування користувача: ${user?.firstName} ${user?.lastName}`
        }
        message={
          isActive
            ? "Ви впевнені, що хочете заблокувати цього користувача?"
            : "Ви впевнені, що хочете розблокувати цього користувача?"
        }
        confirmText={isActive ? "Так, заблокувати" : "Так, розблокувати"}
        cancelText={"Скасувати"}
        reverseButtonColors
        onConfirm={isActive ? block : addAccess}
        node={
          <Tooltip
            placement="top"
            title={
              isActive ? "Блокування користувача" : "Розблокування користувача"
            }
          >
            <IconButton color="secondary" size="small" disabled={isBlocking}>
              {isBlocking || isAccessing ? (
                <CircularProgress size={20} />
              ) : isActive ? (
                <BlockOutlined />
              ) : (
                <KeyOutlined />
              )}
            </IconButton>
          </Tooltip>
        }
      />

      <PopConfirm
        title={`Видалення користувача: ${user?.firstName} ${user?.lastName}`}
        message="Ви впевнені, що хочете видалити цього користувача? Це <b>безповоротна дія</b>, і вся повязана інформація з цим користувачем <b>буде втрачена</b>."
        confirmText="Так, видалити"
        cancelText="Скасувати"
        reverseButtonColors
        onConfirm={remove}
        node={
          <Tooltip placement="top" title="Видалити користувача">
            <IconButton color="error" size="small" disabled={isDeleting}>
              {isDeleting ? <CircularProgress size={20} /> : <DeleteOutline />}
            </IconButton>
          </Tooltip>
        }
      />
    </Stack>
  );
};
