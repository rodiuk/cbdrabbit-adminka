import {
  UpdateInstagramOrderFormSchema,
  UpdateInstagramOrderFormType,
} from "./schema";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { format } from "date-fns";
import { InstagramMedia } from "@prisma/client";
import { orderStatusList } from "../../order.maps";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateInstagramOrderData } from "./useUpdateOrderData";
import { MediaManager } from "@/app/(dashboards)/instagram-orders/-components/UpdateInstagramOrderModal/MediaManager/MediaManager";
import { GeneratePaymentLink } from "../GeneratePaymentLink/GeneratePaymentLink";
import { IInstagramOrderFull } from "@/types/interfaces/instagramOrder.interface";
import { InstagramOrderItems } from "../../CreateInstagramOrderModal/OrderContentForm/InstagramOrderItems/InstagramOrderItems";

interface Props {
  order: IInstagramOrderFull;
  setOrder: (order: IInstagramOrderFull) => void;
  onClose: () => void;
  generatePaymentLink: () => Promise<void>;
  isGeneratingPaymentLink: boolean;
}

export const UpdateOrderContentForm = (props: Props): React.JSX.Element => {
  const { order, setOrder, onClose } = props;

  const {
    onUpdate,
    isLoading: isUpdating,
    orderItems,
    setOrderItems,
    deleteOrderImage,
    addOrderImage,
    isUploadingImage,
  } = useUpdateInstagramOrderData(order, setOrder, onClose);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateInstagramOrderFormType>({
    resolver: zodResolver(UpdateInstagramOrderFormSchema),
    defaultValues: {
      status: order.status!,
      comment: order?.comment,
      trackingNumber: order?.trackingNumber,
      customerAddress: order?.customerAddress,
      customerInitials: order?.customerInitials,
      customerPhone: order?.customerPhone,
      totalSum: order?.totalSum,
      itemPrice: order?.itemPrice,
    },
  });

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
        totalSum={currentTotalSum || 0}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        orderItemPrice={currentProductPrice || 0}
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

      <MediaManager
        attachments={order?.attachmentUrls}
        onUploadImage={async (file: File) => {
          await addOrderImage(file);
        }}
        onDeleteImage={async (media: InstagramMedia) => {
          await deleteOrderImage(media);
        }}
        isUploadingImage={isUploadingImage}
      />

      <Divider />

      <GeneratePaymentLink
        order={order}
        generate={props.generatePaymentLink}
        isGenerating={props.isGeneratingPaymentLink}
      />

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
