// import dependencies
import React, { useState, useRef, useEffect, useCallback } from "react";
import Tables from "../Tables/Tables";
import axios from "axios";

import MealsAddModel from "./MealsAddModel";
import MealsUpdateModel from "./MealsUpdateModel";

const Meals = () => {
  // states
  const [APIdata, setAPIdata] = useState([]);
  const [updateMeal, setupdateMeal] = useState([]);

  // refs
  const employe = useRef();
  const Update = useRef();

  // get all data
  function getAllData() {
    axios
      .get(`http://localhost:8082/Meals`)
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
        setupdateMeal(item);
        Update.current.showUpdateModal();
      }
    },
    [APIdata]
  );

  // delete data
  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8082/Meals/${id}`);
  };

  // headers of the table
  const headersTitle = [
    { label: " ID", key: "id" },
    { label: "Meal", key: "Meal" },
    { label: "Price", key: "Price" },
  ];

  // return the body of the component
  return (
    <>
      {/* table of the data */}
      <Tables
        data={APIdata}
        headers={headersTitle}
        employe={employe}
        Title=" + Add Meal "
        update={Update}
        handleUpdate={handleUpdate}
        refresh={getAllData}
        deleteData={deleteData}
      />

      {/* add data */}
      <MealsAddModel ref={employe} Title="Add Meal" getAllData={getAllData} />

      {/* update data */}
      <MealsUpdateModel
        ref={Update}
        mealsData={updateMeal}
        mealsId={updateMeal.id}
        refresh={getAllData}
      />
    </>
  );
};

export default Meals;
