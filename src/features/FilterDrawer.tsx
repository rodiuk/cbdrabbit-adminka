import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface FilterDrawerProps {
  open: boolean;
  handleToggleDrawer: () => void;
  filters: React.ReactNode;
}

export const FilterDrawer = ({
  open,
  handleToggleDrawer,
  filters,
}: FilterDrawerProps) => {
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        zIndex: 100,
        display: open ? "block" : "none",
        "& .MuiDrawer-paper": {
          position: { xs: "fixed", sm: "relative" },
          overflow: "auto",
          width: "100%",
          border: 0,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Box sx={{ px: 2.5, py: 1.5, pr: "4px" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="h5">Фільтри</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={1}
            >
              <IconButton size="small" onClick={handleToggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Divider
        sx={{
          ml: "20px",
        }}
      />
      {filters}
    </Drawer>
  );
};
