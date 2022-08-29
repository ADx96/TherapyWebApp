import React from "react";
import Login from "../../Pages/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPageTabs from "../MainPageForm/MainPageTabs";
import Navbar from "../Navbar/Navbar";
import "../GlobalStyles/Styles.css";
import PageNotFound from "../../Pages/PageNotFound";
import DetailsPageTab from "../DetailsPageComponent/DetailsPageTab";
import VFTTab from "../VNTComponent/DetailsPageTab";
import VNTTab from "../VNTComponent/VNTTab";

const ApplicationRoutes: React.FC = () => {
  const { pathname } = useLocation();
  const paths = ["/", "*"];
  return (
    <>
      {!paths.includes(pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Users" element={<MainPageTabs />} />
        <Route path="/Users/UserDetails/:id" element={<DetailsPageTab />} />
        <Route path="/Users/VFT/:id" element={<VFTTab />} />
        <Route path="/Users/VNT/:id" element={<VNTTab />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default ApplicationRoutes;
