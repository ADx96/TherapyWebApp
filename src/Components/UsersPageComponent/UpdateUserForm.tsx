import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import usersStore from "../../Mobx/UsersStore";

interface Props {
  hideUpdateDialog: any;
  update: any;
  saveUpdateUser: any;
  fetch: any;
}

const UpdateUsersForm: React.FC<Props> = ({
  fetch,
  hideUpdateDialog,
  update,
  saveUpdateUser,
}) => {
  const [data, setData] = useState<Date | Date | any>({
    fullName: update.fullName,
    username: update.username,
    password: update.password,
    isAdmin: update.isAdmin,
  });
  const { t } = useTranslation();

  const cities = [
    { name: "Admin", value: true },
    { name: "User", value: false },
  ];
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  data.Date1 = new Date(data.Date1).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  data.Date2 = new Date(data.Date2).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleSubmit = async (e: any) => {
    await usersStore.UpdateUsers(update.id, data);
    fetch();
    hideUpdateDialog();
    saveUpdateUser();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">{t("FullName")}</label>
          <InputText
            id="name"
            defaultValue={update.fullName}
            name="fullName"
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="p-field">
          <label htmlFor="name">{t("username")}</label>
          <InputText
            name="username"
            id="name"
            defaultValue={update.username}
            onChange={handleChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="name">{t("password")}</label>
          <InputText
            type="password"
            name="password"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("InspectionType")}</label>
            <Dropdown
              options={cities}
              value={data.isAdmin}
              onChange={handleChange}
              placeholder={update.isAdmin}
              optionLabel="name"
              name="isAdmin"
            />
          </div>
        </div>
      </form>
      <div style={{ display: "flex", direction: "ltr", width: "38%" }}>
        <Button
          label={t("Cancel")}
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideUpdateDialog}
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

export default UpdateUsersForm;
