import React from "react";
import AboutUser from "../Components/DetailsPageComponent/AboutUser";
import DetailsTable from "../Components/DetailsPageComponent/DetailsTable";

const TherapyDetailsPage: React.FC = () => {
  return (
    <>
      <AboutUser />
      <div style={{ marginTop: "80px" }}>
        <DetailsTable />
      </div>
    </>
  );
};

export default TherapyDetailsPage;
