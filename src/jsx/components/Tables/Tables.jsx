import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import { Dropdown } from "react-bootstrap";
import axios from "axios";

export default function Tables({
  data,
  headers,
  employe,
  customCellRenderer,
  Title,
  update,
  handleUpdate,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  refresh,
  deleteData,
}) {
  // states
  const csvlink = {
    headers: headers,
    data: data,
    filename: "csvfile.csv",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 8;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  async function handleDelete(id) {
    await deleteData(id)
      .then(() => {
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  const [checked, setChecked] = useState(records);
  const [unchecked, setUnChecked] = useState(true);
  const handleChecked = (id) => {
    let temp = checked.map((data) => {
      if (id === data.id) {
        return { ...data, inputchecked: !data.inputchecked };
      }
      return data;
    });
    setChecked(temp);
  };
  const handleCheckedAll = (value) => {
    let temp = checked.map((data) => {
      return { ...data, inputchecked: value };
    });
    setChecked(temp);
    setUnChecked(!unchecked);
  };

  return (
    <>
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
            <div className="tbl-caption">
              {onStartDateChange && onEndDateChange ? (
                <div className="date-filter d-flex gap-4">
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    placeholder="From Date"
                  />
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    placeholder="To Date"
                  />
                </div>
              ) : (
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              )}
              {!onStartDateChange && !onEndDateChange && (
                <div>
                  <CSVLink
                    {...csvlink}
                    className="btn btn-primary light btn-sm me-2"
                  >
                    <i className="fa-solid fa-file-excel" /> Export Report
                  </CSVLink>
                  <Link
                    to={"#"}
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="offcanvas"
                    onClick={() => employe.current.showEmployeModal()}
                  >
                    {" "}
                    {Title}
                  </Link>{" "}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-1 mt-sm-0"
                  >
                    + Print Report
                  </button>
                </div>
              )}
            </div>
            <div
              id="employee-tbl_wrapper"
              className="dataTables_wrapper no-footer"
            >
              <table
                id="projects-tbl"
                className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0"
              >
                <thead>
                  <tr>
                    <th className="sorting_asc_11">
                      <div className="form-check custom-checkbox ms-0">
                        <input
                          type="checkbox"
                          className="form-check-input checkAllInput"
                          required=""
                          onClick={() => handleCheckedAll(unchecked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkAll"
                        ></label>
                      </div>
                    </th>

                    {headers.map((header, index) => (
                      <th key={index}> {header.label}</th>
                    ))}

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className=" ">
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td className="sorting_20">
                        <div className="form-check11custom-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`emply-${item.id}`}
                            checked={item.inputchecked}
                            onChange={() => handleChecked(item.id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`emply-${item.id}`}
                          ></label>
                        </div>
                      </td>

                      {headers.map((header, headerIndex) => (
                        <td key={headerIndex}>
                          {customCellRenderer &&
                          header.key in customCellRenderer
                            ? customCellRenderer[header.key](item)
                            : item[header.key]}
                        </td>
                      ))}
                      <td>
                        <span>
                          <Dropdown className="input-group">
                            <Dropdown.Toggle
                              variant=""
                              type="button"
                              data-toggle="dropdown"
                            >
                              <i className="fa-solid fa-ellipsis"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                              <Dropdown.Item
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete <i className="fa-solid fa-ban ps-2"></i>
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="dropdown-item"
                                to="#"
                                onClick={() => handleUpdate(item.id)}
                              >
                                {"Update"}
                                <i className="fa-solid fa-pen-nib ps-2"></i>
                              </Dropdown.Item>
                              <Dropdown.Item className="dropdown-item" to="#">
                                View <i className="fa-regular fa-eye ps-2"></i>
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="dropdown-item"
                                to="#"
                                onClick={() => item.id}
                              >
                                {"Inovices"}
                                Inovices{" "}
                                <i className="fa-regular fa-file-lines"></i>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-sm-flex text-center justify-content-between align-items-center">
                <div className="dataTables_info">
                  Showing {lastIndex - recordsPage + 1} to{" "}
                  {data.length < lastIndex ? data.length : lastIndex} of{" "}
                  {data.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers justify-content-center"
                  id="example2_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to="#"
                    onClick={prePage}
                  >
                    <i className="fa-solid fa-angle-left" />
                  </Link>
                  <span>
                    {number.map((n, i) => (
                      <Link
                        className={`paginate_button ${
                          currentPage === n ? "current" : ""
                        } `}
                        key={i}
                        onClick={() => changeCPage(n)}
                      >
                        {n}
                      </Link>
                    ))}
                  </span>
                  <Link
                    className="paginate_button next"
                    to="#"
                    onClick={nextPage}
                  >
                    <i className="fa-solid fa-angle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
