import React, { useState } from "react";
import { Image } from "primereact/image";
import Img from "../../Images/VFT_backgroud.png";

import { Dropdown } from "primereact/dropdown";

const VNTImageData: React.FC = () => {
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
      <h1>VNT results taken by Ruba</h1>

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
      <div className="legend vnt">
        <div className="section">
          <div className="circle yellow"></div>First clicked
        </div>
        <div className="section">
          <div className="circle green"></div> Target clicked
        </div>
        <div className="section">
          <div className="circle blue"></div> Target missed
        </div>

        <div className="section">
          <div className="circle red"></div> Distractor clicked
        </div>
        <div className="section switcher">
          <label htmlFor="paths">View path</label>

          <div className="onoffswitch">
            <input
              id="paths"
              name="paths"
              type="checkbox"
              className="onoffswitch-checkbox"
            />
            <label className="onoffswitch-label" htmlFor="paths"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VNTImageData;
