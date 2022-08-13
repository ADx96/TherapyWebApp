import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import UserDialog from "./UserDialog";
import Logo from "../../Images/header.png";
import AuthStore from "../../Mobx/AuthStore";

const Navbar: React.FC = () => {
  const [displayPosition, setDisplayPosition] = useState(false);
  const { t } = useTranslation();
  const start = (
    <img alt="logo" src={Logo} height="60" className="p-mr-2"></img>
  );

  const Logout = async () => {
    AuthStore.SignOut();
  };

  const items = [
    {
      label: t("SignOut"),
      icon: "pi pi-fw pi-power-off",
      command: () => {
        Logout();
      },
    },
  ];

  return (
    <>
      <div className="Navbar" style={{ direction: "ltr" }}>
        <div className="card">
          <Menubar model={items} start={start} />
        </div>
      </div>

      <UserDialog
        displayPosition={displayPosition}
        setDisplayPosition={setDisplayPosition}
      />
    </>
  );
};
export default Navbar;
