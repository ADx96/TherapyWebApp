import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import cookies from "js-cookie";
import "./UsersTable.scss";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import usersStore from "../../Mobx/UsersStore";

interface Props {
  fetch: any;
}

const DeletedUsers: React.FC<Props> = ({ fetch }) => {
  const { t } = useTranslation();
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [user, setUser] = useState<any>(null);
  const toast = useRef<any>(null);
  const dt = useRef(null);

  useEffect(() => {
    async function fetchData() {
      await usersStore.getDeletedUsers();
      const data: any = usersStore.Users;
      setDeletedUsers(data);
    }
    fetchData();
  }, []);

  const fetchUsers = async () => {
    await usersStore.getDeletedUsers();
    const data: any = usersStore.Users;
    setDeletedUsers(data);
  };

  const header = (
    <div className="table-header">
      <h4 style={{ width: "20vw" }} className="p-mx-0 p-my-1">
        {t("DeletedUsers")}
      </h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          style={{ width: "20vw" }}
          type="search"
          onInput={(e: any) => setGlobalFilter(e.target.value)}
          placeholder={t("Search")}
        />
      </span>
    </div>
  );

  const statusBodyTemplate = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">{t("Role")}</span>
        {rowData.isAdmin === true ? (
          <Badge
            value="Admin"
            style={{
              borderRadius: "4px",
              backgroundColor: "#ffcdd2",
              color: "#c63737",
            }}
            className="p-mr-2"
          ></Badge>
        ) : (
          <Badge
            value="User"
            style={{
              borderRadius: "4px",
              backgroundColor: "#b3e5fc",
              color: "#23547b",
            }}
            className="p-mr-2"
          ></Badge>
        )}
      </div>
    );
  };

  const imageBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Avatar
          icon="pi pi-user"
          className="p-mr-2"
          size="large"
          style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
          shape="circle"
        />
      </React.Fragment>
    );
  };
  const activityBodyTemplate = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">{t("username")}</span>
        {rowData.username}
      </div>
    );
  };

  const nameBodyTemplate = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">{t("FullName")}</span>
        {rowData.fullName}
      </div>
    );
  };

  const dateBodyTemplate = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Date</span>
        <span>
          {
            (rowData.createdAt = new Date(rowData.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              }
            ))
          }
        </span>
      </div>
    );
  };

  const ReturnUsersSave = async () => {
    const id = user.id;
    await usersStore.returnUser(id);
    setDialog(false);
    fetchUsers();
    fetch();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("ReturnedSuccessfully"),
      life: 3000,
    });
  };

  const ReturnLocation = (rowData: any) => {
    setUser({ ...rowData });
    setDialog(true);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          tooltip={t("Return")}
          icon="pi pi-refresh"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => ReturnLocation(rowData)}
        />
      </React.Fragment>
    );
  };

  const returnDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={ReturnUsersSave}
      />
    </React.Fragment>
  );

  return (
    <div className="locations-table">
      <div className="datatable-doc-demo">
        <Toast ref={toast} />
        <DataTable
          ref={dt}
          value={deletedUsers}
          dataKey="id"
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-customers"
          rowHover
          rows={10}
          emptyMessage="No users found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column
            field="fullName"
            header={t("FullName")}
            body={nameBodyTemplate}
          />
          <Column
            field="username"
            header={t("username")}
            body={activityBodyTemplate}
          />
          <Column
            field="createdAt"
            header={t("Date")}
            body={dateBodyTemplate}
          />
          <Column
            field="isAdmin"
            header={t("Role")}
            body={statusBodyTemplate}
          />
          <Column field="Image" body={imageBodyTemplate} />

          <Column
            body={actionBodyTemplate}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{
              textAlign: "center",
              overflow: "visible",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </DataTable>
        <Dialog
          visible={dialog}
          style={{ width: "450px", direction: "ltr" }}
          header={t("Confirm")}
          modal
          footer={returnDialogFooter}
          onHide={() => setDialog(false)}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />

            {cookies.get("i18next") === "ar"
              ? user && (
                  <span>
                    ؟<b>{user.fullName}</b> هل انت متاكد من ارجاع
                  </span>
                )
              : user && (
                  <span>
                    Are you sure you want to Return <b>{user.fullName}</b>?
                  </span>
                )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default DeletedUsers;
