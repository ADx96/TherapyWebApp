import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import cookies from "js-cookie";
import "./MainTable.scss";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import inspectionStore from "../../Mobx/InspectionStore";

interface Props {
  fetch: any;
}

const DeletedInspections: React.FC<Props> = ({ fetch }) => {
  const { t } = useTranslation();
  const [deletedInspections, setDeletedInspections] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [inspection, setInspection] = useState<any>();
  const toast = useRef<any>(null);
  const dt = useRef(null);

  useEffect(() => {
    async function fetchData() {
      await inspectionStore.getDeletedInspections();
      const data: any = inspectionStore.Inspections;
      setDeletedInspections(data);
    }

    fetchData();
  }, []);

  const fetchInspection = async () => {
    await inspectionStore.getDeletedInspections();
    const data: any = inspectionStore.Inspections;
    setDeletedInspections(data);
  };

  const header = (
    <div className="table-header">
      <h4 style={{ width: "20vw" }} className="p-mx-0 p-my-1">
        {t("DeletedInspections")}
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

  const ReturnInspectionSave = async () => {
    const id = inspection.id;
    await inspectionStore.returnInspection(id);
    setDialog(false);
    fetchInspection();
    fetch();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("ReturnedSuccessfully"),
      life: 3000,
    });
  };

  const ReturnInspection = (rowData: any) => {
    setInspection({ ...rowData });
    setDialog(true);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          tooltip={t("Return")}
          icon="pi pi-refresh"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => ReturnInspection(rowData)}
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
        onClick={ReturnInspectionSave}
      />
    </React.Fragment>
  );

  return (
    <div className="inspections-table">
      <div className="datatable-doc-demo">
        <Toast ref={toast} />

        <DataTable
          ref={dt}
          value={deletedInspections}
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
            headerStyle={{ width: "10em" }}
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("CivilID")}</span>
                {rowData.civilId}
              </div>
            )}
            field="civilId"
            className="p-column-title"
            header={t("CivilID")}
            filterPlaceholder={t("Search")}
          ></Column>
          <Column
            headerStyle={{ width: "10em" }}
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Establishment")}</span>
                {rowData.Establishment}
              </div>
            )}
            field="Establishment"
            header={t("Establishment")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">
                  {t("InspectionFileNumber")}
                </span>
                {rowData.InspectionFileNumber}
              </div>
            )}
            field="InspectionFileNumber"
            header={t("InspectionFileNumber")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("InspectionResult")}</span>
                {rowData.InspectionResult}
              </div>
            )}
            field="InspectionResult"
            header={t("InspectionResult")}
          ></Column>
          <Column
            field="date1"
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("CaseDate")}</span>
                {rowData.date1}
              </div>
            )}
            header={t("CaseDate")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("InspectionType")}</span>
                {rowData.InspectionType}
              </div>
            )}
            field="InspectionType"
            header={t("InspectionType")}
          ></Column>
          <Column
            filterMatchMode="custom"
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("InspectionDate")}</span>
                {new Date(rowData.date2).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </div>
            )}
            field="date2"
            header={t("InspectionDate")}
          ></Column>
          <Column
            field="NotificationNumber"
            filterPlaceholder={t("Search")}
            header={t("NotificationNumber")}
            body={(rowData) => (
              <div>
                <span className="p-column-title">
                  {t("NotificationNumber")}
                </span>
                {rowData.NotificationNumber}
              </div>
            )}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("SaveFile")}</span>
                {rowData.SaveFile}
              </div>
            )}
            field="SaveFile"
            header={t("SaveFile")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Transferred")}</span>
                {rowData.TransferredInspection === null ? "NO" : "YES"}
              </div>
            )}
            field="SaveFile"
            header={t("Transferred")}
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("LocationSave")}</span>
                {rowData.Location}
              </div>
            )}
            field="Location"
            header={t("LocationSave")}
          ></Column>
          <Column
            body={actionBodyTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{
              textAlign: "center",
              overflow: "visible",
              display: "flex",
              justifyContent: "center",
            }}
          ></Column>
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
              ? inspection && (
                  <span>
                    ؟<b>{inspection.civilId}</b> هل انت متاكد من ارجاع
                  </span>
                )
              : inspection && (
                  <span>
                    Are you sure you want to return <b>{inspection.civilId}</b>?
                  </span>
                )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default DeletedInspections;
