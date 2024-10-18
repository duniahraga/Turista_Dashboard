import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";

import GuestsAddModel from "./GuestsAddModel";
import GuestsUpdateModel from "./GuestsUpdateModel";
const Guests = () => {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateGuests, setupdateGuests] = useState([]);

  // refs
  const employe = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Guests`)
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
        setupdateGuests(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/Guests/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "Guests", key: "Guests" },
    { label: "Price", key: "Price" },
  ];

  // custom cell renderer
  return (
    <>
      {/* table */}
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={employe}
        Title="+ Add Guests "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      {/* add data */}
      <GuestsAddModel
        ref={employe}
        Title="Add Guests"
        getAllData={getAllData}
      />

      {/* update data */}
      <GuestsUpdateModel
        ref={Update}
        guestsData={updateGuests}
        guestsId={updateGuests.id}
        refresh={getAllData}
      />
    </>
  );
};

export default Guests;
