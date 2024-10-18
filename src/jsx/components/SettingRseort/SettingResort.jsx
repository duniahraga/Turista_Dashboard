import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";

// import component
import SettingResortAddModel from "./SettingResortAddModel";
import SettingResortUpdateModel from "./SettingResortUpdateModel";

const SettingResort = () => {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateResort, setUpdateResort] = useState([]);
  // refs
  const employe = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/ResortSettong`)
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
        setUpdateResort(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/ResortSettong/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "facilaty", key: "facility" },
    { label: "amenty", key: "amenity" },
  ];

  // return the body of the component
  return (
    <>
      {/* table of the data  */}
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={employe}
        Title=" + Add Setting "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />
      <SettingResortAddModel
        ref={employe}
        Title="Add Resort"
        getAllData={getAllData}
      />

      {/* update data */}
      {updateResort && (
        <SettingResortUpdateModel
          ref={Update}
          resortData={updateResort}
          resortId={updateResort.id}
          refresh={getAllData}
        />
      )}
    </>
  );
};

export default SettingResort;
