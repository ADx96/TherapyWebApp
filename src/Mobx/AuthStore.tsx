import { makeAutoObservable, runInAction } from "mobx";
import instance from "./Instance";
import decode from "jwt-decode";

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

interface IDecodedRefreshToken {
  id: number;
  exp: number;
}

interface IDecodedToken extends IDecodedRefreshToken {
  username: string;
  isAdmin: boolean;
  fullName: string;
}

class AuthStore {
  user: IDecodedToken | null = null;
  userData: any[] = [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  setUser = ({ token, refreshToken }: ITokenResponse) => {
    this.setTokens(token, refreshToken);
    this.user = decode(token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  // User tokens
  setTokens = (token: string, refreshToken: string) => {
    localStorage.setItem("myToken", token);
    localStorage.setItem("myRefreshToken", refreshToken);
  };

  getToken = () => {
    localStorage.getItem("myToken");
  };

  Register = async (Data: { [x: string]: string | Blob }) => {
    try {
      const response: any = await instance.post("/register", Data);
      runInAction(() => {
        this.userData.shift();
        this.userData.push(response.data);
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
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
      const currentTime = Date.now();
      const decodedToken: IDecodedToken = decode(token);
      if (decodedToken.exp < currentTime) {
        this.SignOut();
      }
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
