import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AboutUser: React.FC = () => {
  return (
    <div className="card">
      <h2>About Mohamed</h2>
      <DataTable
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
      >
        <Column field="code" header="Name" style={{ width: "10%" }} />
        <Column field="name" header="Gender" style={{ width: "10%" }} />
        <Column field="category" header="YOB" style={{ width: "10%" }} />
        <Column field="quantity" header="RegDate" style={{ width: "10%" }} />
        <Column field="quantity" header="HaType" style={{ width: "10%" }} />
        <Column field="quantity" header="VpSide" style={{ width: "10%" }} />
        <Column field="quantity" header="VpStart" style={{ width: "10%" }} />
        <Column field="quantity" header="VpCause" style={{ width: "10%" }} />
        <Column field="quantity" header="Iteration" style={{ width: "10%" }} />
        <Column field="quantity" header="Status" style={{ width: "10%" }} />
        <Column
          field="quantity"
          header="TherapySpentTime"
          style={{ width: "10%" }}
        />
      </DataTable>
    </div>
  );
};

export default AboutUser;
