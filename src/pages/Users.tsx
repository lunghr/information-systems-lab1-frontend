import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuthStore } from "../context/authContext";
import api from "../lib/api";
import Check from "@mui/icons-material/Check";
import Pending from "@mui/icons-material/Pending";
import Close from "@mui/icons-material/Close";

interface User {
  id: number;
  username: string;
  role: string;
}

const UsersPage = () => {
  const authStore = useAuthStore();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [userData, setUserData] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/admin/users-list", {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [authStore.getToken]);

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Роль</FormLabel>
        <Select
          size="sm"
          onChange={(_, value: unknown) => setFilter(value as string)}
          placeholder="Все"
        >
          <Option value="all">Все</Option>
          <Option value="user">Пользователь</Option>
          <Option value="admin">Админинстратор</Option>
        </Select>
      </FormControl>
    </>
  );

  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Список пользователей
        </Typography>
      </Box>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Поиск по имени</FormLabel>
          <Input
            size="sm"
            placeholder="Поиск"
            startDecorator={<SearchIcon />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="TableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя пользователя</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {userData
              .filter((user) => user.username.includes(search))
              .filter((user) => {
                if (filter === "admin") {
                  return user.role === "ROLE_ADMIN";
                } else if (filter === "user") {
                  return user.role === "ROLE_USER";
                } else {
                  return true;
                }
              })
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.role === "ROLE_USER"
                      ? "Пользователь"
                      : "Админинстратор"}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default UsersPage;
