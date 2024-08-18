import { useState, MouseEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// project imports
import Google from "../../../../../public/social-google.svg";
import { strengthColor, strengthIndicator } from "@/utils/password-strength";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AnimateButton from "@/components/Buttons/AnimateButtons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/Toast/useToast";
import { createUser, getUserByEmail } from "@/libs/api/user.api";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { RegisterFormSchema } from "./schema";

// Validation schema

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const AuthRegister = ({ ...others }) => {
  const theme = useTheme() as any;
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<
    { color: string; label: string } | undefined
  >();

  const googleHandler = async () => {
    signIn("google", { redirect: true, callbackUrl: "/" });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      const isUserExist = await getUserByEmail(data.email);

      if (isUserExist) {
        toast(
          "error",
          "Упс...",
          "Схоже, Ви вже зареєстровані! Спробуйте увійти"
        );
        return;
      }

      const user = await createUser(
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        },
        false
      );

      if (!user) {
        toast("error", "Упс...", "Щось пішло не так, спробуйте ще раз");
        return;
      }

      toast(
        "success",
        "Уррра!",
        "Ви успішно зареєструвались! Тепер зверніться до адміністратора для отримання доступу до панелі"
      );

      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (error) {
      toast("error", "Упс...", "Щось пішло не так, спробуйте ще раз");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <AnimateButton type="scale" scale={{ hover: 1.01, tap: 0.95 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <Box
                  component="img"
                  src={Google.src}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Зареєструватись через Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                textTransform: "none",
              }}
              disableRipple
              disabled
            >
              або
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
      </Grid>

      <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
        <Grid container spacing={matchDownSM ? 0 : 1}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Ваше ім'я"
                  margin="normal"
                  type="text"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Ваше прізвище"
                  margin="normal"
                  type="text"
                />
              )}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth error={Boolean(errors.email)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-adornment-email-register"
                type="email"
                label="Email адреса"
                inputProps={{}}
              />
            )}
          />
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text--register">
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(errors.phoneNumber)}
          sx={{ mt: 1 }}
        >
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-adornment-phone-number-register"
                type="tel"
                label="Номер телефону"
              />
            )}
          />
          {errors.phoneNumber && (
            <FormHelperText
              error
              id="standard-weight-helper-text-phone-number-register"
            >
              {errors.phoneNumber.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(errors.password)} sx={{ mt: 1 }}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                label="Пароль"
                onChange={(e) => {
                  field.onChange(e);
                  changePassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {errors.password && (
            <FormHelperText
              error
              id="standard-weight-helper-text-password-register"
            >
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        {strength !== 0 && (
          <FormControl fullWidth>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    style={{ backgroundColor: level?.color }}
                    sx={{ width: 85, height: 8, borderRadius: "7px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        )}

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="secondary"
                />
              }
              label={
                <Typography variant="subtitle1">
                  Прийняти &nbsp;
                  <Typography variant="subtitle1" component={Link} href="#">
                    політику конфіденційності.
                  </Typography>
                </Typography>
              }
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <AnimateButton type="scale" scale={{ hover: 1.01, tap: 0.95 }}>
            <Button
              disableElevation
              disabled={isSubmitting || isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={
                isSubmitting || isLoading ? (
                  <CircularProgress
                    size={16}
                    sx={{ color: "secondary.main" }}
                  />
                ) : null
              }
            >
              Зареєструватись
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default AuthRegister;
