import {
  Button,
  Grid,
  Select,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { nanoid } from "nanoid";
import { Add, Close } from "@mui/icons-material";
import { useProductsOptions } from "./useProductsOptions";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

interface AddNewProductForOrderProps {
  orderItems: ICreateInstagramOrderItemFull[];
  setOrderItems: React.Dispatch<
    React.SetStateAction<ICreateInstagramOrderItemFull[]>
  >;
}

export const AddNewProductForOrder = (
  props: AddNewProductForOrderProps
): React.JSX.Element => {
  const { setOrderItems, orderItems } = props;
  const [clicked, setClicked] = React.useState<boolean>(false);

  const [localeItem, setLocaleItem] =
    React.useState<ICreateInstagramOrderItemFull>({
      id: nanoid(),
      quantity: 1,
      product: null,
    });

  const { isLoading, options, products } = useProductsOptions(orderItems);

  return (
    <>
      {!clicked && (
        <Button
          size="small"
          startIcon={<Add />}
          onClick={() => setClicked(true)}
        >
          Додати позицію
        </Button>
      )}

      {clicked && (
        <Grid container spacing={1}>
          <Grid item xs={true}>
            <Select
              size="small"
              value={localeItem?.product?.id || ""}
              disabled={isLoading}
              placeholder="Оберіть продукт"
              onChange={(e) => {
                setLocaleItem((prev) => ({
                  ...prev!,
                  product:
                    products.find((x) => x.id === e.target.value) || null,
                }));
              }}
              sx={{
                minWidth: "100%",
              }}
            >
              {options.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              label="Кількість"
              type="number"
              disabled={!localeItem?.product}
              InputProps={{
                inputProps: { min: 1 },
              }}
              value={Number(localeItem?.quantity)}
              onChange={(e) =>
                setLocaleItem((prev) => ({
                  ...prev!,
                  quantity: Number(e.target.value),
                }))
              }
            ></TextField>
          </Grid>
          <Grid item xs={"auto"}>
            <Tooltip title="Додати позицію">
              <IconButton
                color="primary"
                disabled={!localeItem?.product}
                onClick={() => {
                  setOrderItems((prev) => [
                    ...prev,
                    {
                      id: nanoid(),
                      quantity: localeItem?.quantity,
                      product: localeItem?.product,
                    },
                  ]);
                  setLocaleItem({
                    id: nanoid(),
                    quantity: 1,
                    product: null,
                  });
                  setClicked(false);
                }}
              >
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Скасувати">
              <IconButton
                color="error"
                onClick={() => {
                  setClicked(false);
                  setLocaleItem({
                    id: nanoid(),
                    quantity: 1,
                    product: null,
                  });
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </>
  );
};
