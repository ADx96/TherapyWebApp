import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import cookies from "js-cookie";
import AddForm from "./AddForm";
import { useMediaQuery } from "react-responsive";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { useTranslation } from "react-i18next";
import inspectionStore from "../../Mobx/InspectionStore";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import "./MainTable.scss";
import UpdateForm from "./UpdateForm";
import TransferForm from "./TransferForm";
import authStore from "../../Mobx/AuthStore";
import DeletedInspections from "./DeletedInspections";

const MainTable: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 895px)" });
  const { t } = useTranslation();
  const [inspections, setInspections] = useState<any>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [transferDialog, setTransferDialog] = useState(false);
  const [UpdateDialog, setUpdateDialog] = useState(false);
  const [returnDialog, setReturnDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState<any>(null);
  const [datefilter1, setDateFilter1] = useState<any>(null);
  const [datefilter2, setDateFilter2] = useState<any>(null);
  const [AllTypesFilter, setAllTypesFilter] = useState<any>(null);
  const [allResultsFilter, setAllResultsFilter] = useState<any>(null);

  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const AllTypes = [{ name: "عمالة متجولة", value: "عمالة متجولة" }];

  const AllResults = [{ name: "مخالفة", value: "مخالفة" }];

  useEffect(() => {
    async function fetchData() {
      await inspectionStore.getInspections();
      const data: any = inspectionStore.Inspections;
      setInspections(data);
    }

    fetchData();
  }, []);

  const fetch = async () => {
    await inspectionStore.getInspections();
    const data: any = inspectionStore.Inspections;
    setInspections(data);
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0"> {t("AllInspections")}</h5>
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

  const save = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("InspectionAdded"),
      life: 3000,
    });
  };
  const saveUpdateProduct = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("InspectionSaved"),
      life: 3000,
    });
  };

  const saveTransfer = () => {
    fetch();
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("InspectionTransferred"),
      life: 3000,
    });
  };

  const hideReturnDialog = () => {
    setReturnDialog(false);
  };

  const openNew = () => {
    setProductDialog(true);
  };
  const openTransfer = () => {
    setProduct({ ...product });
    setTransferDialog(true);
  };

  const hideDialog = () => {
    setProductDialog(false);
  };

  const hideUpdateDialog = () => {
    setUpdateDialog(false);
  };
  const hideTransferDialog = () => {
    setTransferDialog(false);
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const editProduct = (product: any) => {
    setProduct({ ...product });
    setUpdateDialog(true);
  };

  const confirmDeleteProduct = (product: any) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label={t("New")}
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        {authStore.user?.isAdmin ? (
          <Button
            label={t("Transfer")}
            icon="pi pi-plus"
            disabled={selectedProducts.length === 0 ? true : false}
            className="p-button-success p-mr-2"
            onClick={openTransfer}
          />
        ) : (
          <></>
        )}
        {authStore.user?.isAdmin ? (
          <Button
            label={t("Deleted")}
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
            onClick={() => setReturnDialog(true)}
          />
        ) : (
          <></>
        )}
        <Button
          label={t("Order")}
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={() =>
            toggle === false ? setToggle(true) : setToggle(false)
          }
        />
      </React.Fragment>
    );
  };

  const importExcel = (e: any) => {
    const file = e.files[0];

    import("xlsx").then((xlsx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = xlsx.read(e.target?.result, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

        // Prepare DataTable
        const cols: any = data[0];
        data.shift();

        let importedData = data.map((d: any) => {
          return cols.reduce((obj: any, c: any, i: any) => {
            obj[c] = d[i];
            return obj;
          }, {});
        });

        const _products = [...inspections, ...importedData];

        setInspections(_products);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {!isMobile ? (
          <>
            <FileUpload
              mode="basic"
              maxFileSize={1000000}
              chooseLabel={t("ImportCSV")}
              className="p-mr-2 p-d-inline-block"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onUpload={importExcel}
            />
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
                  style={{ marginTop: "10px", width: "100%" }}
                  icon="pi pi-plus"
                  className="p-button-success p-mr-2"
                  onClick={openNew}
                />
              </div>
              <div>
                <FileUpload
                  mode="basic"
                  maxFileSize={1000000}
                  style={{ marginTop: "10px", width: "100%" }}
                  chooseLabel={t("ImportCSV")}
                  className="p-button-success p-mr-2"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onUpload={importExcel}
                />
              </div>
            </div>
            <div>
              <Button
                label={t("Export")}
                style={{ marginTop: "10px", width: "100%" }}
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
              />
            </div>
            <div>
              <Button
                label={t("Order")}
                style={{ marginTop: "10px", width: "100%" }}
                icon="pi pi-plus"
                className="p-button-success p-mr-2"
                onClick={() =>
                  toggle === false ? setToggle(true) : setToggle(false)
                }
              />
            </div>
            <div>
              {authStore.user?.isAdmin ? (
                <Button
                  label={t("Deleted")}
                  style={{ marginTop: "10px", width: "100%" }}
                  icon="pi pi-plus"
                  className="p-button-success p-mr-2"
                  onClick={() => setReturnDialog(true)}
                />
              ) : (
                <></>
              )}
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

  const renderTypeFilter = () => {
    return (
      <MultiSelect
        className="p-column-filter"
        value={AllTypesFilter}
        options={AllTypes}
        onChange={(e: any) => {
          dt.current.filter(e.value, "InspectionType", "in");
          setAllTypesFilter(e.value);
        }}
        placeholder="AllTypes"
        optionLabel="name"
        optionValue="name"
      />
    );
  };

  const renderResultFilte = () => {
    return (
      <MultiSelect
        className="p-column-filter"
        options={AllResults}
        value={allResultsFilter}
        onChange={(e: any) => {
          dt.current.filter(e.value, "InspectionResult", "in");
          setAllResultsFilter(e.value);
        }}
        placeholder="AllResults"
        optionLabel="name"
        optionValue="name"
      />
    );
  };

  const deleteProduct = async () => {
    const id = product?.id;
    await inspectionStore.deleteInspection(id);
    fetch();
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: t("InspectionDelete"),
      life: 3000,
    });
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

  const renderDateFilter = () => {
    return (
      <Calendar
        value={datefilter1}
        onChange={(e: any) => {
          dt.current.filter(e.value, "date1", "custom");
          setDateFilter1(e.value);
        }}
        placeholder="Date"
        dateFormat="mm/dd/yy"
        className="p-column-filter"
      />
    );
  };

  const renderDateFilter2 = () => {
    return (
      <Calendar
        value={datefilter2}
        onChange={(e: any) => {
          dt.current.filter(e.value, "date2", "custom");
          setDateFilter2(e.value);
        }}
        placeholder="Date"
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
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const ResultFilterElement = renderResultFilte();
  const TypeFilterElement = renderTypeFilter();
  const DateFilter = renderDateFilter();
  const DateFilter2 = renderDateFilter2();

  return (
    <div className="inspections-table">
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
          value={inspections}
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
            selectionMode="multiple"
            headerStyle={{ width: "4em" }}
          ></Column>
          <Column
            headerStyle={{ width: "10em" }}
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("CivilID")}</span>
                {rowData.civilId}
              </div>
            )}
            field="civilId"
            className="p-column-title"
            header={t("CivilID")}
            filter={toggle === true ? true : false}
            filterPlaceholder={t("Search")}
          ></Column>
          <Column
            headerStyle={{ width: "10em" }}
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("Establishment")}</span>
                {rowData.Establishment}
              </div>
            )}
            field="Establishment"
            header={t("Establishment")}
          ></Column>
          <Column
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
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
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("InspectionResult")}</span>
                {rowData.InspectionResult}
              </div>
            )}
            field="InspectionResult"
            header={t("InspectionResult")}
            filter={toggle === true ? true : false}
            filterElement={ResultFilterElement}
            filterMatchMode="custom"
          ></Column>
          <Column
            field="date1"
            filter={toggle === true ? true : false}
            filterMatchMode="custom"
            filterFunction={filterDate}
            filterElement={DateFilter}
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("CaseDate")}</span>
                {new Date(rowData.date1).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </div>
            )}
            header={t("CaseDate")}
          ></Column>
          <Column
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("InspectionType")}</span>
                {rowData.InspectionType}
              </div>
            )}
            filter={toggle === true ? true : false}
            filterElement={TypeFilterElement}
            field="InspectionType"
            header={t("InspectionType")}
          ></Column>
          <Column
            filter={toggle === true ? true : false}
            filterMatchMode="custom"
            filterFunction={filterDate}
            filterElement={DateFilter2}
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
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
            filter={toggle === true ? true : false}
            filterPlaceholder={t("Search")}
            header={t("NotificationNumber")}
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">
                  {t("NotificationNumber")}
                </span>
                {rowData.NotificationNumber}
              </div>
            )}
          ></Column>
          <Column
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("SaveFile")}</span>
                {rowData.SaveFile}
              </div>
            )}
            field="SaveFile"
            header={t("SaveFile")}
          ></Column>
          <Column
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
                <span className="p-column-title">{t("Transferred")}</span>
                {rowData.TransferredInspection === null ? "NO" : "YES"}
              </div>
            )}
            field="SaveFile"
            header={t("Transferred")}
          ></Column>
          <Column
            body={(rowData) => (
              <div style={{ direction: "ltr" }}>
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
          visible={productDialog}
          style={{ width: "450px" }}
          header={t("CreateInspection")}
          modal
          className="p-fluid"
          onHide={hideDialog}
        >
          <AddForm save={save} fetch={fetch} hideDialog={hideDialog} />
        </Dialog>
        <Dialog
          visible={UpdateDialog}
          style={{ width: "450px" }}
          header={t("UpdateInspection")}
          modal
          className="p-fluid"
          onHide={hideUpdateDialog}
        >
          <UpdateForm
            saveUpdateProduct={saveUpdateProduct}
            hideUpdateDialog={hideUpdateDialog}
            update={product}
            fetch={fetch}
          />
        </Dialog>

        <Dialog
          visible={transferDialog}
          style={{ width: "450px" }}
          header={t("TransferInspection")}
          modal
          className="p-fluid"
          onHide={hideTransferDialog}
        >
          <TransferForm
            saveTransfer={saveTransfer}
            hideTransferDialog={hideTransferDialog}
            selectedProducts={selectedProducts}
          />
        </Dialog>
        <Dialog
          visible={returnDialog}
          style={{ width: "98vw" }}
          modal
          className="p-fluid"
          draggable={false}
          onHide={hideReturnDialog}
        >
          <DeletedInspections fetch={fetch} />
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
              ? product && (
                  <span>
                    ؟<b>{product.civilId}</b> هل انت متاكد من حذف
                  </span>
                )
              : product && (
                  <span>
                    Are you sure you want to delete <b>{product.civilId}</b>?
                  </span>
                )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
export default observer(MainTable);
