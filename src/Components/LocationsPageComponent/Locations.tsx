import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import "./LocationsTable.scss";
import AddLocations from "./AddLocations";
import UpdateLocations from "./UpdateLocations";
import locationStore from "../../Mobx/LocationsStore";
import DeletedLocations from "./DeletedLocations";
import authStore from "../../Mobx/AuthStore";

const Locations: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 657px)" });
  const { t } = useTranslation();
  const [locations, setLocations] = useState<any>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [UpdateDialog, setUpdateDialog] = useState(false);
  const [returnDialog, setReturnDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [location, setLocation] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef<any>(null);

  const dt = useRef<any>(null);

  useEffect(() => {
    async function fetchData() {
      await locationStore.getLocations();
      setLocations(locationStore.Locations);
    }
    fetchData();
  }, []);

  const fetch = async () => {
    await locationStore.getLocations();
    setLocations(locationStore.Locations);
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0"> {t("LocationSave")}</h5>
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
    setLocation({ ...product });
    setUpdateDialog(true);
  };

  const confirmDeleteProduct = (product: any) => {
    setLocation(product);
    setDeleteProductDialog(true);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label={t("AddNewLocation")}
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        {authStore.user?.isAdmin ? (
          <Button
            label={t("DeletedLocations")}
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
      detail: "Location Added Successful",
      life: 3000,
    });
  };
  const SaveUpdate = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Location Added Successful",
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
              <Button
                label={t("New")}
                style={{ width: "96%", marginTop: "10px" }}
                icon="pi pi-plus"
                className="p-button-success p-mr-2"
                onClick={openNew}
              />
            </div>
            <div>
              <Button
                label={t("DeletedLocations")}
                style={{ width: "96%", marginTop: "10px" }}
                icon="pi pi-plus"
                className="p-button-success p-mr-2"
                onClick={() => setReturnDialog(true)}
              />
            </div>
            <div>
              <Button
                label={t("Export")}
                style={{ width: "96%", marginTop: "10px" }}
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

  const deleteProduct = async () => {
    const id = location?.id;
    await locationStore.deleteLocation(id);
    fetch();
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("LocationDelete"),
      life: 3000,
    });
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          style={{ marginLeft: "4px" }}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
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

  return (
    <div className="locations-table">
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
          value={locations}
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
            field="NameAr"
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
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
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("NameEn")}</span>
                {rowData.NameEn}
              </div>
            )}
            header={t("NameEn")}
            sortable
          ></Column>
          <Column
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
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
          visible={productDialog}
          style={{ width: "450px" }}
          header={t("AddNewLocation")}
          modal
          className="p-fluid"
          onHide={hideDialog}
        >
          <AddLocations fetch={fetch} save={save} hideDialog={hideDialog} />
        </Dialog>
        <Dialog
          visible={UpdateDialog}
          style={{ width: "450px" }}
          header={t("UpdateSaveLocation")}
          modal
          className="p-fluid"
          onHide={hideUpdateDialog}
        >
          <UpdateLocations
            fetch={fetch}
            hideUpdateDialog={hideUpdateDialog}
            location={location}
            SaveUpdate={SaveUpdate}
          />
        </Dialog>

        <Dialog
          visible={returnDialog}
          style={{ width: "98vw" }}
          modal
          className="p-fluid"
          onHide={() => setReturnDialog(false)}
        >
          <DeletedLocations fetch={fetch} />
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
              ? location && (
                  <span>
                    {" "}
                    ؟<b>{location.NameAr}</b> هل انت متاكد من حذف
                  </span>
                )
              : location && (
                  <span>
                    Are you sure you want to delete <b>{location.NameAr}</b>?
                  </span>
                )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
export default Locations;
