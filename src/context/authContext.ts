import { createContext, useContext } from "react";
import authStore from "../store/auth";

export const AuthContext = createContext(authStore);

export const useAuthStore = () => {
  return useContext(AuthContext);
};

