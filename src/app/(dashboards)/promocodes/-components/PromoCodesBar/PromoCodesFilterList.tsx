import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import { RefreshOutlined, Clear } from "@mui/icons-material";
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

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    promoCodeType && params.set("type", promoCodeType);
    !promoCodeType && params.delete("type");

    status && params.set("status", status);
    !status && params.delete("status");

    router.replace(`?${params.toString()}`);
  }, [promoCodeType, router, searchParams, status]);

  return (
    <Box sx={{ bgcolor: "grey.50" }}>
      <Card sx={{ borderRadius: 0 }}>
        <CardContent sx={{ borderRadius: 0, py: 1.25, pr: 0, pl: "20px" }}>
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
        <CardContent sx={{ borderRadius: 0, py: 1.25, pr: 0, pl: "20px" }}>
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

        <Divider
          sx={{
            ml: "20px",
          }}
        />

        <CardContent sx={{ borderRadius: 0, py: 1.25, pr: 0, pl: "20px" }}>
          <Stack spacing={4}>
            <Stack direction="row" spacing={1} justifyContent="center">
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
