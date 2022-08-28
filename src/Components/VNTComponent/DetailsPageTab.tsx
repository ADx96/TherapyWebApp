import React, { useEffect } from "react";

import "../MainPageForm/Tabs.scss";
import { useNavigate } from "react-router-dom";

import VFTPage from "../../Pages/VFTPage";

const VFTTab: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.setProperty("--active-color", "#0E89EC");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1 className="title">Therapy Dashboard</h1>
      <div className="tabs-component">
        <ul className="tab-links" role="tablist" style={{ direction: "ltr" }}>
          <div
            onClick={() => {
              navigate(`/Users`);
            }}
            className="backBtn"
          >
            <span className="line tLine"></span>
            <span className="line mLine"></span>
            <span className="label">Go Back</span>
            <span className="line bLine"></span>
          </div>
        </ul>
        <div
          className="card"
          style={{
            width: "102%",
          }}
        >
          <VFTPage />
        </div>
      </div>
    </div>
  );
};

export default VFTTab;
