import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import UserDialog from "./UserDialog";
import LanguageButton from "../LanguageSwitchButton/LanguageButton";
import Logo from "../../Images/ManPowerLogo.jpeg";
import AuthStore from "../../Mobx/AuthStore";
import NavButton from "./NavButton";

const Navbar: React.FC = () => {
  const [displayPosition, setDisplayPosition] = useState(false);
  const { t } = useTranslation();
  const start = (
    <img alt="logo" src={Logo} height="60" className="p-mr-2"></img>
  );
  const end = <LanguageButton />;

  const Logout = async () => {
    AuthStore.SignOut();
    window.location.reload();
  };
  const items = [
    {
      label: t("SignOut"),
      icon: "pi pi-fw pi-power-off",
      command: () => {
        Logout();
      },
    },
    {
      icon: "pi pi-fw pi-power-off",
      template: () => {
        return <NavButton setDisplayPosition={setDisplayPosition} />;
      },
    },
  ];

  return (
    <>
      <div className="Navbar" style={{ direction: "ltr" }}>
        <div className="card">
          <Menubar model={items} start={start} end={end} />
          <h1 className="title">{t("HeaderTitle")}</h1>
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
