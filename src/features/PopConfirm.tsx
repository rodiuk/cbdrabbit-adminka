import React, {
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  BoxProps,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import Interweave from "./Interweave";

interface Props {
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  confirmText: string;
  cancelText: string;
  additionalText?: string | null;
  additionalTextColor?: string | null;
  message: string;
  title?: string | null;
  node?: ReactElement;
  children?: ReactElement;
  onClose?: () => unknown;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onAdditional?: () => void;
  nodeWrapperProps?: BoxProps;
  reverseButtonColors?: boolean;
  additionalNode?: ReactNode;
  primaryText?: boolean;
  onShow?: (e: React.MouseEvent) => unknown;
  show?: boolean;
  isLoading?: boolean;
}

export default function PopConfirm(props: Props) {
  const [show, setShow] = useState<boolean>(props.show || false);

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    setShow(false);
    props.onConfirm && props.onConfirm(e);
    if (props.onClose) props.onClose();
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShow(false);
    if (props.onCancel) props.onCancel(e);
    if (props.onClose) props.onClose();
  };

  const handleClose = () => {
    setShow(false);
    if (props.onClose) props.onClose();
  };

  const handleAdditional = () => {
    props.onAdditional && props.onAdditional();
  };

  const element = props.node || props.children;

  return (
    <>
      {element &&
        React.cloneElement(element, {
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            props.onShow && props.onShow(e);
            if (!e.defaultPrevented) {
              setShow(true);
            }
          },
        })}

      <Dialog
        className="no-drag"
        maxWidth={"xs"}
        open={show}
        onClose={(e: any) => {
          e?.stopPropagation();
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          p: "20px",
          ".MuiPaper-root": {
            borderRadius: "12px",
          },
          zIndex: 100000,
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            variant={"h4"}
            fontSize={"20px"}
            sx={{
              my: 1,
            }}
          >
            <Interweave content={props.title} />
          </Typography>

          <Typography variant="body1" fontSize={"16px"} textAlign={"center"}>
            <Interweave content={props.message} />
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            p: "20px",
            pt: "4px",
            width: "100%",
            pb: props.additionalText || props.additionalNode ? 0 : 3,
          }}
        >
          <Button
            variant={"contained"}
            onClick={(e) => {
              e.stopPropagation();
              handleCancel(e);
            }}
            color={props.reverseButtonColors ? "secondary" : "error"}
            sx={{ width: "100%" }}
          >
            {props.cancelText}
          </Button>
          <Button
            variant={"contained"}
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm(e);
            }}
            color={props.reverseButtonColors ? "error" : "secondary"}
            endIcon={props?.isLoading ? <CircularProgress size={20} /> : null}
            sx={{ width: "100%" }}
          >
            {props.confirmText}
          </Button>
        </DialogActions>

        {(props.additionalText || props.additionalNode) && (
          <Box px={4} pb={3} pt={1} width={"100%"} textAlign={"end"}>
            {props.additionalNode ? (
              props.additionalNode
            ) : (
              <Typography
                sx={{
                  a: {
                    color: props.additionalTextColor || "primary.main",
                    textDecorationColor:
                      props.additionalTextColor || "primary.main",
                    mb: 1,
                    pl: 1,
                  },
                }}
              >
                <Link role={"button"} onClick={handleAdditional}>
                  {props.additionalText}
                </Link>
              </Typography>
            )}
          </Box>
        )}
      </Dialog>
    </>
  );
}
