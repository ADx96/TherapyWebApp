import { makeAutoObservable, runInAction } from "mobx";
import instance from "./Instance";

export interface Users {
  Users: [];
}

class UsersStore {
  Users: any[] = [];
  UsersTherapy: any[] = [];
  UserData: any[] = [];
  UserVFT: any[] = [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    try {
      const response: any = await instance.get(`/dashboard/auth/admin/users`);
      runInAction(() => {
        this.Users = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getUserTherapy = async (id: string) => {
    try {
      const response: any = await instance.get(
        `/dashboard/auth/admin/users/${id}`
      );
      runInAction(() => {
        this.UserData = response.data.user;
        this.UsersTherapy = response.data.therapy;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };
  getUserVFT = async (id: string) => {
    try {
      const response: any = await instance.get(
        `/dashboard/auth/admin/users/${id}/vf-test`
      );
      runInAction(() => {
        this.UserVFT = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const usersStore = new UsersStore();

export default usersStore;
