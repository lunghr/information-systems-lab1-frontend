import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Register from "./Register";
import { useAuthStore } from "../context/authContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import NotFound from "./NotFound";
import MainPage from "./Main";
import ProfilePage from "./Profile";
import RequestsPage from "./Requests";
import UsersPage from "./Users";

const RouterComponent = observer(() => {
  const authContext = useAuthStore();

  useEffect(() => {
    console.log(authContext);
  });

  return (
    <Routes>
      {!authContext.isAuth ? (
        <>
          <Route path="auth/login" element={<Auth />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="*" element={<Auth />} />
        </>
      ) : (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/requests" element={<RequestsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
});

export default RouterComponent;
