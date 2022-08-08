import { makeAutoObservable, runInAction } from "mobx";
import instance from "./Instance";

export interface Locations {
  Locations: [];
}

class LocationStore {
  Locations: any[] = [];
  loading = true;
  constructor() {
    makeAutoObservable(this);
  }

  getLocations = async () => {
    try {
      const response: any = await instance.get(`/locations`);
      runInAction(() => {
        this.Locations = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getDeletedLocations = async () => {
    try {
      const response: any = await instance.get(`/locations/deleted`);
      runInAction(() => {
        this.Locations = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  UpdateLocation = async (id: any, LocationData: any) => {
    try {
      const response: any = await instance.put(
        `/locations/${id}`,
        LocationData
      );
      runInAction(() => {
        this.Locations = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  CreateLocation = async (LocationData: any) => {
    try {
      const formData = new FormData();
      for (const key in LocationData) formData.append(key, LocationData[key]);
      const response = await instance.post("/locations", LocationData);
      this.Locations.push(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  deleteLocation = async (id: any) => {
    try {
      const response: any = await instance.put(`/location/delete/${id}`);
      runInAction(() => {
        this.Locations = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  returnLocation = async (id: any) => {
    try {
      await instance.put(`/location/return/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
}
const locationStore = new LocationStore();

export default locationStore;
