import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import usersStore from "../../Mobx/UsersStore";
import inspectionStore from "../../Mobx/InspectionStore";
import authStore from "../../Mobx/AuthStore";

interface Props {
  hideTransferDialog: any;
  selectedProducts: any;
  saveTransfer: any;
}

const TransferForm: React.FC<Props> = ({
  hideTransferDialog,
  selectedProducts,
  saveTransfer,
}) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<any[]>([]);
  const [data, setData] = useState({
    transferredId: "",
  });

  useEffect(() => {
    usersStore.getUsers();
    let temp = usersStore.Users.filter(
      (item) => authStore.user?.id !== item.id
    ).map((item) => ({
      name: item.fullName,
      value: item.id,
    }));
    setUser(temp);
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const IDs = selectedProducts.map((s: any) => s.id);
  const SendData: any = [];
  IDs.forEach((Id: any) => {
    const inspectionId = {
      inspectionId: Id,
      transferredId: data.transferredId,
    };
    SendData.push(inspectionId);
  });

  const handleSubmit = async () => {
    hideTransferDialog();
    saveTransfer();
    SendData.forEach((data: any) => {
      inspectionStore.TransferInspection(data);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("Transferto")}</label>
            <Dropdown
              options={user}
              value={data.transferredId}
              onChange={handleChange}
              optionLabel="name"
              name="transferredId"
              placeholder="Select"
            />
          </div>
        </div>
      </form>
      <div style={{ display: "flex", direction: "ltr", width: "38%" }}>
        <Button
          label={t("Cancel")}
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideTransferDialog}
        />
        <Button
          label={t("Save")}
          icon="pi pi-check"
          className="p-button-text"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default TransferForm;
