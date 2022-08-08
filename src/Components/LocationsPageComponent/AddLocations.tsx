import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { TreeSelect } from "primereact/treeselect";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import locationStore from "../../Mobx/LocationsStore";

interface Props {
  hideDialog: any;
  save: any;
  fetch: any;
}

const AddLocations: React.FC<Props> = ({ hideDialog, save, fetch }) => {
  const [nodes, setNodes] = useState<any>([]);
  const [data, setData] = useState<any>({
    NameEn: "",
    NameAr: "",
    parent_id: "",
  });
  const { t } = useTranslation();

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await locationStore.CreateLocation(data);
    fetch();
    save();
    hideDialog();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="name">{t("NameEn")}</label>
          <InputText
            id="name"
            name="NameEn"
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div className="p-field">
          <label htmlFor="name">{t("NameAr")}</label>
          <InputText name="NameAr" id="name" onChange={handleChange} />
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="quantity">{t("Parent")}</label>
            <TreeSelect
              value={data.parent_id}
              options={nodes}
              name="parent_id"
              onChange={handleChange}
              placeholder="Select Item"
            ></TreeSelect>
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

export default AddLocations;
