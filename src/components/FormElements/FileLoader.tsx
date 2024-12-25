import React from "react";
import { Close, CloudUpload } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { VisuallyHiddenInput } from "@/features/VisuallyHiddenInput";

interface FileLoaderProps {
  image: string | null;
  onDeleteImage: () => void;
  onUploadImage: (file: File) => void;
}

export const FileLoader = (props: FileLoaderProps): React.JSX.Element => {
  const { image, onDeleteImage, onUploadImage } = props;

  return image ? (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "fit-content",
      }}
    >
      <Tooltip title="Видалити фото чеку">
        <IconButton
          size="small"
          onClick={onDeleteImage}
          sx={{
            width: "30px",
            height: "30px",
            backgroundColor: "grey.100",

            "&:hover": {
              backgroundColor: "grey.100",
              opacity: 0.9,
            },

            position: "absolute",
            top: "-10px",
            right: "-10px",
          }}
        >
          <Close />
        </IconButton>
      </Tooltip>
      <Box
        component={"img"}
        src={image}
        alt="uploaded"
        sx={{
          width: "200px",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>
  ) : (
    <Button
      component="label"
      role={undefined}
      variant="text"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      sx={{
        textTransform: "none",
        width: "fit-content",
      }}
    >
      Прикріпити фото чеку
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            onUploadImage(event.target.files[0]);
          }
        }}
        multiple
      />
    </Button>
  );
};
