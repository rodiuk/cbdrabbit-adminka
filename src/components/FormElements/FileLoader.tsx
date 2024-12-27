import React from "react";
import { Close, CloudUpload, Delete, Download } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { VisuallyHiddenInput } from "@/features/VisuallyHiddenInput";

interface FileLoaderProps {
  image: string | null;
  onDeleteImage: () => void;
  onUploadImage: (file: File) => void;
}

export const FileLoader = (props: FileLoaderProps): React.JSX.Element => {
  const { image, onDeleteImage, onUploadImage } = props;

  const handleDownloadImage = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = "uploaded-image.jpg";
    link.click();
  };

  return image ? (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "fit-content",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",

          backgroundColor: "#20202099",

          borderBottomLeftRadius: 1,
          borderBottomRightRadius: 1,
        }}
      >
        <Tooltip title="Завантажити фото чеку">
          <IconButton
            size="small"
            color="primary"
            onClick={handleDownloadImage}
          >
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title="Видалити фото чеку">
          <IconButton size="small" onClick={onDeleteImage} color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
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
