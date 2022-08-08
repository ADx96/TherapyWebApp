import React from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

interface Props {
  setDisplayPosition: any;
}

const NavButton: React.FC<Props> = ({ setDisplayPosition }) => {
  const { t } = useTranslation();
  const onClick = () => {
    setDisplayPosition(true);
  };
  return (
    <div>
      <Button
        icon="pi pi-user"
        label={t("MyProfile")}
        style={{ color: "#0859a1" }}
        className="p-button-outlined"
        onClick={onClick}
      />
    </div>
  );
};

export default NavButton;
