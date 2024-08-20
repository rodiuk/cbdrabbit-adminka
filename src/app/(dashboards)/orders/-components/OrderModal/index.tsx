import React from "react";
import { OrderContent } from "./OrderContentForm";
import ObjectModal from "@/features/ObjectModal";
import { useGetOrderInfo } from "./useGetOrderInfo";
import { Theme, useMediaQuery } from "@mui/material";

interface Props {
  orderId: string;
  open: boolean;
  onClose: () => void;
}

export const OrderModal = (props: Props): React.JSX.Element => {
  const { orderId, open, onClose } = props;

  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const { order, isLoading, title } = useGetOrderInfo(orderId);

  return (
    <>
      <ObjectModal
        open={open}
        onClose={onClose}
        title={title}
        fullScreen={!isSm}
        fullWidth
        maxWidth="sm"
        content={
          <OrderContent order={order} isLoading={isLoading} onClose={onClose} />
        }
      />
    </>
  );
};
