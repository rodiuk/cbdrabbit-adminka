import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useToast } from "@/hooks/Toast/useToast";
import { AutoAwesome, Check, CopyAll } from "@mui/icons-material";
import { IInstagramOrderFull } from "@/types/interfaces/instagramOrder.interface";

interface GeneratePaymentLinkProps {
  order: IInstagramOrderFull;
  generate: () => Promise<void>;
  isGenerating: boolean;
}

export const GeneratePaymentLink = (
  props: GeneratePaymentLinkProps
): React.JSX.Element => {
  const { order, generate, isGenerating } = props;
  const toast = useToast();
  const [copied, setCopied] = React.useState<boolean>(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(order.paymentLink!);
    setCopied(true);
    toast("success", "Успіх", "Посилання на оплату скопійовано в буфер обміну");

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {!order?.paymentLink && (
        <Button
          color="secondary"
          onClick={async (e) => {
            e.stopPropagation();
            await generate();
          }}
          startIcon={
            isGenerating ? <CircularProgress size={18} /> : <AutoAwesome />
          }
          sx={{
            pointerEvents: isGenerating ? "none" : "auto",
            textTransform: "none",
          }}
        >
          Згенерувати посилання на оплату
        </Button>
      )}

      {order?.paymentLink && (
        <TextField
          size="small"
          value={order?.paymentLink}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={
                    "Скопіювати посилання на оплату замовлення в буфер обміну"
                  }
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard();
                    }}
                  >
                    {copied ? <Check /> : <CopyAll />}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={"Згенерувати нове посилання на оплату змовлення"}
                >
                  <IconButton
                    onClick={async (e) => {
                      e.stopPropagation();
                      await generate();
                    }}
                    color="secondary"
                  >
                    <AutoAwesome />
                  </IconButton>
                </Tooltip>
              </Box>
            ),
          }}
          sx={{
            minWidth: "100%",
            "& .MuiInputBase-root": {
              backgroundColor: "secondary.light",
            },
            "& .MuiInputBase-input": {
              backgroundColor: "secondary.light",
              borderRadius: "8px",
            },
          }}
        />
      )}
    </Box>
  );
};
