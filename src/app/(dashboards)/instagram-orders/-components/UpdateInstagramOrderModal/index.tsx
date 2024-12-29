import React from "react";
import { useOrderData } from "./useOrderData";
import ObjectModal from "@/features/ObjectModal";
import { Theme, useMediaQuery } from "@mui/material";
import { UpdateOrderContentForm } from "./UpdateOrderContentForm";
import { ModalLoader } from "@/components/Loaders/ModalLoader";

interface Props {
  orderId: string;
  open: boolean;
  onClose: () => void;
}

export const UpdateInstagramOrderModal = (props: Props): React.JSX.Element => {
  const { orderId, open, onClose } = props;

  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const {
    order,
    setOrder,
    isLoading,
    title,
    generatePaymentLink,
    isGenerating,
  } = useOrderData(orderId);

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
            <UpdateOrderContentForm
              order={order}
              setOrder={setOrder}
              onClose={onClose}
              generatePaymentLink={() => generatePaymentLink(orderId)}
              isGeneratingPaymentLink={isGenerating}
            />
          )
        }
      />
    </>
  );
};
