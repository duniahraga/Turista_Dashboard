import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import Multiselect from "multiselect-react-dropdown";

const TheResortAddModel = forwardRef((props, ref) => {
  //States
  const [addEmploye, setAddEmploye] = useState(false);
  //APi Test
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  const handelClose = () => setAddEmploye(false);
  const [ResortSettingAPIdata, setResortSettingAPIdata] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [center, setCenter] = useState({ lat: 32.8872, lng: 13.1913 }); // Initial center set to Tripoli, Libya
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });
  // google search handling
  const [autocomplete, setAutocomplete] = useState(null); // State to hold the Autocomplete instance
  const [searchValue, setSearchValue] = useState(""); // State for the search input
  const [searchError, setSearchError] = useState(null);

  // select and remove image from states
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    const updatedImages = [...selectedImages, ...imagesArray];
    setSelectedImages(updatedImages);
    localStorage.setItem("selectedImages", JSON.stringify(updatedImages));
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    localStorage.setItem("selectedImages", JSON.stringify(updatedImages));
  };

  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddEmploye(true);
    },
  }));

  //============================Display all data=====================================
  const getResortData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/ResortSettong");
      setResortSettingAPIdata(response.data); // Store the fetched data in the state
    } catch (error) {
      console.error(error);
    }
  };

  // get data
  useEffect(() => {
    getResortData();
  }, []);

  //functions
  async function addData(value) {
    setisloading(true);

    try {
      const response = await axios
        .post("http://localhost:8082/Restore", value, {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => swal("add Successfly"));
      formikObj.resetForm();
      handelClose();
      setSelectedImages([]);
      props.getAllData();
    } catch (error) {}

    setisloading(false);
  }

  // select an remove facilities
  const onSelectFacility = (selectedList, selectedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      facility: item.facility,
    }));
    formikObj.setFieldValue("facility", updatedSelections);
    // Additional logic if needed
  };
  const onRemovefacilty = (selectedList, removedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      facility: item.facility,
    }));
    formikObj.setFieldValue("facility", updatedSelections);
    // Additional logic if needed
  };

  // select and remove amenties
  const onSelectAmenty = (selectedList, selectedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      amenity: item.amenity,
    }));
    formikObj.setFieldValue("amenity", updatedSelections);
    // Additional logic if needed
  };
  const onRemoveAmenty = (selectedList, removedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      amenity: item.amenity,
    }));
    formikObj.setFieldValue("amenity", updatedSelections);
    // Additional logic if needed
  };

  //varibels
  let Restore = {
    Title: "",
    Cities: "",
    Zones: "",
    CheckInTime: "",
    CheckOutTime: "",
    Advancedinformation: [],
    longitude: "",
    latitude: "",
    Seizurelaw: "",
    Abolitionlaw: "",
    facility: [],
    amenity: [],
    Description: "",
    NearSea: "false",
    NumberOfMeter: "",
  };

  //validations
  const formikObj = useFormik({
    initialValues: Restore,
    onSubmit: addData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {};

      if (value.Title.length < 3 || value.Title.length > 35) {
        errors.Title = "The Title  must be at least 3 letters long";
      }

      if (value.longitude.length < 3 || value.longitude.length > 50) {
        errors.longitude = "The  longitude must be not less than 3 numbers ";
      }

      if (value.latitude.length < 3 || value.latitude.length > 50) {
        errors.latitude = "The latitude must be not less than 3 numbers ";
      }
      if (value.Seizurelaw.length < 3 || value.Seizurelaw.length > 50) {
        errors.Seizurelaw =
          "The Seizure law  must be not less than 3 letters long ";
      }

      if (value.Abolitionlaw.length < 3 || value.Abolitionlaw.length > 66) {
        errors.Abolitionlaw =
          "The Abolition law must be not less than 3 leters long  ";
      }

      console.log(errors);
      return errors;
    },
  });

  // handle google map
  // on load
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete); // Set the Autocomplete instance
  };

  // on place changed
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      handlePlaceSelection(place);
    } else {
      console.error("Autocomplete is not loaded yet!");
    }
  };

  // handle place selection
  const handlePlaceSelection = (place) => {
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCenter({ lat, lng });
      setSelectedLocation({ lat, lng });
      formikObj.setFieldValue("latitude", lat);
      formikObj.setFieldValue("longitude", lng);
      setSearchError(null);
    } else {
      setSearchError("No location found for the selected place.");
    }
  };
  // handle search click
  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.findPlaceFromQuery(
        {
          query: searchValue,
          fields: ["geometry", "name"],
        },
        (results, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results.length > 0
          ) {
            handlePlaceSelection(results[0]);
          } else {
            setSearchError(
              "No results found. Please try a different search term."
            );
          }
        }
      );
    }
  };
  // handle map click
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng }); // Center the map on the clicked location
    setSelectedLocation({ lat, lng }); // Set the selected location
    formikObj.setFieldValue("latitude", lat); // Update Formik value
    formikObj.setFieldValue("longitude", lng); // Update Formik value
    console.log("Selected location:", { lat, lng }); // Log the selected location
  };

  // return the body of the component
  return (
    <Offcanvas
      show={addEmploye}
      onHide={setAddEmploye}
      className="offcanvas-end customeoff"
      placement="end"
    >
      <>
        {errMsg ? (
          <div className=" alert alert-danger w-75 text-center fs-4">
            {" "}
            {errMsg}
          </div>
        ) : (
          ""
        )}

        <div className="container-fluid">
          <div className="row">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                {props.Title}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddEmploye(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="offcanvas-body">
          <div className="container-fluid">
            <FormikProvider value={formikObj}>
              <form onSubmit={formikObj.handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 mb-1">
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Search for a location..."
                          className="form-control"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleSearchClick}
                        >
                          Search
                        </button>
                      </div>
                    </Autocomplete>
                    {searchError && (
                      <div className="alert alert-danger">{searchError}</div>
                    )}
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "400px" }}
                      center={center}
                      zoom={10}
                      onClick={handleMapClick} // Handle map click to select location
                    >
                      {/* Render the marker if a location is selected */}
                      {selectedLocation.lat && selectedLocation.lng && (
                        <Marker
                          position={selectedLocation} // Set the position of the marker
                          title="Selected Location" // Optional: Title for the marker
                        />
                      )}
                    </GoogleMap>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Title*</label>
                      <input
                        type="text"
                        name="Title"
                        className="form-control"
                        placeholder="Title"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Title}
                      />
                      {formikObj.errors.Title && formikObj.touched.Title ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Title}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Latitude*</label>
                      <input
                        type="text"
                        name="latitude"
                        className="form-control"
                        placeholder="Latitude"
                        value={formikObj.values.latitude} // Bind to Formik
                        onChange={(e) => {
                          formikObj.handleChange(e);
                          setSelectedLocation({
                            ...selectedLocation,
                            lat: e.target.value,
                          }); // Update selectedLocation
                        }}
                      />
                      {formikObj.errors.latitude &&
                      formikObj.touched.latitude ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.latitude}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Longitude*</label>
                      <input
                        type="text"
                        name="longitude"
                        className="form-control"
                        placeholder="Longitude"
                        value={formikObj.values.longitude} // Bind to Formik
                        onChange={(e) => {
                          formikObj.handleChange(e);
                          setSelectedLocation({
                            ...selectedLocation,
                            lng: e.target.value,
                          }); // Update selectedLocation
                        }}
                      />
                      {formikObj.errors.longitude &&
                      formikObj.touched.longitude ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.longitude}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Cities*</label>
                      <Field
                        name="Cities"
                        className="default-select form-control"
                        as="select"
                      >
                        <option data-display="Select">Please select</option>
                        <option value="html">Ind</option>
                        <option value="css">USA</option>
                        <option value="javascript">UK</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Zones*</label>
                      <Field
                        name="Zones"
                        className="default-select form-control"
                        as="select"
                      >
                        <option data-display="Select">Please select</option>
                        <option value="html">Ind</option>
                        <option value="css">USA</option>
                        <option value="javascript">UK</option>
                      </Field>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <div className="col-xl-12 col-lg-6">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-xl-4 col-xxl-4 col-4">
                              <div className="form-check custom-checkbox mb-3">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckBox1"
                                  name="NearSea"
                                  onBlur={formikObj.handleBlur}
                                  onChange={formikObj.handleChange}
                                  value={formikObj.values.NearSea}
                                />

                                <label
                                  className="form-check-label"
                                  htmlFor="customCheckBox1"
                                >
                                  Near Sea
                                </label>
                              </div>
                            </div>

                            <div className="col-xl-7 col-xxl-7 col-7">
                              <div className="form-check custom-checkbox mb-3 ">
                                <input
                                  type="number"
                                  name="NumberOfMeter"
                                  className=" form-control "
                                  placeholder="meters near see "
                                  required
                                  disabled={!formikObj.values.NearSea}
                                  onBlur={formikObj.handleBlur}
                                  onChange={formikObj.handleChange}
                                  value={formikObj.values.NumberOfMeter}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2 picker-data">
                    <label className="text-label">Check In Time*</label>

                    <div className="color-time-picker">
                      <input
                        className=" form-control"
                        type="time"
                        name="CheckInTime"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.CheckInTime}
                        required
                      />
                      {formikObj.errors.CheckInTime &&
                      formikObj.touched.CheckInTime ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.CheckInTime}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-3 picker-data">
                    <div className="form-group mb-3">
                      <label className="text-label">Check Out Time*</label>
                      <div className="color-time-picker">
                        <input
                          className=" form-control"
                          type="time"
                          name="CheckOutTime"
                          onBlur={formikObj.handleBlur}
                          onChange={formikObj.handleChange}
                          value={formikObj.values.CheckOutTime}
                          required
                        />
                        {formikObj.errors.CheckOutTime &&
                        formikObj.touched.CheckOutTime ? (
                          <div className=" alert alert-danger">
                            {formikObj.errors.CheckOutTime}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label>add the Image </label>
                    <svg
                      width="41"
                      height="40"
                      viewBox="0 0 41 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* SVG paths */}
                    </svg>

                    <div className="mb-3">
                      <input
                        type="file"
                        multiple
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                        name="Advancedinformation"
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.Advancedinformation}
                      />

                      <div>
                        <div className=" d-flex">
                          {selectedImages.map((url, index) => (
                            <div key={index}>
                              <img
                                className="mt-4 mb-4"
                                src={url}
                                alt={`Selected ${index + 1}`}
                                style={{ maxWidth: "100px" }}
                              />
                              <a onClick={() => removeImage(index)}>
                                <i class="fa-solid fa-trash ps-1"></i>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Seizure law*</label>
                      <input
                        type="text"
                        name="Seizurelaw"
                        className="form-control"
                        placeholder="Seizure law"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Seizurelaw}
                      />
                      {formikObj.errors.Seizurelaw &&
                      formikObj.touched.Seizurelaw ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Seizurelaw}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Abolition law*</label>
                      <input
                        type="text"
                        name="Abolitionlaw"
                        className="form-control"
                        placeholder="Abolition law"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Abolitionlaw}
                      />
                      {formikObj.errors.Abolitionlaw &&
                      formikObj.touched.Abolitionlaw ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Abolitionlaw}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">facility*</label>
                      <div>
                        <Multiselect
                          options={ResortSettingAPIdata}
                          selectedValues={formikObj.values.selections}
                          onSelect={onSelectFacility}
                          onRemove={onRemovefacilty}
                          displayValue="facility"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Amenity*</label>
                      <Multiselect
                        options={ResortSettingAPIdata}
                        selectedValues={formikObj.values.amenity}
                        onSelect={onSelectAmenty}
                        onRemove={onRemoveAmenty}
                        displayValue="amenity"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">More Deatials*</label>
                      <textarea
                        name="Description"
                        className="form-control "
                        rows="10"
                        cols="50"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Description}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className=" mt-4">
                  <button type="submit" className="btn btn-primary me-1">
                    {isloading ? (
                      <ThreeDots
                        color="#fff"
                        width="50"
                        visible={true}
                        ariaLabel="falling-lines-loading"
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <Link
                    to={"#"}
                    onClick={() => setAddEmploye(false)}
                    className="btn btn-danger light ms-1"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
      </>
    </Offcanvas>
  );
});

export default TheResortAddModel;
