// import dependencies
import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";
// import components
import SettingsAddModel from "./SettingsAddModel";
import SettingsUpdateModel from "./SettingsUpdateModel";

const Settings = () => {
  // state
  const [APIdata, setAPIdata] = useState([]);
  const [updateSetting, setUpdateSetting] = useState([]);

  // refs
  const setting = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Setting`)
      .then((res) => {
        setAPIdata(res.data);
      })
      .catch((err) => console.log(err));
  }

  // get all data on load
  useEffect(() => {
    getAllData();
  }, []);

  // update data
  const handleUpdate = useCallback(
    (id) => {
      const item = APIdata.find((item) => id === item.id);
      if (item) {
        setUpdateSetting(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/Setting/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "Title", key: "Title" },
    { label: "Auther", key: "Auther" },
  ];

  // return the body of the component
  return (
    <>
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={setting}
        Title="+ Add Setting "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      {/* add data */}
      <SettingsAddModel
        ref={setting}
        Title="Add Setting"
        getAllData={getAllData}
        APIdata={APIdata}
      />

      {/* update data */}
      <SettingsUpdateModel
        ref={Update}
        settingData={updateSetting}
        settingId={updateSetting.id}
        refresh={getAllData}
      />
    </>
  );
};

export default Settings;
