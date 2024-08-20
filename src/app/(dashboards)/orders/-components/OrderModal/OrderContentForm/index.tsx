import React from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { orderStatusList } from "../../order.maps";
import { OrderInfoSection } from "./OrderInfoSection";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema, OrderFormType } from "./schema";
import { useUpdateOrderData } from "./useUpdateOrderData";
import { DeliveryInfoSection } from "./DeliveryInfoSection";
import { IOrderFull } from "@/types/interfaces/order.interface";

interface Props {
  order: IOrderFull;
  onClose: () => void;
}

export const OrderContent = (props: Props): React.JSX.Element => {
  const { order, onClose } = props;

  const { onUpdate, isLoading: isUpdating } = useUpdateOrderData(
    order.id,
    onClose
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormType>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      status: order.status!,
      serviceComment: order?.serviceComment,
      trackingNumber: order?.deliveryInfo?.trackingNumber,
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onUpdate)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, sm: 2 },
        overflowY: "auto",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Chip
          size="small"
          color="primary"
          label={format(order.createdAt, "dd.mm.yyyy hh:mm")}
        />
      </Box>

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Поточний статус замовлення
        </Typography>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              size="small"
              sx={{ maxWidth: { xs: "auto", sm: 300 } }}
              {...field}
            >
              {orderStatusList.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.title}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Коментар менеджера
        </Typography>
        <Controller
          name="serviceComment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              size="small"
              variant="outlined"
              placeholder="Коментар"
              error={Boolean(errors.serviceComment)}
              helperText={errors.serviceComment?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <OrderInfoSection order={order} />

      <FormControl>
        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
          Номер ТТН
        </Typography>
        <Controller
          name="trackingNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Номер ТТН"
              error={Boolean(errors.trackingNumber)}
              helperText={errors.trackingNumber?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </FormControl>

      <DeliveryInfoSection order={order} />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isSubmitting || isUpdating}
        endIcon={isUpdating && <CircularProgress size={20} />}
        sx={{
          mt: 1,
          textTransform: "none",
        }}
      >
        Зберегти зміни
      </Button>
    </Box>
  );
};
