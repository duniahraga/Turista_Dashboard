import React, { useState, useRef, useEffect, useCallback } from "react";
import TheRestoreModelAdd from "./TheResortAddModel";
import TheResortUpdateModel from "./TheResortUpdateModel";
import Tables from "../Tables/Tables";
import { Link } from "react-router-dom";
import axios from "axios";

const Resort = () => {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateResort, setUpdateResort] = useState([]);
  // refs
  const resort = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Restore`)
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
    await axios.delete(`http://localhost:8082/Restore/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "Title", key: "Title" },
    { label: "Unique ID", key: "UniqueID" },
    { label: "Location", key: "Location" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Chalet", key: "status" }, // Adding defaultValue
  ];
  // custom cell renderer
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
  // return the body of the component
  return (
    <>
      {/* table of the data */}
      <Tables
        data={APIdata}
        headers={headersTitle}
        Title=" + Add Restore "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      {/* add data */}
      <TheRestoreModelAdd
        ref={resort}
        Title="Add Resort"
        getAllData={getAllData}
      />

      {/* update data */}
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
