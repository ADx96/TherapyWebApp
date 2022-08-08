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
  hideUpdateDialog: any;
  update: any;
  saveUpdateProduct: any;
  fetch: any;
}

const UpdateForm: React.FC<Props> = ({
  hideUpdateDialog,
  update,
  fetch,
  saveUpdateProduct,
}) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [data, setData] = useState<Date | Date | any>({
    civilId: update.civilId,
    Establishment: update.Establishment,
    NotificationNumber: update.NotificationNumber,
    InspectionFileNumber: update.InspectionFileNumber,
    InspectionType: update.InspectionType,
    InspectionResult: update.InspectionResult,
    Location: update.Location,
    SaveFile: update.SaveFile,
    date1: update.date1,
    date2: update.date2,
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
    await inspectionStore.updateInspection(update.id, data);
    hideUpdateDialog();
    saveUpdateProduct();
    fetch();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">{t("CivilID")}</label>
          <InputText
            id="name"
            name="civilId"
            defaultValue={update.civilId}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="p-field">
          <label htmlFor="name">{t("Establishment")}</label>
          <InputText
            name="Establishment"
            defaultValue={update.Establishment}
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="name">{t("NotificationNumber")}</label>
          <InputText
            name="NotificationNumber"
            defaultValue={update.NotificationNumber}
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="p-field">
          <label htmlFor="name">{t("Locations")}</label>
          <TreeSelect
            value={data.Location}
            options={nodes}
            name="Location"
            onChange={handleChange}
            placeholder={update.Location}
          ></TreeSelect>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">{t("InspectionFileNumber")}</label>
            <InputText
              name="InspectionFileNumber"
              defaultValue={update.InspectionFileNumber}
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("CaseDate")}</label>
            <Calendar
              id="icon"
              dateFormat="mm/dd/yy"
              showTime={false}
              readOnlyInput
              touchUI={true}
              placeholder={update.date1}
              value={data.date1}
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
              placeholder={update.InspectionType}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity"> {t("InspectionDate")}</label>
            <Calendar
              id="icon"
              dateFormat="mm/dd/yy"
              touchUI={true}
              readOnlyInput
              placeholder={update.date2}
              showTime={false}
              value={data.date2}
              onChange={handleChange}
              name="date2"
              showIcon
            />
          </div>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">{t("SaveFile")}</label>
            <InputText
              id="name"
              name="SaveFile"
              defaultValue={update.SaveFile}
              onChange={handleChange}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("InspectionResult")} </label>
            <Dropdown
              options={Result}
              value={data.InspectionResult}
              onChange={handleChange}
              optionLabel="name"
              name="InspectionResult"
              placeholder={update.InspectionResult}
            />
          </div>
        </div>
      </form>
      <div style={{ display: "flex", width: "38%" }}>
        <Button
          label={t("Cancel")}
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideUpdateDialog}
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

export default UpdateForm;
