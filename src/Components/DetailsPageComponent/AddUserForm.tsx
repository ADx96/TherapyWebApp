import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import authStore from "../../Mobx/AuthStore";

interface Props {
  hideDialog: any;
  save: any;
  fetch: any;
}

const AddUsersForm: React.FC<Props> = ({ hideDialog, save, fetch }) => {
  const [error, setShowError] = useState<any>(false);
  const [error2, setShowError2] = useState<any>(false);
  const [error3, setShowError3] = useState<any>(false);
  const [data, setData] = useState<Date | Date | any>({
    fullName: "",
    username: "",
    password: "",
    isAdmin: "",
  });
  const { t } = useTranslation();

  const type = [
    { name: "Admin", value: true },
    { name: "User", value: false },
  ];
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    data.username = data.username.toLowerCase();
    if (data.fullName === "" || data.password === "" || data.isAdmin === "") {
      setShowError(true);
    } else if (data.username === "") {
      setShowError3(true);
    } else if (authStore.userData[0].status === 0) {
      setShowError2(true);
    } else if (authStore.userData[0].status === 1) {
      fetch();
      hideDialog();
      save();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">{t("FullName")}</label>
          <InputText
            id="name"
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
            required
            className={error2 === true ? "p-invalid p-d-block" : ""}
            id="name"
            onChange={handleChange}
          />
        </div>
        {error2 === true ? (
          <small id="username2-help" className="p-error p-d-block">
            {t("UsernameExist")}
          </small>
        ) : (
          <></>
        )}
        {error3 === true ? (
          <small id="username2-help" className="p-error p-d-block">
            {t("UsernameEmpty")} Username cant be empty
          </small>
        ) : (
          <></>
        )}
        <div className="p-field">
          <label htmlFor="name">{t("password")}</label>
          <InputText
            name="password"
            type="password"
            id="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("Role")}</label>
            <Dropdown
              options={type}
              value={data.isAdmin}
              onChange={handleChange}
              optionLabel="name"
              name="isAdmin"
              required
              placeholder="Select"
            />
          </div>
        </div>
        {error === true ? (
          <small id="username2-help" className="p-error p-d-block">
            {t("CheckEmpty")}
          </small>
        ) : (
          <></>
        )}
        <div
          style={{
            display: "flex",
            direction: "ltr",
            width: "38%",
            marginTop: "30px",
          }}
        >
          <Button
            label={t("Cancel")}
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDialog}
          />
          <Button
            label={t("Save")}
            icon="pi pi-check"
            className="p-button-text"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUsersForm;
