import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Register from "./Register";
import { useAuthStore } from "../context/authContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

// Vite base URL
const basePath = import.meta.env.BASE_URL;

const RouterComponent = observer(() => {
  const authContext = useAuthStore();

  useEffect(() => {
    console.log(authContext);
  });

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        {!authContext.isAuth ? (
          <>
            <Route path="auth/login" element={<Auth />} />
            <Route path="auth/register" element={<Register />} />
          </>
        ) : (
          <>Dibil</>
        )}
      </Routes>
    </BrowserRouter>
  );
});

export default RouterComponent;
