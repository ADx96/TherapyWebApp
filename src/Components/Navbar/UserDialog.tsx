import React from "react";
import { Dialog } from "primereact/dialog";
import "./UserDialog.scss";
import { Avatar } from "primereact/avatar";
import authStore from "../../Mobx/AuthStore";

interface Props {
  setDisplayPosition: any;
  displayPosition: any;
}
const UserDialog: React.FC<Props> = ({
  setDisplayPosition,
  displayPosition,
}) => {
  const onHide = () => {
    setDisplayPosition(false);
  };
  return (
    <Dialog
      visible={displayPosition}
      position={"left"}
      modal
      className="user-dialog"
      onHide={onHide}
      breakpoints={{ "960px": "75vw" }}
      draggable={false}
      resizable={false}
    >
      <div className="dialog">
        <div className="dialog-container">
          <div className="cover-photo">
            <Avatar
              icon="pi pi-user"
              className="profile"
              style={{ backgroundColor: "#022e47", color: "#ffffff" }}
              shape="circle"
            />
          </div>
          <div className="profile-name">{authStore.user?.fullName}</div>
          <p className="about">
            {authStore.user?.username}
            <br />
            {authStore.user?.isAdmin ? "Admin" : "User"}
          </p>
        </div>
      </div>
    </Dialog>
  );
};
export default UserDialog;
