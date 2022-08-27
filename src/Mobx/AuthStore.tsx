import { makeAutoObservable } from "mobx";
import instance from "./Instance";
import decode from "jwt-decode";
import { unchangedTextChangeRange } from "typescript";

interface ITokenResponse {
  token: string;
}

interface IDecodedToken {
  exp: number;
  role: string;
}

class AuthStore {
  user: IDecodedToken | null = null;
  userData: any[] = [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  setUser = ({ token }: ITokenResponse) => {
    this.setTokens(token);
    this.user = decode(token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  KeepUser = () => {
    const token = localStorage.getItem("myToken");
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  // User tokens
  setTokens = (token: string) => {
    localStorage.setItem("myToken", token);
  };

  getToken = () => {
    localStorage.getItem("myToken");
  };

  SignIn = async (userData: any) => {
    try {
      const response: any = await instance.post("/login", userData);
      this.setUser(response.data);
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  };

  SignOut = () => {
    this.user = null;
    localStorage.clear();
    delete instance.defaults.headers.common.Authorization;
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");

    if (token) {
      const decodedToken: IDecodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        this.SignOut();
      } else this.KeepUser();
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
