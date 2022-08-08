import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import "./LanguageButton.scss";
import i18next from "i18next";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
    dir: "ltr",
  },
  {
    code: "ar",
    name: "العربية",
    country_code: "kwt",
    dir: "rtl",
  },
];

const LanguageButton: React.FC = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [toggled, setToggled] = React.useState(false);
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const handleChange = () => {
    toggled ? setToggled(false) : setToggled(true);
  };

  return (
    <div className="Language-Button">
      <div className="group">
        <input
          type="radio"
          name="rb"
          id="rb1"
          checked={currentLanguageCode === "ar" ? true : false}
          onChange={handleChange}
          onClick={() => i18next.changeLanguage("ar")}
        />
        <label htmlFor="rb1">AR</label>
        <input
          type="radio"
          name="rb"
          id="rb2"
          checked={currentLanguageCode === "en" ? true : false}
          onClick={() => i18next.changeLanguage("en")}
          onChange={handleChange}
        />
        <label htmlFor="rb2">EN</label>
      </div>
    </div>
  );
};

export default LanguageButton;
