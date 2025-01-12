import { makeAutoObservable } from "mobx";

class AuthStore {
  isAuthenticated: boolean = false;
  username?: string;
  token?: string;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(username: string, token: string) {
    this.isAuthenticated = true;
    this.username = username;
    this.token = token;
  }

  logout() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.token = undefined;
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