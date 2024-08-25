import React from "react";
import ObjectModal from "@/features/ObjectModal";
import { OrderContent } from "./OrderContentForm";
import { useGetOrderInfo } from "./useGetOrderInfo";
import { Theme, useMediaQuery } from "@mui/material";
import { ModalLoader } from "@/components/Loaders/ModalLoader";

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
          !order?.id || isLoading ? (
            <ModalLoader />
          ) : (
            <OrderContent order={order} onClose={onClose} />
          )
        }
      />
    </>
  );
};
