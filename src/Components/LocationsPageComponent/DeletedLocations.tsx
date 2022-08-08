import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import cookies from "js-cookie";
import "./LocationsTable.scss";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import locationStore from "../../Mobx/LocationsStore";

interface Props {
  fetch: any;
}

const DeletedLocations: React.FC<Props> = ({ fetch }) => {
  const { t } = useTranslation();
  const [deletedLocations, setDeletedLocations] = useState<any>([]);
  const [dialog, setDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [location, setLocation] = useState<any>();
  const toast = useRef<any>(null);
  const dt = useRef(null);

  useEffect(() => {
    async function fetchData() {
      await locationStore.getDeletedLocations();
      const data: any = locationStore.Locations;
      setDeletedLocations(data);
    }
    fetchData();
  }, []);

  const fetchLocations = async () => {
    await locationStore.getDeletedLocations();
    const data: any = locationStore.Locations;
    setDeletedLocations(data);
  };

  const header = (
    <div className="table-header">
      <h4 style={{ width: "20vw" }} className="p-mx-0 p-my-1">
        {t("DeletedLocations")}
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

  const ReturnTransactionSave = async () => {
    const id = location.id;
    await locationStore.returnLocation(id);
    setDialog(false);
    fetch();
    fetchLocations();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("locationsReturned"),
      life: 3000,
    });
  };

  const ReturnLocation = (location: any) => {
    setLocation({ ...location });
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
        onClick={ReturnTransactionSave}
      />
    </React.Fragment>
  );

  return (
    <div className="locations-table">
      <div className="datatable-doc-demo">
        <Toast ref={toast} />

        <DataTable
          ref={dt}
          value={deletedLocations}
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
            field="NameAr"
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("NameAr")}</span>
                {rowData.NameAr}
              </div>
            )}
            header={t("NameAr")}
            sortable
          ></Column>
          <Column
            field="NameEn"
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("NameEn")}</span>
                {rowData.NameEn}
              </div>
            )}
            header={t("NameEn")}
            sortable
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <span className="p-column-title">{t("Parant")}</span>
                {rowData.parent?.NameEn}
              </div>
            )}
            field="parent_id"
            header={t("Parant")}
            sortable
          ></Column>

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
              ? location && (
                  <span>
                    ؟<b>{location.NameAr}</b> هل انت متاكد من ارجاع
                  </span>
                )
              : location && (
                  <span>
                    Are you sure you want to Return <b>{location.NameAr}</b>?
                  </span>
                )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default DeletedLocations;
