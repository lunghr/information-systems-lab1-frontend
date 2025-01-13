import { makeAutoObservable } from "mobx";
import api from "../lib/api";

const AUTH_STORE_ID = "authStore";

class AuthStore {
  isAuthenticated: boolean = false;
  username?: string;
  token?: string;
  role?: string;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage()
  }

  async loadFromStorage() {
    if (localStorage.getItem(AUTH_STORE_ID)) {
      const token = localStorage.getItem(AUTH_STORE_ID)!;

      try {
        const username = (await api.get("/auth/username", {
          headers: { Authorization: `Bearer ${token}` },
        })).data;

        const role = (await api.get("/auth/role", {
          headers: { Authorization: `Bearer ${token}` },
        })).data;

        this.token = token;
        this.username = username;
        this.role = role;
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Token is invalid", error);
        this.logout();
      }
    }
  }

  setAuth(username: string, token: string, role: string) {
    this.isAuthenticated = true;
    this.username = username;
    this.token = token;
    this.role = role;

    localStorage.setItem(AUTH_STORE_ID, token);
  }

  logout() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.token = undefined;
    this.role = undefined;
    localStorage.removeItem(AUTH_STORE_ID);
  }

  get isAuth() {
    return this.isAuthenticated;
  }

  get getUsername() {
    return this.username;
  }

  get getToken() {
    return this.token;
  }

  get getRole() {
    return this.role;
  }

}

export default new AuthStore();