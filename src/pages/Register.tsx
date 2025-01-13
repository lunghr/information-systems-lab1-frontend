import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { FormHelperText } from "@mui/joy";
import { useState } from "react";
import api from "../lib/api";
import authStore from "../store/auth";

const basePath = import.meta.env.BASE_URL;

interface FormElements extends HTMLFormControlsCollection {
  login: HTMLInputElement;
  password: HTMLInputElement;
  passwordRepeat: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Register = () => {
  const [authError, setAuthError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);

  const [authErrorText, setAuthErrorText] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [passwordRepeatErrorText, setPasswordRepeatErrorText] = useState("");

  const validateLogin = (value: string) => {
    if (value === "") {
      setLoginError(true);
      setLoginErrorText("Поле не должно быть пустым");
    } else if (value.length < 5) {
      setLoginError(true);
      setLoginErrorText("Минимальная длина 5 символа");
    } else if (value.length > 16) {
      setLoginError(true);
      setLoginErrorText("Максимальная длина 16 символов");
    } else {
      setLoginError(false);
      setLoginErrorText("");
      return true;
    }
    return false;
  };

  const validatePassword = (value: string, password: string) => {
    if (value === "") {
      setPasswordError(true);
      setPasswordErrorText("Поле не должно быть пустым");
    } else if (value.length < 5) {
      setPasswordError(true);
      setPasswordErrorText("Минимальная длина 8 символов");
    } else if (value.length > 16) {
      setPasswordError(true);
      setPasswordErrorText("Максимальная длина 255 символов");
    } else if (value !== password) {
      setPasswordRepeatError(true);
      setPasswordRepeatErrorText("Пароли не совпадают");
    } else {
      setPasswordError(false);
      setPasswordErrorText("");
      setPasswordRepeatError(false);
      setPasswordRepeatErrorText("");

      return true;
    }
    return false;
  };

  const submitForm = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      login: formElements.login.value,
      password: formElements.password.value,
      passwordRepeat: formElements.passwordRepeat.value,
    };

    if (
      !validateLogin(data.login) ||
      !validatePassword(data.password, data.passwordRepeat)
    ) {
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        username: data.login,
        password: data.password,
      });

      const token = response.data.token;
      authStore.setAuth(data.login, token);

      setAuthErrorText("");
      setAuthError(false);
    } catch (error) {
      console.error(error);

      setAuthErrorText("Имя пользователя уже занято");
      setAuthError(true);
    }
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Регистрация
                </Typography>
                <Typography level="body-sm">
                  Уже есть аккаунт?{" "}
                  <RouterLink to="/auth/login">Перейди ко входу!</RouterLink>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              или
            </Divider>
            <Stack sx={{ gap: 4, mt: 2 }}>
              <form onSubmit={submitForm}>
                <FormControl error={loginError}>
                  <FormLabel>Логин</FormLabel>
                  <Input type="text" name="login" />
                  <FormHelperText>
                    {loginError && loginErrorText}
                  </FormHelperText>
                </FormControl>
                <FormControl error={passwordError}>
                  <FormLabel>Пароль</FormLabel>
                  <Input type="password" name="password" />
                  <FormHelperText>
                    {passwordError && passwordErrorText}
                  </FormHelperText>
                </FormControl>
                <FormControl error={passwordRepeatError}>
                  <FormLabel>Повтор пароля</FormLabel>
                  <Input type="password" name="passwordRepeat" />
                  <FormHelperText>
                    {passwordRepeatError && passwordRepeatErrorText}
                  </FormHelperText>
                </FormControl>
                <Stack sx={{ gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  ></Box>
                  <Typography level="body-sm" color="danger">
                    {authError && authErrorText}
                  </Typography>
                  <Button type="submit" fullWidth>
                    Зарегистрироваться
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: "center" }}>
              By Mila :3
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${basePath}/background-hobbit-house.jpg)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${basePath}/background-hobbit-house.jpg)`,
          },
        })}
      />
    </>
  );
};

export default Register;
