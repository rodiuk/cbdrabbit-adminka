import React from "react";
import { nanoid } from "nanoid";
import { CreateMedia } from "..";
import { Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { CreateMediaCard } from "./CreateMediaCard";
import { VisuallyHiddenInput } from "@/features/VisuallyHiddenInput";

interface Props {
  medias: CreateMedia[];
  setMedias: React.Dispatch<React.SetStateAction<CreateMedia[]>>;
}

export const CreateMediaManager = (props: Props): React.JSX.Element => {
  const { medias, setMedias } = props;

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
        {medias?.map((media) => (
          <CreateMediaCard
            key={media.id}
            onDeleteMedia={() =>
              setMedias((prev) => prev.filter((m) => m.id !== media.id))
            }
            media={media}
          />
        ))}
      </Box>

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
        Прикріпити фото чеку чи pdf
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setMedias((prev) => [
                ...prev,
                {
                  id: nanoid(),
                  media: file,
                },
              ]);
            }
          }}
          multiple
        />
      </Button>
    </Box>
  );
};
