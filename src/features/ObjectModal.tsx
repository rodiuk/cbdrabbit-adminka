import { ReactNode } from "react";
import {
  Box,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";

export interface CreateObjectModalProps
  extends Omit<DialogProps, "title" | "content" | "children"> {
  title?: ReactNode;
  content?: ReactNode;
  containerProps?: SxProps<Theme>;
  headerProps?: SxProps<Theme>;
}

export default function ObjectModal({
  title,
  content,
  containerProps,
  headerProps,
  ...props
}: CreateObjectModalProps) {
  return (
    <Dialog
      maxWidth={"md"}
      onClick={(e) => e.stopPropagation()}
      sx={{
        "& .MuiPaper-root": {
          padding: "20px",
          gap: "20px",
          overflow: "hidden",
          ...(!props?.fullScreen && { borderRadius: "16px" }),
        },
        ...containerProps,
      }}
      {...props}
    >
      <DialogTitle
        component={"div"}
        sx={{
          p: 0,
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "8px",
          ...headerProps,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            flex={1}
            variant={"h3"}
            dangerouslySetInnerHTML={{ __html: title as string }}
          />
          <IconButton
            size={"small"}
            aria-label={"Close dialog"}
            onClick={(event) =>
              props.onClose && props.onClose(event, "escapeKeyDown")
            }
          >
            <CloseIcon sx={{ fontSize: "22px" }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        id="object-modal"
        sx={{
          p: 0,
          overflowY: "auto",
        }}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
}
