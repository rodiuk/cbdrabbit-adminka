import React from "react";
import { Add } from "@mui/icons-material";
import ObjectModal from "@/features/ObjectModal";
import { OrderContent } from "./OrderContentForm";
import { IconButton, Theme, Tooltip, useMediaQuery } from "@mui/material";

export const CreateInstagramOrderModal = (): React.JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Tooltip title={"Створити Instagram замовлення"}>
        <IconButton size="medium" onClick={() => setOpen(true)}>
          <Add />
        </IconButton>
      </Tooltip>

      <ObjectModal
        open={open}
        onClose={() => setOpen(false)}
        title={"Створення Instagram замовлення"}
        fullScreen={!isSm}
        fullWidth
        maxWidth="sm"
        containerProps={{
          "& .MuiPaper-root": {
            gap: "20px",
            overflow: "hidden",
            borderRadius: "16px",
            padding: "0px",
          },
        }}
        headerProps={{
          px: "20px",
          pt: "20px",
        }}
        content={<OrderContent onClose={() => setOpen(false)} />}
      />
    </>
  );
};
