import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { orderStatusList } from "../order.maps";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import { RefreshOutlined } from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter, useSearchParams } from "next/navigation";

export const OrdersFilterList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | "">(
    searchParams.get("status") || ""
  );
  const [minPrice, setMinPrice] = useState<number | "">(
    Number(searchParams.get("minPrice")) || ""
  );
  const [maxPrice, setMaxPrice] = useState<number | "">(
    Number(searchParams.get("maxPrice")) || ""
  );
  const [startDate, setStartDate] = useState<string>(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("endDate") || ""
  );

  const handleReset = () => {
    setStatus("");
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("startDate");
    params.delete("endDate");
    router.replace(`?${params.toString()}`);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    status && params.set("status", status);
    !status && params.delete("status");

    minPrice && params.set("minPrice", minPrice.toString());
    !minPrice && params.delete("minPrice");

    maxPrice && params.set("maxPrice", maxPrice.toString());
    !maxPrice && params.delete("maxPrice");

    startDate && params.set("startDate", startDate);
    !startDate && params.delete("startDate");

    endDate && params.set("endDate", endDate);
    !endDate && params.delete("endDate");

    router.replace(`?${params.toString()}`);
  }, [status, minPrice, maxPrice, startDate, endDate, searchParams, router]);

  return (
    <Box sx={{ bgcolor: "grey.50" }}>
      <Card sx={{ borderRadius: 0 }}>
        <CardContent sx={{ borderRadius: 0, py: 1.25, pr: 0, pl: "20px" }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Статус замовлення
            </FormLabel>
            <RadioGroup
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                "& label": {
                  pl: 1,
                  backgroundColor: "transparent",
                },
              }}
            >
              {orderStatusList.map((status) => (
                <FormControlLabel
                  key={status.value}
                  value={status.value}
                  control={<Radio />}
                  label={status.title}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>

        <CardContent sx={{ borderRadius: 0, py: 1.25, pr: 0, pl: "20px" }}>
          <FormControl fullWidth>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Ціна замовлення
            </FormLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="Від"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="До"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>

        <CardContent sx={{ borderRadius: 0, py: 1.25, pr: 0, pl: "20px" }}>
          <FormControl fullWidth>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Дата замовлення
            </FormLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="З"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="По"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
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
