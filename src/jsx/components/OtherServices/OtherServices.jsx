// import dependencies
import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";

import OtherServicesUpdateModel from "./OtherServicesUpdateModel";
import OtherServicesAddModel from "./OtherServicesAddModel";

const OtherServices = () => {
  // state
  const [APIdata, setAPIdata] = useState([]);
  const [updatedServices, setUpdatedServices] = useState([]);
  // refs
  const service = useRef();
  const Update = useRef();

  // get all data
  const getAllData = () => {
    axios
      .get(`http://localhost:8082/OtherServices`)
      .then((res) => {
        setAPIdata(res.data);
      })
      .catch((err) => console.log(err));
  };

  // update data
  useEffect(() => {
    getAllData();
  }, []);

  const handleUpdate = useCallback(
    (id) => {
      const item = APIdata.find((item) => id === item.id);
      if (item) {
        setUpdatedServices(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/OtherServices/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: "ID", key: "id" },
    { label: "Services", key: "Services" },
    { label: "Price", key: "Price" },
  ];

  // return the body of the cmoponent
  return (
    <>
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={service}
        Title=" + Add Other Services "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      <OtherServicesAddModel
        ref={service}
        Title="Add Other Services"
        getAllData={getAllData}
      />

      {updatedServices && (
        <OtherServicesUpdateModel
          ref={Update}
          serviceData={updatedServices}
          serviceId={updatedServices.id}
          refresh={getAllData}
        />
      )}
    </>
  );
};

export default OtherServices;
