import React from "react";
import AboutUser from "../Components/DetailsPageComponent/AboutUser";
import VNTImageData from "../Components/VNTComponent/VNTImageData";

const VNTPage: React.FC = () => {
  return (
    <>
      <AboutUser />
      <div style={{ marginTop: "80px" }}>
        <VNTImageData />
      </div>
    </>
  );
};

export default VNTPage;
