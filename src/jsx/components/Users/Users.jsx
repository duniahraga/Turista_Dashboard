import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";

import UsersAddModel from "./UsersAddModel";
import UsersUpdateModel from "./UsersUpdateModel";

const Users = () => {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateUsers, setUpdateUser] = useState([]);
  // refs
  const employe = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Uers`)
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
        setUpdateUser(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/Uers/${id}`);
  };

  // headers title
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "firstName", key: "firstName" },
    { label: "lastName", key: "lastName" },
    { label: "email", key: "email" },
    { label: "phoneNumber", key: "phoneNumber" },
    { label: "role", key: "role" },
  ];

  // return the body of the component
  return (
    <>
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={employe}
        Title=" + Add User "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      <UsersAddModel ref={employe} Title="Add User" getAllData={getAllData} />

      {/* update data */}
      {updateUsers && (
        <UsersUpdateModel
          ref={Update}
          userData={updateUsers}
          userID={updateUsers.id}
          refresh={getAllData}
        />
      )}
    </>
  );
};

export default Users;
