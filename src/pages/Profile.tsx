import {
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";
import InfoIcon from "@mui/icons-material/Info";
import { useAuthStore } from "../context/authContext";
import { useState } from "react";
import api from "../lib/api";

const ProfilePage = () => {
  const authStore = useAuthStore();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const sendReuqest = async () => {
    try {
      await api.post("/request", undefined, {
        headers: { Authorization: `Bearer ${authStore.getToken}` },
      });
      setSnackbarMessage("Заявка отправлена");
      setSnackbarError(false);
      setSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Заявка уже была отправлена");
      setSnackbarError(true);
      setSnackbar(true);
    }
  };

  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
        overflow: "auto",
      }}
    >
      <Snackbar
        autoHideDuration={5000}
        color={snackbarError ? "danger" : "success"}
        size="md"
        open={snackbar}
        startDecorator={<InfoIcon />}
        onClose={() => setSnackbar(false)}
      >
        <div>
          <Typography level="title-sm">Статус</Typography>
          <Typography level="body-sm">{snackbarMessage}</Typography>
        </div>
      </Snackbar>

      <Box sx={{ flex: 1, width: "100%" }}>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Профиль</Typography>
            </Box>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Input
                      size="sm"
                      placeholder="Имя пользователя"
                      value={authStore.getUsername ?? "Ошибка"}
                      disabled
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Роль</FormLabel>
                    <Input
                      size="sm"
                      value={
                        {
                          ROLE_USER: "Пользователь",
                          ROLE_ADMIN: "Админинстратор",
                          null: "Ошибка",
                        }[authStore.getRole ?? "null"]
                      }
                      disabled
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>

            {authStore.getRole === "ROLE_USER" && (
              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  <Button size="sm" variant="solid" onClick={sendReuqest}>
                    Отправить заявку на админинстратора
                  </Button>
                </CardActions>
              </CardOverflow>
            )}
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfilePage;
