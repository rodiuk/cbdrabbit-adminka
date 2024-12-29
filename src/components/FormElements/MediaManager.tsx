import React from "react";
import { MediaCard } from "./MediaCard";
import { InstagramMedia } from "@prisma/client";
import { CloudUpload } from "@mui/icons-material";
import { Box, Button, CircularProgress } from "@mui/material";
import { VisuallyHiddenInput } from "@/features/VisuallyHiddenInput";

interface MediaManagerProps {
  attachments: InstagramMedia[];
  onDeleteImage: (media: InstagramMedia) => void;
  onUploadImage: (file: File) => void;
  isUploadingImage?: boolean;
}

export const MediaManager = (props: MediaManagerProps): React.JSX.Element => {
  const { onDeleteImage, onUploadImage, attachments } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {attachments?.map((media) => (
          <MediaCard
            key={media.id}
            onDeleteMedia={() => onDeleteImage(media)}
            media={media}
          />
        ))}
      </Box>

      <Button
        component="label"
        role={undefined}
        variant="text"
        tabIndex={-1}
        startIcon={
          props?.isUploadingImage ? (
            <CircularProgress size={18} />
          ) : (
            <CloudUpload />
          )
        }
        sx={{
          textTransform: "none",
          width: "fit-content",
        }}
      >
        Прикріпити фото чеку чи pdf
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
    </Box>
  );
};
