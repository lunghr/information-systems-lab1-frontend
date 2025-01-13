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
  userId: number;
  username: string;
  status: string;
  role: string;
}

export default function OrderTable() {
  const authStore = useAuthStore();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [userData, setUserData] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/admin/requests", {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [authStore.getToken]);

  const approve = async (id: number) => {
    try {
      await api.post(`/admin/approve/${id}`, undefined, {
        headers: { Authorization: `Bearer ${authStore.getToken}` },
      });

      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === id
            ? { ...user, status: "APPROVED", role: "ROLE_ADMIN" }
            : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const reject = async (id: number) => {
    try {
      await api.post(`/admin/reject/${id}`, undefined, {
        headers: { Authorization: `Bearer ${authStore.getToken}` },
      });
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === id ? { ...user, status: "REJECTED" } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const renderStatusChip = (status: string) => {
    return (
      <Chip
        startDecorator={
          {
            APPROVED: <Check />,
            PENDING: <Pending />,
            REJECTED: <Close />,
          }[status]
        }
        variant="soft"
        color={
          {
            APPROVED: "success",
            PENDING: "warning",
            REJECTED: "danger",
          }[status] as "success" | "warning" | "danger"
        }
      >
        {
          {
            APPROVED: "Одобрено",
            PENDING: "Ожидание",
            REJECTED: "Отклонено",
          }[status]
        }
      </Chip>
    );
  };

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Статус</FormLabel>
        <Select
          size="sm"
          onChange={(_, value: unknown) => setFilter(value as string)}
          placeholder="Все"
        >
          <Option value="all">Все</Option>
          <Option value="rejected">Отклонено</Option>
          <Option value="accepted">Одобрено</Option>
          <Option value="pending">Ожидание</Option>
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
          Заявки на должность администратора
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
              <th>Статус</th>
              <th>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {userData
              .filter((user) => user.username.includes(search))
              .filter((user) => {
                if (filter === "accepted") {
                  return user.status === "APPROVED";
                } else if (filter === "rejected") {
                  return user.status === "REJECTED";
                } else if (filter === "pending") {
                  return user.status === "PENDING";
                } else {
                  return true;
                }
              })
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{renderStatusChip(user.status)}</td>
                  <td>
                    {user.role === "ROLE_USER"
                      ? "Пользователь"
                      : "Админинстратор"}
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="sm"
                        variant="soft"
                        color="success"
                        disabled={user.status !== "PENDING"}
                        onClick={() => approve(user.id)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="soft"
                        color="danger"
                        disabled={user.status !== "PENDING"}
                        onClick={() => reject(user.id)}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
