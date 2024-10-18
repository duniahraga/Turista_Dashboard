import React, { useState, useRef, useEffect, useCallback } from "react";
import { IMAGES } from "../../constant/theme";
import Tables from "../Tables/Tables";
import { Link } from "react-router-dom";

export default function MoniterTraffic() {
  const [tableData, setTableData] = useState([]); // State to hold table data
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const invite = useRef();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8082/Booking");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Map the data to the desired format
        const formattedData = data.map((item) => ({
          id: item.id,
          firstName: item.firstName,
          LastName: item.LastName,
          phoneNumber: item.phoneNumber,
          ChaletName: item.ChaletName,
          EntryDate: item.EntryDate,
          ExitDate: item.ExitDate,
        }));

        setTableData(formattedData); // Set the formatted data to state
        setFilteredData(formattedData); // Initially set filtered data to all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Filter the table data based on the date range
  const filterData = useCallback(() => {
    if (!startDate && !endDate) {
      return tableData; // Return all data if no dates are set
    }

    return tableData.filter((item) => {
      const entryDate = new Date(item.EntryDate);
      const exitDate = new Date(item.ExitDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return entryDate >= start && exitDate <= end;
      } else if (start) {
        return entryDate >= start;
      } else if (end) {
        return exitDate <= end;
      }
      return true;
    });
  }, [tableData, startDate, endDate]);

  useEffect(() => {
    setFilteredData(filterData());
  }, [filterData]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const headersTitle = [
    { label: "ID", key: "id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "LastName" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Chalet Name", key: "ChaletName" },
    { label: "Entry Date", key: "EntryDate" },
    { label: "Exit Date", key: "ExitDate" },
  ];

  return (
    <>
      <Tables
        data={filteredData}
        headers={headersTitle}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
    </>
  );
}
