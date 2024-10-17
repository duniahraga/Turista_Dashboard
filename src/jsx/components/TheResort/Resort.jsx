import React, { useState, useRef, useEffect, useCallback } from "react";
import TheRestoreModelAdd from "./TheResortAddModel";
import TheResortUpdateModel from "./TheResortUpdateModel";
import Tables from "../Tables/Tables";
import { Link } from "react-router-dom";
import axios from "axios";

const Resort = () => {
  const [APIdata, setAPIdata] = useState([]);

  const employe = useRef();
  const Update = useRef();
  const [updateResort, setUpdateResort] = useState([]);

  //============================Display all data=====================================
  function getAllData() {
    axios
      .get(`http://localhost:8082/Restore`)
      .then((res) => {
        setAPIdata(res.data);
      })
      .catch((err) => console.log(err));
  }

  // ===================================================================================

  //showin items in tabel
  useEffect(() => {
    getAllData();
  }, []);

  // ====================update========================================================
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

  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "Title", key: "Title" },
    { label: "Unique ID", key: "UniqueID" },
    { label: "Location", key: "Location" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Chalet", key: "status" }, // Adding defaultValue
  ];
  // we need to add from backend
  const customCellRenderer = {
    status: (row) => (
      <span>
        {row.status === "chalet" || row.status === "" ? (
          <Link className="  badge badge-secondary  " to={`/Chalets`}>
            Chalets
          </Link>
        ) : (
          ""
        )}
      </span>
    ),
  };

  return (
    <>
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={employe}
        customCellRenderer={customCellRenderer}
        Title=" + Add Restore "
        update={Update}
        handleUpdate={handleUpdate}
      />

      <TheRestoreModelAdd
        ref={employe}
        Title="Add Resort"
        getAllData={getAllData}
      />

      {updateResort && (
        <TheResortUpdateModel
          ref={Update}
          resortData={updateResort}
          resortId={updateResort.id}
          refresh={getAllData}
        />
      )}
    </>
  );
};

export default Resort;
