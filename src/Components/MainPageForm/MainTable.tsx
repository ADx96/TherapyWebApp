import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react";

import { useTranslation } from "react-i18next";
import { Toolbar } from "primereact/toolbar";
import "./MainTable.scss";
import usersStore from "../../Mobx/UsersStore";

const MainTable: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 895px)" });
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState<any>(null);

  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  useEffect(() => {
    async function fetchData() {
      await usersStore.getUsers();
      const data: any = usersStore.Users;
      setData(data);
    }

    fetchData();
  }, []);

  const HandleNavigation = (text: string, id: number) => {
    navigate(`${text}${id}`);
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0"> {t("Users Therapy")}</h5>
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

  const exportCSV = () => {
    dt.current.exportCSV();
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
            <div></div>
            <div>
              <Button
                label={t("Export")}
                style={{ marginTop: "10px", width: "100%" }}
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

    return date.getFullYear() + "-" + month + "-" + day;
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <div>
          <Button
            onClick={() => HandleNavigation("/Users/UserDetails/", rowData.id)}
            style={{ marginLeft: "4px" }}
            className="p-button-rounded p-button-success p-mr-2"
          >
            Therapy
          </Button>
        </div>
        <div>
          <Button
            style={{ marginLeft: "4px" }}
            onClick={() => HandleNavigation("/Users/VFT/", rowData.id)}
            className="p-button-rounded p-button-success p-mr-2"
          >
            VFT
          </Button>
        </div>
        <div>
          <Button
            onClick={() => HandleNavigation("/Users/VFT/", rowData.id)}
            style={{ marginLeft: "4px" }}
            className="p-button-rounded p-button-success p-mr-2"
          >
            VNT
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="inspections-table">
      <div className="datatable-doc-demo">
        <Toast ref={toast} />
        {!isMobile ? (
          <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        ) : (
          <Toolbar
            left={rightToolbarTemplate}
            style={{
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
          value={data}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-customers"
          rowHover
          rows={10}
          emptyMessage="No customers found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("#")}</span>
                {rowData.examinationId}
              </div>
            )}
            field="InspectionFileNumber"
            header={t("#")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Name")}</span>
                {rowData.name}
              </div>
            )}
            field="InspectionType"
            header={t("Name")}
          ></Column>
          <Column
            headerStyle={{ width: "10em" }}
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Gender")}</span>
                {rowData.gender}
              </div>
            )}
            field="civilId"
            className="p-column-title"
            header={t("Gender")}
            filter={toggle === true ? true : false}
            filterPlaceholder={t("Search")}
          ></Column>
          <Column
            headerStyle={{ width: "10em" }}
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("YOB")}</span>
                {rowData.yob}
              </div>
            )}
            field="Establishment"
            header={t("YOB")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("RegDate")}</span>
                {rowData.created_at}
              </div>
            )}
            field="InspectionResult"
            header={t("RegDate")}
          ></Column>
          <Column
            field="date1"
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("HaType")}</span>
                {rowData.ha_type}
              </div>
            )}
            header={t("HaType")}
          ></Column>
          <Column
            filter={toggle === true ? true : false}
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("VpSide")}</span>
                <div>
                  <span className="p-column-title">{t("VpStart")}</span>
                  {rowData.vp_side}
                </div>
              </div>
            )}
            field="date2"
            header={t("VpSide")}
          ></Column>
          <Column
            filter={toggle === true ? true : false}
            filterPlaceholder={t("Search")}
            header={t("VpStart")}
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("VpStart")}</span>
                {rowData.vp_start_date}
              </div>
            )}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("VpCause")}</span>
                {rowData.vp_extra_cause}
              </div>
            )}
            field="SaveFile"
            header={t("VpCause")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Iteration")}</span>
                {rowData.TransferredInspection === null ? "NO" : "YES"}
              </div>
            )}
            field="SaveFile"
            header={t("Iteration")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("TherapySpentTime")}</span>
                {rowData.Location}
              </div>
            )}
            field="Location"
            header={t("TherapySpentTime")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Status")}</span>
                {rowData.status}
              </div>
            )}
            field="Location"
            header={t("Status")}
          ></Column>

          <Column
            header="Action"
            body={actionBodyTemplate}
            headerStyle={{ width: "50px", textAlign: "center" }}
            bodyStyle={{
              textAlign: "center",
              overflow: "visible",
              display: "flex",
              justifyContent: "center",
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default observer(MainTable);
