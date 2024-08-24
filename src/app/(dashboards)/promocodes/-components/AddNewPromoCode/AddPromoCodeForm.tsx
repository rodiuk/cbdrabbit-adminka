import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { PromoCodeSchema, PromoCodeType } from "./schema";

interface AddPromoCodeFormProps {
  onSubmit: (data: PromoCodeType) => void;
  isLoading: boolean;
}

export const AddPromoCodeForm = ({
  onSubmit,
  isLoading,
}: AddPromoCodeFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PromoCodeType>({
    resolver: zodResolver(PromoCodeSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const selectedType = watch("type");

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        sx={{
          py: 1,
        }}
      >
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              {...field}
              label="Промокод"
              error={!!errors.code}
              helperText={errors.code?.message}
              fullWidth
            />
          )}
        />

        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              fontWeight: 500,
              mb: 0.5,
            }}
          >
            Тип знижки промокоду
          </FormLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <>
                <ButtonGroup {...field} size="small">
                  <Button
                    variant={
                      selectedType === "fixed" ? "contained" : "outlined"
                    }
                    onClick={() => setValue("type", "fixed")}
                  >
                    Фіксована ціна
                  </Button>
                  <Button
                    variant={
                      selectedType === "percent" ? "contained" : "outlined"
                    }
                    onClick={() => setValue("type", "percent")}
                  >
                    Відсоток знижки
                  </Button>
                </ButtonGroup>

                {errors.type && (
                  <Typography color="error" variant="caption">
                    Оберіть тип промокоду
                  </Typography>
                )}
              </>
            )}
          />
        </FormControl>

        {selectedType === "fixed" && (
          <Controller
            name="newPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Фіксована ціна"
                type="number"
                inputProps={{
                  min: 1,
                }}
                error={!!errors.newPrice}
                helperText={
                  errors?.newPrice &&
                  (errors.newPrice?.message || "Поле обов'язкове до заповнення")
                }
                fullWidth
              />
            )}
          />
        )}

        {selectedType === "percent" && (
          <Controller
            name="percentDiscount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Відсоток знижки"
                type="number"
                inputProps={{ min: 1, max: 100 }}
                error={
                  !!errors.percentDiscount ||
                  !!(errors?.newPrice as any)?.percentDiscount
                }
                helperText={
                  (errors?.percentDiscount ||
                    !!(errors?.newPrice as any)?.percentDiscount) &&
                  (errors.percentDiscount?.message ||
                    "Поле обов'язкове до заповнення")
                }
                fullWidth
              />
            )}
          />
        )}

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Активний для використання"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
          }}
          disabled={isSubmitting || isLoading}
          endIcon={
            isLoading || isSubmitting ? <CircularProgress size={20} /> : null
          }
        >
          Створити промокод
        </Button>
      </Stack>
    </Box>
  );
};
