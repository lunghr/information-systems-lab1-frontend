import { makeAutoObservable } from "mobx";

const AUTH_STORE_ID = "authStore";

class AuthStore {
  isAuthenticated: boolean = false;
  username?: string;
  token?: string;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage()
  }

  async loadFromStorage() {
    if (localStorage.getItem(AUTH_STORE_ID)) {
      const token = localStorage.getItem(AUTH_STORE_ID)!;

      this.isAuthenticated = true;
      this.token = token;
      this.username = "TEST";
    }
  }

  setAuth(username: string, token: string) {
    this.isAuthenticated = true;
    this.username = username;
    this.token = token;
    localStorage.setItem(AUTH_STORE_ID, token);
  }

  logout() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.token = undefined;
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

}

export default new AuthStore();