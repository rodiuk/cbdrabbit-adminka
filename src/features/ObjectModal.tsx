import { ReactNode } from "react";
import {
  Box,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";

export interface CreateObjectModalProps
  extends Omit<DialogProps, "title" | "content" | "children"> {
  title?: ReactNode;
  content?: ReactNode;
  containerProps?: SxProps<Theme>;
}

export default function ObjectModal({
  title,
  content,
  containerProps,
  ...props
}: CreateObjectModalProps) {
  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <Dialog
      maxWidth={"md"}
      sx={{
        "& .MuiPaper-root": {
          padding: "20px",
          gap: "20px",
          borderRadius: "16px",
          overflow: "hidden",
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
            variant={"h4"}
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
          overflow: "visible",
        }}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
}
