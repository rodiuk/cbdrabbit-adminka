import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import { RefreshOutlined } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import FormControlLabel from "@mui/material/FormControlLabel";

export const UsersFilterList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | "">(
    searchParams.get("status") || ""
  );
  const [role, setRole] = useState<string | "">(searchParams.get("role") || "");

  const handleReset = () => {
    setStatus("");
    setRole("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    params.delete("role");
    router.replace(`?${params.toString()}`);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    role && params.set("role", role);
    !role && params.delete("role");

    status && params.set("status", status);
    !status && params.delete("status");

    router.replace(`?${params.toString()}`);
  }, [status, role, searchParams, router]);

  return (
    <Box sx={{ bgcolor: "grey.50" }}>
      <Card sx={{ borderRadius: 0 }}>
        <CardContent
          sx={{
            borderRadius: 0,
            py: 1.25,
            pr: { xs: "20px", sm: 0 },
            pl: "20px",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Статус користувача
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
              <FormControlLabel
                value={"active"}
                control={<Radio />}
                label={"Активний"}
              />
              <FormControlLabel
                value={"disabled"}
                control={<Radio />}
                label={"Неактивний"}
              />
            </RadioGroup>
          </FormControl>
        </CardContent>

        <CardContent
          sx={{
            borderRadius: 0,
            py: 1.25,
            pr: { xs: "20px", sm: 0 },
            pl: "20px",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Роль користувача
            </FormLabel>
            <RadioGroup
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                "& label": {
                  pl: 1,
                  backgroundColor: "transparent",
                },
              }}
            >
              <FormControlLabel
                value={"USER"}
                control={<Radio />}
                label={"Користувач"}
              />
              <FormControlLabel
                value={"MANAGER"}
                control={<Radio />}
                label={"Менеджер"}
              />
              <FormControlLabel
                value={"ADMIN"}
                control={<Radio />}
                label={"Адміністратор"}
              />
            </RadioGroup>
          </FormControl>
        </CardContent>

        <Divider
          sx={{
            ml: "20px",
          }}
        />
        <CardContent
          sx={{
            borderRadius: 0,
            py: 1.25,
            pr: { xs: "20px", sm: 0 },
            pl: "20px",
          }}
        >
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
