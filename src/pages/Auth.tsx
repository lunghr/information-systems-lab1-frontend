import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { FormHelperText } from "@mui/joy";

const basePath = import.meta.env.BASE_URL;

interface FormElements extends HTMLFormControlsCollection {
  login: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const Auth = () => {
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loginErrorText, setLoginErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

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

  const validatePassword = (value: string) => {
    if (value === "") {
      setPasswordError(true);
      setPasswordErrorText("Поле не должно быть пустым");
    } else if (value.length < 5) {
      setPasswordError(true);
      setPasswordErrorText("Минимальная длина 8 символов");
    } else if (value.length > 16) {
      setPasswordError(true);
      setPasswordErrorText("Максимальная длина 255 символов");
    } else {
      setPasswordError(false);
      setPasswordErrorText("");

      return true;
    }
    return false;
  };

  const submitForm = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      login: formElements.login.value,
      password: formElements.password.value,
    };

    if (!validateLogin(data.login) || !validatePassword(data.password)) return;

    alert(JSON.stringify(data, null, 2));
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
                  Вход
                </Typography>
                <Typography level="body-sm">
                  Нет аккаунта?{" "}
                  <RouterLink to="/auth/register">
                    <Link level="title-sm">Зарегистрируйся!</Link>
                  </RouterLink>
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
                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Button type="submit" fullWidth>
                    Войти
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
          backgroundImage: `url(${basePath}/background-mordor.webp)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${basePath}/background-mordor.webp)`,
          },
        })}
      />
    </>
  );
};
