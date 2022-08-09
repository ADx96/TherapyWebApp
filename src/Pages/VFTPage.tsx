import React from "react";
import AboutUser from "../Components/DetailsPageComponent/AboutUser";
import VFTImageData from "../Components/VFTComponent/VFTImageData";

const VFTPage: React.FC = () => {
  return (
    <>
      <AboutUser />
      <div style={{ marginTop: "80px" }}>
        <VFTImageData />
      </div>
    </>
  );
};

export default VFTPage;
