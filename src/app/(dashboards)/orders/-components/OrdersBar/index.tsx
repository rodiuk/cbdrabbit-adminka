import * as React from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useSearchParams, useRouter } from "next/navigation";
import FilterListIcon from "@mui/icons-material/FilterListTwoTone";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface OrdersBarProps {
  handleToggleDrawer: () => void;
}

export const OrdersBar = ({
  handleToggleDrawer,
}: OrdersBarProps): React.JSX.Element => {
  const [search, setSearch] = React.useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  }, [debouncedSearch, searchParams, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Stack
        sx={{ p: 1 }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        spacing={2}
      >
        <TextField
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            ...(!!search?.length && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearch("")}
                    disabled={!search}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }),
          }}
          placeholder="Номер чеку або ТТН"
          value={search}
          onChange={handleSearch}
        />
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={{ xs: "flex-end", sm: "center" }}
          spacing={1.25}
        >
          <Tooltip title={"Показати фільтри"}>
            <IconButton size="medium" onClick={handleToggleDrawer}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </>
  );
};
