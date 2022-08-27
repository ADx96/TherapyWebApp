import React from "react";
import Login from "../../Pages/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPageTabs from "../MainPageForm/MainPageTabs";
import Navbar from "../Navbar/Navbar";
import PageNotFound from "../../Pages/PageNotFound";
import DetailsPageTab from "../DetailsPageComponent/DetailsPageTab";

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default ApplicationRoutes;
