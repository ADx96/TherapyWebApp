import React, { useState } from "react";
import { Image } from "primereact/image";
import Img from "../../Images/VFT_backgroud.png";

import { Dropdown } from "primereact/dropdown";

const VFTImageData: React.FC = () => {
  const [dateList, setDateList] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const onDateChange = (e: any) => {
    setDateList(e.value);
  };

  return (
    <div className="VFT-Container">
      <h1>VFT results taken by Ruba</h1>

      <Dropdown
        value={dateList}
        options={cities}
        onChange={onDateChange}
        optionLabel="name"
        placeholder="Choose VFT result date"
      />
      {/* <h3 className="Duration-Text">Duration:</h3> */}
      <div className="Main-Image">
        <Image src={Img} alt="VFT-image" width="850" preview />
      </div>
      <div className="PreviewDots">
        <div className="legend">
          <div className="section">
            <div className="dot visible"></div> Seen dot
          </div>
          <div className="section">
            <div className="dot half"></div> Occasionally seen dot
          </div>
          <div className="section">
            <div className="dot miss"></div> Missed dot
          </div>
        </div>
      </div>
    </div>
  );
};

export default VFTImageData;
