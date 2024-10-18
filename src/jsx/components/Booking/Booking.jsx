import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import { Link } from "react-router-dom";
import axios from "axios";
// components
import BookingAddModel from "./BookingAddModel";
import BookingUpdateModel from "./BookingUpdateModel";

const Booking = () => {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateBooking, setUpdateBooking] = useState([]);
  // refs
  const booking = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Booking`)
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
        setUpdateBooking(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/Booking/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: "ID", key: "id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "LastName" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Whatsapp Number", key: "whatsappNumber" },
    { label: "Residential Address", key: "Residentialِddress" },
    { label: "Entry Date", key: "EntryDate" },
    { label: "Exit Date", key: "ExitDate" },
  ];

  // custom cell renderer
  const customCellRenderer = {
    status: (row) => (
      <span>
        {row.status === "cancelled" ? (
          <Link className=" badge badge-danger " to={`/Chalets/${row.id}`}>
            {row.status}
          </Link>
        ) : (
          <Link className="badge badge-success " to={`/inactive/${row.id}`}>
            {row.status}
          </Link>
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
        employe={booking}
        customCellRenderer={customCellRenderer}
        Title=" + Add Booking "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      {/* add data */}
      <BookingAddModel
        ref={booking}
        Title="Add Booking"
        getAllData={getAllData}
        ApiDate={APIdata}
      />

      {/* update data */}
      <BookingUpdateModel
        ref={Update}
        bookingData={updateBooking}
        bookingId={updateBooking.id}
        refresh={getAllData}
      />
    </>
  );
};

export default Booking;
