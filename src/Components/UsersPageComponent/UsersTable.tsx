import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import { Toast } from "primereact/toast";
import { Badge } from "primereact/badge";
import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Avatar } from "primereact/avatar";
import { Toolbar } from "primereact/toolbar";
import "./UsersTable.scss";
import usersStore from "../../Mobx/UsersStore";
import AddUsersForm from "./AddUserForm";
import UpdateUsersForm from "./UpdateUserForm";
import authStore from "../../Mobx/AuthStore";
import DeletedUsers from "./DeletedUsers";

const UsersTable: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 657px)" });
  const { t } = useTranslation();
  const [users, setUsers] = useState<any>(null);
  const [user, setUser] = useState<any>();
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [UpdateDialog, setUpdateDialog] = useState(false);
  const [returnDialog, setReturnDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<any>(null);

  const toast = useRef<any>(null);

  const dt = useRef<any>(null);

  const statuses = [
    { name: "Admin", value: true },
    { name: "User", value: false },
  ];

  useEffect(() => {
    async function fetchData() {
      await usersStore.getUsers();
      const data: any = usersStore.Users;
      setUsers(data);
    }
    fetchData();
  }, []);

  const fetch = async () => {
    await usersStore.getUsers();
    const data: any = usersStore.Users;
    setUsers(data);
  };

  const openNew = () => {
    setProductDialog(true);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };

  const hideUpdateDialog = () => {
    setUpdateDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const editProduct = (product: any) => {
    setUser({ ...product });
    setUpdateDialog(true);
  };

  const confirmDeleteProduct = (product: any) => {
    setUser({ ...product });
    setDeleteProductDialog(true);
  };
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label={t("NewUser")}
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        {authStore.user?.isAdmin ? (
          <Button
            label={t("DeletedUsers")}
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
            onClick={() => setReturnDialog(true)}
          />
        ) : (
          <></>
        )}
      </React.Fragment>
    );
  };
  const save = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "user Added",
      life: 3000,
    });
  };

  const saveUpdateUser = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "user Updated",
      life: 3000,
    });
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {!isMobile ? (
          <>
            <Button
              label={t("Export")}
              icon="pi pi-upload"
              className="p-button-help"
              onClick={exportCSV}
            />
          </>
        ) : (
          <div style={{ display: "inline-block" }}>
            <div>
              <div>
                <Button
                  label={t("New")}
                  style={{ marginTop: "10px" }}
                  icon="pi pi-plus"
                  className="p-button-success p-mr-2"
                  onClick={openNew}
                />
              </div>
            </div>
            <div>
              <Button
                label={t("Export")}
                style={{ marginTop: "10px" }}
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };
  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const deleteProduct = async () => {
    const id = user.id;
    if (authStore.user?.id !== id) {
      await usersStore.deleteUser(id);
      fetch();
      setDeleteProductDialog(false);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: t("UserDeleted"),
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: t("CantDelete"),
        life: 3000,
      });
    }
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0"> {t("Users")}</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e: any) => setGlobalFilter(e.target.value)}
          placeholder={t("Search")}
        />
      </span>
    </div>
  );
  const activityBodyTemplate = (rowData: any) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span className="p-column-title">{t("username")}</span>
        {rowData.username}
      </div>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <div>
          <Button
            style={{ marginLeft: "4px" }}
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
            onClick={() => editProduct(rowData)}
          />
        </div>
        <div>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => confirmDeleteProduct(rowData)}
          />
        </div>
      </>
    );
  };

  const filterDate = (value: any, filter: any) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const formatDate = (date: any) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return month + "/" + day + "/" + date.getFullYear();
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <div style={{ direction: "ltr" }}>
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

  const nameBodyTemplate = (rowData: any) => {
    return (
      <div style={{ direction: "ltr" }}>
        <span className="p-column-title">{t("FullName")}</span>
        {rowData.fullName}
      </div>
    );
  };

  const dateBodyTemplate = (rowData: any) => {
    return (
      <div style={{ direction: "ltr" }}>
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

  const renderDateFilter = () => {
    return (
      <Calendar
        value={dateFilter}
        onChange={(e: any) => {
          dt.current.filter(e.value, "createdAt", "custom");
          setDateFilter(e.value);
        }}
        placeholder="Registration Date"
        dateFormat="mm/dd/yy"
        className="p-column-filter"
      />
    );
  };

  const renderStatusFilter = () => {
    return (
      <Dropdown
        style={{ direction: "ltr" }}
        options={statuses}
        onChange={(e: any) => {
          dt.current.filter(e.value, "isAdmin", "equals");
          console.log(e.value);
          setStatusFilter(e.value);
        }}
        showClear
        value={statusFilter}
        placeholder="Select a Role"
        optionLabel="name"
        optionValue="value"
        className="p-column-filter"
      />
    );
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const DateFilter = renderDateFilter();
  const statusFilterElement = renderStatusFilter();

  return (
    <div className="users-table">
      <div className="datatable-doc-demo">
        <Toast ref={toast} />
        {!isMobile ? (
          <Toolbar
            style={{ direction: "ltr" }}
            className="p-mb-4"
            right={rightToolbarTemplate}
            left={!isMobile ? leftToolbarTemplate : <></>}
          ></Toolbar>
        ) : (
          <Toolbar
            left={rightToolbarTemplate}
            style={{
              direction: "ltr",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="p-mb-4"
          >
            : <></>
          </Toolbar>
        )}
        <DataTable
          ref={dt}
          value={users}
          header={header}
          className="p-datatable-customers"
          dataKey="id"
          rowHover
          globalFilter={globalFilter}
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          paginator
          rows={10}
          emptyMessage="No customers found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column
            field="fullName"
            header={t("FullName")}
            body={nameBodyTemplate}
            sortable
          />
          <Column
            field="username"
            header={t("username")}
            body={activityBodyTemplate}
            filterMatchMode="gte"
            filterPlaceholder="Minimum"
          />
          <Column
            field="createdAt"
            header={t("Date")}
            body={dateBodyTemplate}
            filter
            filterMatchMode="custom"
            filterFunction={filterDate}
            filterElement={DateFilter}
          />
          <Column
            field="isAdmin"
            header={t("Role")}
            body={statusBodyTemplate}
            filterMatchMode="custom"
            filter
            filterElement={statusFilterElement}
          />
          <Column field="Image" body={imageBodyTemplate} />

          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{
              textAlign: "center",
              overflow: "visible",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </DataTable>
        <Dialog
          visible={productDialog}
          style={{ width: "450px" }}
          header={t("CreateUserForm")}
          modal
          className="p-fluid"
          onHide={hideDialog}
        >
          <AddUsersForm fetch={fetch} save={save} hideDialog={hideDialog} />
        </Dialog>
        <Dialog
          visible={returnDialog}
          style={{ width: "98vw" }}
          modal
          className="p-fluid"
          onHide={() => setReturnDialog(false)}
        >
          <DeletedUsers fetch={fetch} />
        </Dialog>
        <Dialog
          visible={UpdateDialog}
          style={{ width: "450px" }}
          header={t("UpdateInspection")}
          modal
          className="p-fluid"
          onHide={hideUpdateDialog}
        >
          <UpdateUsersForm
            saveUpdateUser={saveUpdateUser}
            hideUpdateDialog={hideUpdateDialog}
            update={user}
            fetch={fetch}
          />
        </Dialog>
        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px", direction: "ltr" }}
          header={t("Confirm")}
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {cookies.get("i18next") === "ar"
              ? user && (
                  <span>
                    ؟<b>{user.fullName}</b> هل انت متاكد من حذف
                  </span>
                )
              : user && (
                  <span>
                    Are you sure you want to delete <b>{user.fullName}</b>?
                  </span>
                )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
export default UsersTable;
