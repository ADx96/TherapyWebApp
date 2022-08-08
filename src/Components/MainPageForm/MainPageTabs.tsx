import React, { useState, useEffect } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import "./Tabs.scss";
import { FaTable, FaUsers, FaMap } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import MainTable from "./MainTable";
import {
  tabVariant,
  tabTextVariant,
  tabContentVariant,
} from "./TabsAnimationSetting";
import UserTable from "../UsersPageComponent/UsersTable";
import Locations from "../LocationsPageComponent/Locations";
import authStore from "../../Mobx/AuthStore";

const MainPageTabs: React.FC = () => {
  const { t } = useTranslation();
  const defaultIndex = 0;
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const Tabs = [
    {
      title: "Suspended",
      id: "Inspections",
      icon: <FaTable />,
      color: "#0b477f",
      content: MainTable,
    },
    {
      title: "Users",
      id: "Users",
      icon: <FaUsers />,
      color: "#0E89EC",
      content: UserTable,
      disabled: authStore.user?.isAdmin === false ? true : false,
    },
    {
      title: "LocationSave",
      id: "Locations",
      icon: <FaMap />,
      color: "#0E89EC",
      content: Locations,
      disabled: authStore.user?.isAdmin === false ? true : false,
    },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--active-color",
      Tabs[activeTabIndex].color
    );
    // eslint-disable-next-line
  }, []);

  // Default to a tab based on the URL hash value
  useEffect(() => {
    const tabFromHash = Tabs.findIndex(
      (Tab) => `#${Tab.id}` === window.location.hash
    );
    setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex);
    // eslint-disable-next-line
  }, []);

  const onTabClick = (index: any) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="container">
      <div className="tabs-component">
        <ul className="tab-links" role="tablist" style={{ direction: "ltr" }}>
          {Tabs.filter((item) => item.disabled !== true).map((Tab, index) => (
            <motion.li
              key={Tab.id}
              className={cn("tab", { active: activeTabIndex === index })}
              role="presentation"
              variants={tabVariant}
              animate={activeTabIndex === index ? "active" : "inactive"}
            >
              <a href={`#${Tab.id}`} onClick={() => onTabClick(index)}>
                {Tab.icon}
                <motion.span variants={tabTextVariant}>
                  {t(Tab.title)}
                </motion.span>
              </a>
            </motion.li>
          ))}
        </ul>
        <div
          className="card"
          style={{
            width: "102%",
          }}
        >
          {Tabs.map((tab: any, index: any) => (
            <motion.div
              role="tabpanel"
              id={tab.id}
              className="tab-content"
              variants={tabContentVariant}
              animate={activeTabIndex === index ? "active" : "inactive"}
              initial="inactive"
            >
              <tab.content />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPageTabs;