import React from "react";
import { CreateMedia } from "..";
import { Delete, Download } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

import pdfPlaceholder from "../../../../../../../../public/pdf.webp";

interface CreateMediaCardProps {
  media: CreateMedia;
  onDeleteMedia: () => void;
}

export const CreateMediaCard = (props: CreateMediaCardProps) => {
  const { media, onDeleteMedia } = props;

  const handleDownloadImage = () => {
    if (!media?.media) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(media.media);
    link.download = "uploaded-image.jpg";
    link.click();
  };

  return (
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
        <Tooltip title="Завантажити файл">
          <IconButton
            size="small"
            color="primary"
            onClick={handleDownloadImage}
          >
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title="Видалити файл">
          <IconButton size="small" onClick={onDeleteMedia} color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component={"img"}
        src={
          media?.media?.type?.includes("pdf")
            ? pdfPlaceholder.src
            : URL.createObjectURL(media.media)
        }
        alt="uploaded"
        sx={{
          width: "200px",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
