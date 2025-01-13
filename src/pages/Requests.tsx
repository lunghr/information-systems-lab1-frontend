import { Box, Chip, IconButton, Sheet, Table, Typography } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuthStore } from "../context/authContext";

interface User {
  id: number;
  userId: number;
  username: string;
  status: string;
  role: string;
}

export default function UserApprovalTable() {
  const authStore = useAuthStore();
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

  return (
    <Sheet
      variant="outlined"
      sx={{ width: "100%", overflow: "auto", borderRadius: "sm", p: 2 }}
    >
      <Typography level="h4" sx={{ mb: 2 }}>
        Заявки на должность админинстратора
      </Typography>
      <Table borderAxis="both">
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
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{renderStatusChip(user.status)}</td>
              <td>
                {user.role === "ROLE_USER" ? "Пользователь" : "Админинстратор"}
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
  );
}
