import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { RefreshOutlined, Clear } from "@mui/icons-material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PromoCodesFilterListProps {
  handleToggleDrawer: () => void;
}

export const PromoCodesFilterList = ({
  handleToggleDrawer,
}: PromoCodesFilterListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [promoCodeType, setPromoCodeType] = useState<string | "">(
    searchParams.get("type") || ""
  );
  const [status, setStatus] = useState<string | "">(
    searchParams.get("status") || ""
  );

  const handleReset = () => {
    setPromoCodeType("");
    setStatus("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("status");
    router.replace(`?${params.toString()}`);
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    promoCodeType && params.set("type", promoCodeType);
    !promoCodeType && params.delete("type");

    status && params.set("status", status);
    !status && params.delete("status");

    router.replace(`?${params.toString()}`);
    handleToggleDrawer();
  };

  return (
    <Box sx={{ bgcolor: "grey.50" }}>
      <Card sx={{ borderRadius: 0 }}>
        <CardContent sx={{ borderRadius: 0, py: 1.25, px: 2.5 }}>
          <FormControl fullWidth>
            <InputLabel size="small">Тип промокоду</InputLabel>
            <Select
              size="small"
              value={promoCodeType}
              onChange={(e) => setPromoCodeType(e.target.value)}
              label="Тип промокоду"
              endAdornment={
                promoCodeType && (
                  <IconButton
                    sx={{ mr: 2 }}
                    size="small"
                    onClick={() => setPromoCodeType("")}
                  >
                    <Clear />
                  </IconButton>
                )
              }
            >
              <MenuItem value={"fixed"}>Фіксована сума</MenuItem>
              <MenuItem value={"percent"}>Відсоток знижки</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <CardContent sx={{ borderRadius: 0, py: 1.25, px: 2.5 }}>
          <FormControl fullWidth>
            <InputLabel size="small">Статус</InputLabel>
            <Select
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Статус"
              endAdornment={
                status && (
                  <IconButton
                    size="small"
                    onClick={() => setStatus("")}
                    sx={{ mr: 2 }}
                  >
                    <Clear />
                  </IconButton>
                )
              }
            >
              <MenuItem value={"active"}>Активний</MenuItem>
              <MenuItem value={"disabled"}>Неактивний</MenuItem>
            </Select>
          </FormControl>
        </CardContent>

        <Divider />
        <CardContent sx={{ borderRadius: 0, py: 1.25, px: 2.5 }}>
          <Stack spacing={4}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button
                variant="contained"
                onClick={handleApply}
                color="primary"
                fullWidth
              >
                Застосувати
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<RefreshOutlined />}
                onClick={handleReset}
                fullWidth
              >
                Скинути
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
