import { useState, MouseEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// project imports
import AnimateButton from "@/components/Buttons/AnimateButtons";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Google from "../../../../../public/social-google.svg";
import { CircularProgress, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/Toast/useToast";
import { getUserByEmail } from "@/libs/api/user.api";
import { useAuthAccessDenied } from "@/hooks/useAuthAccessDenied";
import { LoginFormSchema, LoginFormType } from "./schema";

const AuthLogin: React.FC = ({ ...others }) => {
  useAuthAccessDenied();

  const theme = useTheme() as any;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const googleHandler = async (): Promise<void> => {
    await signIn("google", { redirect: true, callbackUrl: "/" });
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      setIsLoading(true);

      const user = await getUserByEmail(data.email);

      if (!user) {
        toast(
          "error",
          "Упппссс...",
          "Схоже, Ви не зареєстровані, зареєструйтесь спочатку"
        );
        return;
      }

      if (user?.role == "USER") {
        toast(
          "error",
          "Упппссс...",
          "Ви не маєте доступу до панелі адміністратора"
        );
        return;
      }

      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        toast("error", "Упппссс...", response.error);
        return;
      }

      toast("success", "Уррра!", "Ви успішно авторизувались!");
    } catch (error) {
      toast(
        "error",
        "Упппссс...",
        "Уппссс... Щось пішло не так. Спробуйте ще раз"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton type="scale" scale={{ hover: 1.01, tap: 0.95 }}>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <Box
                  component={"img"}
                  src={Google.src}
                  alt="google"
                  width={16}
                  height={16}
                  sx={{
                    marginRight: matchDownSM ? 8 : 16,
                    my: "auto",
                    display: "flex",
                  }}
                />
              </Box>
              Авторизуватись через Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
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
                borderRadius: `12px`,
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
        <FormControl
          fullWidth
          error={Boolean(errors.email)}
          sx={{ ...theme.typography.customInput }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                type="email"
                {...field}
                label="Email Address"
                inputProps={{}}
              />
            )}
          />
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(errors.password)}
          sx={{ ...theme.typography.customInput }}
        >
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                {...field}
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
                label="Password"
                inputProps={{}}
              />
            )}
          />
          {errors.password && (
            <FormHelperText
              error
              id="standard-weight-helper-text-password-login"
            >
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          <Typography
            variant="subtitle1"
            color="secondary"
            sx={{
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Забули пароль?
          </Typography>
        </Stack>

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
              Авторизуватись
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
