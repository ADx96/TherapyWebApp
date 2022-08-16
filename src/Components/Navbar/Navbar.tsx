import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import UserDialog from "./UserDialog";
import Logo from "../../Images/Logo.png";
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

  const end = (
    <Button
      onClick={Logout}
      label="Sign Out"
      icon="pi pi-power-off"
      className="p-button-text mr-2 mb-2"
    ></Button>
  );
  return (
    <>
      <div className="Navbar" style={{ direction: "ltr" }}>
        <div className="card">
          <Menubar start={start} end={end} />
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
