import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import "./UsersTable.scss";
import usersStore from "../../Mobx/UsersStore";

const DetailsTable: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await usersStore.getUserTherapy(id!);
      const TherapyData = usersStore.UsersTherapy;
      setData({ ...TherapyData });
    }

    fetchData();
  }, [id]);

  console.log(data);

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

  return (
    <div className="users-table">
      <div className="datatable-doc-demo">
        <DataTable
          value={[data]}
          header={header}
          className="p-datatable-customers"
          dataKey="id"
          rowHover
          globalFilter={globalFilter}
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
      </div>
    </div>
  );
};
export default observer(DetailsTable);
