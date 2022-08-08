import { makeAutoObservable, runInAction } from "mobx";
import instance from "./Instance";

export interface Users {
  Users: [];
}

class UsersStore {
  Users: any[] = [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    try {
      const response: any = await instance.get(`/users`);
      runInAction(() => {
        this.Users = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getDeletedUsers = async () => {
    try {
      const response: any = await instance.get(`/users/deleted`);
      runInAction(() => {
        this.Users = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  UpdateUsers = async (id: any, data: any) => {
    try {
      const response: any = await instance.put(`/user/${id}`, data);
      runInAction(() => {
        this.Users = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  deleteUser = async (id: any) => {
    try {
      const response: any = await instance.put(`/user/delete/${id}`);
      runInAction(() => {
        this.Users = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  returnUser = async (id: any) => {
    try {
      const response: any = await instance.put(`/user/return/${id}`);
      runInAction(() => {
        this.Users = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const usersStore = new UsersStore();

export default usersStore;
