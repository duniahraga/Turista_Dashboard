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
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import Multiselect from "multiselect-react-dropdown";

// Define libraries outside of the component
const libraries = ["places"];
const apiKey = "AIzaSyAItmPJt0PQy4507Pu5j1f4-VFe77RjqvU";

const TheResortUpdateModel = forwardRef((props, ref) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [center, setCenter] = useState({ lat: 32.8872, lng: 13.1913 });
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });
  const [addEmploye, setAddEmploye] = useState(false); // Added state for modal visibility

  // Function to show the modal
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      // Set the values in Formik
      formikObj.setValues({
        ...props.resortData,
        // Ensure latitude and longitude are set correctly
        latitude: parseFloat(props.resortData.latitude),
        longitude: parseFloat(props.resortData.longitude),
      });
      setAddEmploye(true); // Show the modal
    },
  }));

  const handleClose = () => setAddEmploye(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    const updatedImages = [...selectedImages, ...imagesArray];
    setSelectedImages(updatedImages);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  // Function to update data
  const updateData = async (values) => {
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:8082/Restore/${props.resortId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      swal("Updated Successfully");
      handleClose();
      props.refresh();
    } catch (error) {
      setErrMsg("An error occurred while updating the resort.");
    }
    setIsLoading(false);
  };

  const onSelectFacility = (selectedList, selectedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      facility: item.facility,
    }));
    formikObj.setFieldValue("facility", updatedSelections);
    // Additional logic if needed
  };
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
  const onRemovefacilty = (selectedList, removedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      facility: item.facility,
    }));
    formikObj.setFieldValue("facility", updatedSelections);
    // Additional logic if needed
  };

  // google search handling
  const [autocomplete, setAutocomplete] = useState(null); // State to hold the Autocomplete instance
  const [searchValue, setSearchValue] = useState(""); // State for the search input
  const [searchError, setSearchError] = useState(null);

  // Google Maps handling
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      handlePlaceSelection(place);
    } else {
      console.error("Autocomplete is not loaded yet!");
    }
  };

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

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng });
    setSelectedLocation({ lat, lng });
    formikObj.setFieldValue("latitude", lat);
    formikObj.setFieldValue("longitude", lng);
  };

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

  // Variables
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

  // Formik setup
  const formikObj = useFormik({
    initialValues: Restore,
    onSubmit: updateData,
    validate: (values) => {
      const errors = {};
      if (
        !values.Title ||
        values.Title.length < 3 ||
        values.Title.length > 35
      ) {
        errors.Title = "Title must be between 3 and 35 characters.";
      }
      // Add more validations as needed
      return errors;
    },
  });

  useEffect(() => {
    // Update form values when resortData changes
    formikObj.setValues({
      id: props.resortData.id || "",
      Title: props.resortData.Title || "",
      Cities: props.resortData.Cities || "",
      Zones: props.resortData.Zones || "",
      CheckInTime: props.resortData.CheckInTime || "",
      CheckOutTime: props.resortData.CheckOutTime || "",
      Advancedinformation: props.resortData.Advancedinformation || [],
      longitude: props.resortData.longitude || "",
      latitude: props.resortData.latitude || "",
      Seizurelaw: props.resortData.Seizurelaw || "",
      Abolitionlaw: props.resortData.Abolitionlaw || "",
      facility: props.resortData.facility || [],
      amenity: props.resortData.amenity || [],
      Description: props.resortData.Description || "",
      NearSea: props.resortData.NearSea || "false",
      NumberOfMeter: props.resortData.NumberOfMeter || "",
    });
    setCenter({
      lat: Number(props.resortData.latitude || 0),
      lng: Number(props.resortData.longitude || 0),
    });
  }, [props.resortData]);

  return (
    <Offcanvas
      show={addEmploye}
      onHide={handleClose}
      className="offcanvas-end customeoff"
      placement="end"
    >
      <div className="container-fluid">
        {errMsg && <div className="alert alert-danger">{errMsg}</div>}
        <div className="modal-header">
          <h1 className="modal-title fs-5">{props.Title}</h1>
          <button type="button" className="btn-close" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <FormikProvider value={formikObj}>
            <form onSubmit={formikObj.handleSubmit}>
              <div className="row">
                <div className="col-lg-12 mb-1">
                  <LoadScript
                    googleMapsApiKey={apiKey} // Replace with your actual API key
                    libraries={libraries}
                    language="ar" // Set language here, use 'en' for English
                  >
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
                  </LoadScript>
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
                    {formikObj.errors.latitude && formikObj.touched.latitude ? (
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
                              <i className="fa-solid fa-trash ps-1"></i>
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
                        options={props.ResortSettingAPIdata} // Assuming you pass this data as a prop
                        selectedValues={formikObj.values.facility}
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
                      options={props.ResortSettingAPIdata} // Assuming you pass this data as a prop
                      selectedValues={formikObj.values.amenity}
                      onSelect={onSelectAmenty}
                      onRemove={onRemoveAmenty}
                      displayValue="amenity"
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div className="form-group mb-3">
                    <label className="text-label">More Details*</label>
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
              <div className="mt-4">
                <button type="submit" className="btn btn-primary me-1">
                  {isLoading ? (
                    <ThreeDots
                      color="#fff"
                      width="50"
                      visible={true}
                      ariaLabel="falling-lines-loading"
                    />
                  ) : (
                    "Update"
                  )}
                </button>
                <Link
                  to={"#"}
                  onClick={handleClose}
                  className="btn btn-danger light ms-1"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </Offcanvas>
  );
});

export default TheResortUpdateModel;
