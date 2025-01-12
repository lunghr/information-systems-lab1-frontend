import axios from "axios";

const PROTOCOL = "http";
const HOST = "localhost";
const PORT = 8080;

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${PORT}`,
});

export default api;
