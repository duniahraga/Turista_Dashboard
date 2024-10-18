// import dependencies
import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";
import { Link } from "react-router-dom";
// import components
import ChaletsAddModel from "./ChaletsAddModel";
import ChaletsUpdateModel from "./ChaletsUpdateModel";

export default function Chalets() {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateChalets, setUpdateChalets] = useState([]);
  // refs
  const chalets = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Chalets`)
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
        setUpdateChalets(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/Chalets/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "Title", key: "Title" },
    { label: "Publish", key: "Publish" },
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
        employe={chalets}
        customCellRenderer={customCellRenderer}
        Title=" + Add Chalets "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      <ChaletsAddModel
        ref={chalets}
        Title="Add Chalets"
        getAllData={getAllData}
      />

      {updateChalets && (
        <ChaletsUpdateModel
          ref={Update}
          chaletsData={updateChalets}
          chaletsId={updateChalets.id}
          refresh={getAllData}
        />
      )}
    </>
  );
}
