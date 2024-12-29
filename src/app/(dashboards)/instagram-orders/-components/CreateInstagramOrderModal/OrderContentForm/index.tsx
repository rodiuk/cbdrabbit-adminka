import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInstagramOrder } from "../useCreateInstagramOrder";
import { InstagramOrderFormSchema, InstagramOrderFormType } from "./schema";
import { InstagramOrderItems } from "./InstagramOrderItems/InstagramOrderItems";
import { CreateMediaManager } from "./CreateMediaManager/CreateMediaManager";

interface Props {
  onClose: () => void;
}

export interface CreateMedia {
  id: string;
  media: File;
}

export const OrderContent = (props: Props): React.JSX.Element => {
  const { onClose } = props;

  const [medias, setMedias] = React.useState<CreateMedia[]>([]);

  const { isLoading, create, orderItems, setOrderItems, productPrice } =
    useCreateInstagramOrder(onClose, medias);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InstagramOrderFormType>({
    resolver: zodResolver(InstagramOrderFormSchema),
  });

  React.useEffect(() => {
    if (productPrice) {
      setValue("itemPrice", productPrice);
    }
  }, [productPrice]);

  const currentProductPrice = watch("itemPrice");
  const currentTotalSum = watch("totalSum");

  React.useEffect(() => {
    const quantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);
    if (currentProductPrice) {
      setValue("totalSum", quantity * currentProductPrice);
    }
  }, [orderItems, currentProductPrice, setValue]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(create)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, sm: 2 },
        overflowY: "auto",
      }}
    >
      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Ціна за цукерку
        </Typography>
        <Controller
          name="itemPrice"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              type="number"
              InputProps={{
                inputProps: { min: 3 },
                endAdornment: (
                  <Typography
                    sx={{
                      px: 1,
                      fontSize: 18,
                    }}
                  >
                    ₴
                  </Typography>
                ),
              }}
              variant="outlined"
              placeholder="Ціна"
              error={Boolean(errors.itemPrice)}
              helperText={errors.itemPrice?.message}
              disabled={isSubmitting}
              sx={{
                maxWidth: { xs: "100%", sm: "100px" },
              }}
            />
          )}
        />
      </FormControl>

      <InstagramOrderItems
        totalSum={currentTotalSum}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        orderItemPrice={currentProductPrice}
      />

      <Divider />

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Ініціали клієнта
        </Typography>
        <Controller
          name="customerInitials"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              variant="outlined"
              placeholder="Ініціали"
              error={Boolean(errors.customerInitials)}
              helperText={errors.customerInitials?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Посилання на сторінку або нікнейм
        </Typography>
        <Controller
          name="customerNickname"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              variant="outlined"
              placeholder="Ініціали"
              error={Boolean(errors.customerNickname)}
              helperText={errors.customerNickname?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Номер телефону
        </Typography>
        <Controller
          name="customerPhone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              variant="outlined"
              placeholder="Номер телефону"
              error={Boolean(errors.customerPhone)}
              helperText={errors.customerPhone?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Адреса доставки
        </Typography>
        <Controller
          name="customerAddress"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              variant="outlined"
              placeholder="Адреса доставки"
              error={Boolean(errors.customerAddress)}
              helperText={errors.customerAddress?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <Divider />

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Коментар менеджера
        </Typography>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              variant="outlined"
              placeholder="Коментар"
              error={Boolean(errors.comment)}
              helperText={errors.comment?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <CreateMediaManager medias={medias} setMedias={setMedias} />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isSubmitting || isLoading || !orderItems.length}
        endIcon={isLoading && <CircularProgress size={20} />}
        sx={{
          mt: 1,
          textTransform: "none",
        }}
      >
        Створити замовлення
      </Button>
    </Box>
  );
};
