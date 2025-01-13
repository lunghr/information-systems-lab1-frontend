import { Box, CssBaseline, CssVarsProvider } from "@mui/joy";
import authStore from "./store/auth";
import { AuthContext } from "./context/authContext";
import Router from "./pages/Router";
import Controls from "./components/Controls";
import { BrowserRouter } from "react-router-dom";

// Vite base URL
const basePath = import.meta.env.BASE_URL;

const App = () => {
  return (
    <AuthContext.Provider value={authStore}>
      <BrowserRouter basename={basePath}>
        <CssVarsProvider defaultMode="system">
          <CssBaseline />
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Controls />
            <Router />
          </Box>
        </CssVarsProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
