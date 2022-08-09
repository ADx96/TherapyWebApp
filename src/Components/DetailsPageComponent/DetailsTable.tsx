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
import authStore from "../../Mobx/AuthStore";

const DetailsTable: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 657px)" });
  const { t } = useTranslation();
  const [users, setUsers] = useState<any>(null);
  const [user, setUser] = useState<any>();
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
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

  const hideDialog = () => {
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          label={t("Export")}
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </>
    );
  };
  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0"> {t("Therapy Taken By")} Mohamed</h5>
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

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" />
    </React.Fragment>
  );

  const DateFilter = renderDateFilter();

  return (
    <div className="users-table">
      <div className="datatable-doc-demo">
        <Toast ref={toast} />

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
          <Column field="fullName" header={t("TherapyDate")} sortable />
          <Column field="username" header={t("Title")} />
          <Column field="isAdmin" header={t("TherapyTime")} />
        </DataTable>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "450px" }}
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
export default DetailsTable;
