import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useTranslation } from "react-i18next";
import { TreeSelect } from "primereact/treeselect";
import { Button } from "primereact/button";
import inspectionStore from "../../Mobx/InspectionStore";
import locationStore from "../../Mobx/LocationsStore";

interface Props {
  hideDialog: any;
  save: any;
  fetch: any;
}

const AddForm: React.FC<Props> = ({ hideDialog, save, fetch }) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [data, setData] = useState<Date | Date | any>({
    civilId: "",
    Establishment: "",
    NotificationNumber: "",
    InspectionFileNumber: "",
    InspectionType: "",
    InspectionResult: "",
    SaveFile: "",
    Location: "",
    date1: "",
    date2: "",
  });
  const { t } = useTranslation();

  const Types = [{ name: "عمالة متجولة", value: "عمالة متجولة" }];
  const Result = [{ name: "مخالفة", value: "مخالفة" }];

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    locationStore.getLocations();
    locationStore.Locations.forEach((item) => {
      item["label"] = item["NameEn"];
      item["key"] = item["id"];
      item["data"] = item["id"];
      if (item.parent_id !== null) {
        let parent = locationStore.Locations.find(
          (a) => item.parent_id === a.id
        );
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    });
    const tree = locationStore.Locations.filter(
      ({ parent_id }) => parent_id === null
    );

    setNodes(tree);
  }, []);

  data.date1 = new Date(data.date1).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  data.date2 = new Date(data.date2).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleSubmit = async (e: any) => {
    await inspectionStore.createInspection(data);
    fetch();
    hideDialog();
    save();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">{t("CivilID")}</label>
          <InputText
            id="name"
            name="civilId"
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="p-field">
          <label htmlFor="name">{t("Establishment")}</label>
          <InputText name="Establishment" id="name" onChange={handleChange} />
        </div>
        <div className="p-field">
          <label htmlFor="name">{t("NotificationNumber")}</label>
          <InputText
            name="NotificationNumber"
            id="name"
            onChange={handleChange}
          />
        </div>

        <div className="p-field">
          <label htmlFor="name">{t("LocationSave")}</label>
          <TreeSelect
            value={data.Location}
            options={nodes}
            name="Location"
            onChange={handleChange}
            placeholder="Select Item"
          ></TreeSelect>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">{t("InspectionFileNumber")}</label>
            <InputText
              name="InspectionFileNumber"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("CaseDate")}</label>
            <Calendar
              style={{ direction: "ltr" }}
              id="icon"
              dateFormat="dd/mm/yy"
              touchUI={true}
              showTime={false}
              readOnlyInput
              value={data.Date1}
              onChange={handleChange}
              name="date1"
              showIcon
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("InspectionType")}</label>
            <Dropdown
              options={Types}
              value={data.InspectionType}
              onChange={handleChange}
              optionLabel="name"
              name="InspectionType"
              placeholder="Select"
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity"> {t("InspectionDate")}</label>
            <Calendar
              style={{ direction: "ltr" }}
              id="icon"
              dateFormat="dd/mm/yy"
              touchUI={true}
              showTime={false}
              readOnlyInput
              value={data.Date2}
              onChange={handleChange}
              name="date2"
              showIcon
            />
          </div>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">{t("SaveFile")}</label>
            <InputText id="name" name="SaveFile" onChange={handleChange} />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("InspectionResult")} </label>
            <Dropdown
              options={Result}
              onChange={handleChange}
              value={data.InspectionResult}
              optionLabel="name"
              name="InspectionResult"
              placeholder="Select"
            />
          </div>
        </div>
      </form>
      <div style={{ display: "flex", direction: "ltr", width: "38%" }}>
        <Button
          label={t("Cancel")}
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDialog}
        />
        <Button
          label={t("Save")}
          icon="pi pi-check"
          className="p-button-text"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddForm;
