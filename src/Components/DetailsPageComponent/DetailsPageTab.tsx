import React, { useState, useEffect } from "react";

import "../MainPageForm/Tabs.scss";
import { useNavigate } from "react-router-dom";

import TherapyDetailsPage from "../../Pages/TherapyDetailsPage";

const DetailsPageTab: React.FC = () => {
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
              navigate(`/MainPage`);
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
          <TherapyDetailsPage />
        </div>
      </div>
    </div>
  );
};

export default DetailsPageTab;