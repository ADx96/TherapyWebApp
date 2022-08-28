import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import usersStore from "../../Mobx/UsersStore";
import { observer } from "mobx-react";

const AboutUser: React.FC = () => {
  const [data, setData] = useState<string[]>([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await usersStore.getUserTherapy(id!);
      const UserData = usersStore.UserData;
      setData({ ...UserData });
    }

    fetchData();
  }, [id]);

  return (
    <div className="card">
      <h2>About Mohamed</h2>
      <DataTable
        value={[data]}
        dataKey="id"
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
      >
        <Column
          body={(rowData) => (
            <div>
              <span className="p-column-title">Name</span>
              {rowData.name}
            </div>
          )}
          field="name"
          header="Name"
          style={{ width: "10%" }}
        />
        <Column field="gender" header="Gender" style={{ width: "10%" }} />
        <Column field="yob" header="YOB" style={{ width: "10%" }} />
        <Column field="created_at" header="RegDate" style={{ width: "10%" }} />
        <Column field="ha_type" header="HaType" style={{ width: "10%" }} />
        <Column field="vp_side" header="VpSide" style={{ width: "10%" }} />
        <Column
          field="vp_start_date"
          header="VpStart"
          style={{ width: "10%" }}
        />
        <Column field="vp_cause" header="VpCause" style={{ width: "10%" }} />
        <Column field="iteration" header="Iteration" style={{ width: "10%" }} />
        <Column field="status" header="Status" style={{ width: "10%" }} />
        <Column
          field="therapy_total_duration"
          header="TherapySpentTime"
          style={{ width: "10%" }}
        />
      </DataTable>
    </div>
  );
};

export default observer(AboutUser);
