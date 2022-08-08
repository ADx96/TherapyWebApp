import { makeAutoObservable, runInAction } from "mobx";
import instance from "./Instance";

export interface Inspections {
  Inspections: [];
}

class InspectionStore {
  Inspections: any[] = [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  TransferInspection = async (TransferData: any) => {
    try {
      const response: any = await instance.put(
        "/Transferinspections",
        TransferData
      );
      runInAction(() => {
        this.Inspections = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  createInspection = async (InspectionData: any) => {
    try {
      const formData = new FormData();
      for (const key in InspectionData)
        formData.append(key, InspectionData[key]);
      const response = await instance.post("/inspections", InspectionData);
      this.Inspections.push(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  getInspections = async () => {
    try {
      const response: any = await instance.get(`/allinspections`);
      runInAction(() => {
        this.Inspections = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getDeletedInspections = async () => {
    try {
      const response: any = await instance.get(`/inspections/deleted`);
      runInAction(() => {
        this.Inspections = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateInspection = async (id: any, InspectionData: any) => {
    try {
      const response: any = await instance.put(
        `/inspections/${id}`,
        InspectionData
      );
      runInAction(() => {
        this.Inspections = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  returnInspection = async (id: any) => {
    try {
      await instance.put(`/inspections/return/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  deleteInspection = async (id: any) => {
    try {
      await instance.put(`/inspections/delete/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
}

const inspectionStore = new InspectionStore();

export default inspectionStore;
