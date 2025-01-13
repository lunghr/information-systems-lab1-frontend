import { useState, useEffect } from "react";

import { useAuthStore } from "../context/authContext";
import api from "../lib/api";
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Snackbar,
  Table,
  Typography,
  FormControl,
  FormLabel,
  Select,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton as JoyIconButton } from "@mui/joy";
import Option from "@mui/joy/Option";

export interface BookCreatureDTO {
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  creationDate: Date;
  age: number;
  creatureType: string;
  ringId: number;
  creatureLocationId: number;
  attackLevel: number;
}

export interface BookCreature {
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  creationDate: Date;
  age: number;
  creatureType: string;
  ringName: number;
  creatureLocationName: number;
  attackLevel: number;
}

function useNewCreatureModal() {
  const authStore = useAuthStore();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  const [xCoord, setXCoord] = useState("");
  const [yCoord, setYCoord] = useState("");
  const [age, setAge] = useState("");
  const [creatureType, setCreatureType] = useState("");
  const [ringId, setRingId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [attackLevel, setAttackLevel] = useState("");

  const showModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await api.post(
        "/book-creatures/create",
        {
          name,
          coordinates: { x: +xCoord, y: +yCoord },
          age: +age,
          creatureType,
          ringId: +ringId,
          creatureLocationId: +locationId,
          attackLevel: +attackLevel,
        },
        { headers: { Authorization: `Bearer ${authStore.getToken}` } }
      );
      setSnackbarError(false);
      setSnackbarMessage("Существо добавлено");
    } catch {
      setSnackbarError(true);
      setSnackbarMessage("Ошибка при добавлении существа");
    } finally {
      setSnackbarOpen(true);
      hideModal();
    }
  };

  const modal = (
    <>
      <Modal open={open} onClose={hideModal}>
        <ModalDialog>
          <ModalClose />
          <Typography level="title-sm">Добавление существа</Typography>

          <FormControl>
            <FormLabel>Имя</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Координата X</FormLabel>
            <Input onChange={(e) => setXCoord(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Координата Y</FormLabel>
            <Input onChange={(e) => setYCoord(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Возраст</FormLabel>
            <Input onChange={(e) => setAge(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Тип существа</FormLabel>
            <Select
              value={creatureType}
              onChange={(_, v: unknown) => setCreatureType(v as string)}
              placeholder="Выберите тип"
            >
              <Option value="HOBBIT">HOBBIT</Option>
              <Option value="ELF">ELF</Option>
              <Option value="GOLLUM">GOLLUM</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Ring ID</FormLabel>
            <Input onChange={(e) => setRingId(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Location ID</FormLabel>
            <Input onChange={(e) => setLocationId(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Уровень атаки</FormLabel>
            <Input onChange={(e) => setAttackLevel(e.target.value)} />
          </FormControl>

          <Button onClick={handleSubmit}>Создать</Button>
        </ModalDialog>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        color={snackbarError ? "danger" : "success"}
        onClose={() => setSnackbarOpen(false)}
      >
        <Typography>{snackbarMessage}</Typography>
      </Snackbar>
    </>
  );

  return [showModal, modal] as const;
}

function useEditCreatureModal() {
  const authStore = useAuthStore();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  const [xCoord, setXCoord] = useState("");
  const [yCoord, setYCoord] = useState("");
  const [age, setAge] = useState("");
  const [creatureType, setCreatureType] = useState("");
  const [ringId, setRingId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [attackLevel, setAttackLevel] = useState("");

  const [currentName, setCurrentName] = useState("");

  const showEditModal = (creature: BookCreature) => {
    setName(creature.name);
    setXCoord(`${creature.coordinates.x}`);
    setYCoord(`${creature.coordinates.y}`);
    setAge(`${creature.age}`);
    setCreatureType(creature.creatureType);
    // if we had ringId - we might store it from an external fetch. For now just mock:
    setRingId("0");
    setLocationId("0");
    setAttackLevel(`${creature.attackLevel}`);
    setCurrentName(creature.name);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await api.post(
        `/book-creatures/update/${currentName}`, // Or different ID logic
        {
          name,
          coordinates: { x: +xCoord, y: +yCoord },
          age: +age,
          creatureType,
          ringId: +ringId,
          creatureLocationId: +locationId,
          attackLevel: +attackLevel,
        },
        { headers: { Authorization: `Bearer ${authStore.getToken}` } }
      );
      setSnackbarError(false);
      setSnackbarMessage("Существо обновлено");
    } catch {
      setSnackbarError(true);
      setSnackbarMessage("Ошибка при обновлении существа");
    } finally {
      setSnackbarOpen(true);
      handleClose();
    }
  };

  const modal = (
    <>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <Typography level="title-sm">Редактирование существа</Typography>
          <FormControl>
            <FormLabel>Имя</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Координата X</FormLabel>
            <Input value={xCoord} onChange={(e) => setXCoord(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Координата Y</FormLabel>
            <Input value={yCoord} onChange={(e) => setYCoord(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Возраст</FormLabel>
            <Input value={age} onChange={(e) => setAge(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Тип существа</FormLabel>
            <Input
              value={creatureType}
              onChange={(e) => setCreatureType(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ring ID</FormLabel>
            <Input value={ringId} onChange={(e) => setRingId(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Location ID</FormLabel>
            <Input
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Уровень атаки</FormLabel>
            <Input
              value={attackLevel}
              onChange={(e) => setAttackLevel(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </ModalDialog>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        color={snackbarError ? "danger" : "success"}
        onClose={() => setSnackbarOpen(false)}
      >
        <Typography>{snackbarMessage}</Typography>
      </Snackbar>
    </>
  );

  return [showEditModal, modal] as const;
}

const BookCreatureTable = () => {
  const authStore = useAuthStore();
  const [creatures, setCreatures] = useState<BookCreature[]>([]);
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [showNewModal, NewModal] = useNewCreatureModal();
  const [showEditModal, EditModal] = useEditCreatureModal();

  const edit = (creature: BookCreature) => {
    showEditModal(creature);
  };

  const remove = async (creatureName: string) => {
    try {
      await api.delete(`/book-creatures/delete/${creatureName}`, {
        headers: { Authorization: `Bearer ${authStore.getToken}` },
      });
      setSnackbarError(false);
      setSnackbarMessage("Существо удалено");
      setSnackbarOpen(true);
      setCreatures((prev) => prev.filter((c) => c.name !== creatureName));
    } catch {
      setSnackbarError(true);
      setSnackbarMessage("Ошибка при удалении существа");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const fetchCreatures = async () => {
      try {
        const response = await api.get("/book-creatures/all", {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        });

        console.log(response.data);

        setCreatures(
          response.data.map((dto: BookCreatureDTO) => ({
            name: dto.name,
            coordinates: { x: dto.coordinates.x, y: dto.coordinates.y },
            creationDate: new Date(dto.creationDate),
            age: dto.age,
            creatureType: dto.creatureType,
            ringName: dto.ring.name,
            creatureLocationName: dto.creatureLocation.name,
            attackLevel: dto.attackLevel,
          }))
        );
      } catch {
        console.error("Fetch creatures failed");
      }
    };

    fetchCreatures();
  }, [authStore.getToken]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/notifications");

    const fetchCreatures = async () => {
      try {
        const response = await api.get("/book-creatures/all", {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        });

        console.log(response.data);

        setCreatures(
          response.data.map((dto: BookCreatureDTO) => ({
            name: dto.name,
            coordinates: { x: dto.coordinates.x, y: dto.coordinates.y },
            creationDate: new Date(dto.creationDate),
            age: dto.age,
            creatureType: dto.creatureType,
            ringName: dto.ring.name,
            creatureLocationName: dto.creatureLocation.name,
            attackLevel: dto.attackLevel,
          }))
        );
      } catch {
        console.error("Fetch creatures failed");
      }
    };

    socket.onmessage = () => {
      fetchCreatures();
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const filtered = creatures.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100dvh",
      }}
    >
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
        color={snackbarError ? "danger" : "success"}
      >
        <Typography>{snackbarMessage}</Typography>
      </Snackbar>

      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Поиск по имени</FormLabel>
          <Input
            placeholder="Поиск"
            startDecorator={<SearchIcon />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={async () => {
            try {
              await api.post("/book-creatures/relocate-hobbits", undefined, {
                headers: { Authorization: `Bearer ${authStore.getToken}` },
              });

              setSnackbarError(false);
              setSnackbarMessage("Хоббиты переселены");
              setSnackbarOpen(true);
            } catch (error) {
              console.error("Relocation failed", error);
              setSnackbarError(true);
              setSnackbarMessage("Ошибка при переселении хоббитов");
              setSnackbarOpen(true);
            }
          }}
        >
          Хоббиты - мордор
        </Button>
        <Button
          onClick={async () => {
            try {
              await api.delete("/book-creatures/destroy-elf-cities", {
                headers: { Authorization: `Bearer ${authStore.getToken}` },
              });

              setSnackbarError(false);
              setSnackbarMessage("Города эльфов уничтожены");
              setSnackbarOpen(true);
            } catch (error) {
              console.error("Relocation failed", error);
              setSnackbarError(true);
              setSnackbarMessage("Ошибка при уничтожении городов эльфов");
              setSnackbarOpen(true);
            }
          }}
        >
          Эльфы 💀💀
        </Button>
        <Button
          onClick={async () => {
            try {
              const response = await api.get("/book-creatures/get-oldest", {
                headers: { Authorization: `Bearer ${authStore.getToken}` },
              });

              const name = response.data.name;

              setSnackbarError(false);
              setSnackbarMessage(`Имя старейшего: ${name}`);
              setSnackbarOpen(true);
            } catch (error) {
              console.error("Relocation failed", error);
              setSnackbarError(true);
              setSnackbarMessage("Ошибка при получении старейшины");
              setSnackbarOpen(true);
            }
          }}
        >
          Старейший
        </Button>
        <Button
          onClick={async () => {
            try {
              const id = prompt("Введите ID кольца", "0");

              const response = await api.delete(
                `/book-creatures/delete-by-ring/${id}`,
                {
                  headers: { Authorization: `Bearer ${authStore.getToken}` },
                }
              );

              const name = response.data.name;

              setSnackbarError(false);
              setSnackbarMessage(`Кольцо уничтожено`);
              setSnackbarOpen(true);
            } catch (error) {
              console.error("Relocation failed", error);
              setSnackbarError(true);
              setSnackbarMessage("Ошибка при уничтожении кольца");
              setSnackbarOpen(true);
            }
          }}
        >
          Кольцо 🗑️🗑️
        </Button>
        <Button
          onClick={async () => {
            try {
              const name = prompt("Введите часть имени", "");

              const response = await api.get(
                `/book-creatures/by-name-part/?name=${name}`,
                {
                  headers: { Authorization: `Bearer ${authStore.getToken}` },
                }
              );

              const data = response.data.map(
                (dto: BookCreatureDTO) => dto.name
              );

              setSnackbarError(false);
              setSnackbarMessage(`Результат: ${data.join(", ")}`);
              setSnackbarOpen(true);
            } catch (error) {
              console.error("Relocation failed", error);
              setSnackbarError(true);
              setSnackbarMessage("Ошибка при поиске");
              setSnackbarOpen(true);
            }
          }}
        >
          Поиск по имени
        </Button>
        <Button onClick={showNewModal}>Создать...</Button>
      </Box>

      <Sheet variant="outlined" sx={{ overflow: "auto", flex: 1 }}>
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
          }}
        >
          <thead>
            <tr>
              <th>Имя</th>
              <th>Координаты</th>
              <th>Дата создания</th>
              <th>Возраст</th>
              <th>Тип</th>
              <th>Ring</th>
              <th>Локация</th>
              <th>Ур. атаки</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{`(${c.coordinates.x}, ${c.coordinates.y})`}</td>
                <td>{c.creationDate.toLocaleDateString()}</td>
                <td>{c.age}</td>
                <td>{c.creatureType}</td>
                <td>{c.ringName || "-"}</td>
                <td>{c.creatureLocationName || "-"}</td>
                <td>{c.attackLevel}</td>
                <td>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      variant="soft"
                      color="success"
                      onClick={() => edit(c)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      variant="soft"
                      color="danger"
                      onClick={() => remove(c.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" startDecorator={<KeyboardArrowLeftIcon />}>
          Предыдущая
        </Button>
        <JoyIconButton variant="outlined" color="neutral">
          1
        </JoyIconButton>
        <Button variant="outlined" endDecorator={<KeyboardArrowRightIcon />}>
          Следующая
        </Button>
      </Box>
      {NewModal}
      {EditModal}
    </Box>
  );
};

export default BookCreatureTable;
