import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import { Offcanvas } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Multiselect from "multiselect-react-dropdown";

const ChaletsMmodelUpdate = forwardRef((props, ref) => {
  //APi Test
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [ResortSettingAPIdata, setResortSettingAPIdata] = useState([]);
  const [show, setShow] = useState(false);

  // Chalets setup
  let Chalets = {
    Title: "",
    paymentmethod: "",
    WeekDayPrice: "",
    WeekendDayPrice: "",
    DepositweekDayPrice: "",
    NoOfGuest: "",
    NoOfadults: "",
    NoOfchildren: "",
    Numberofsimilarchalets: "",
    Chaletsize: "",
    Publish: "false",
    dateNotAva: "",
    ImageFile: "",
    facility: [],
    amenity: [],
    Description: "",
    DepositweekendDayPrice: "",
    Guesttype: "",
    TypeofAccommodation: "",
  };

  // Formik setup
  const formikObj = useFormik({
    initialValues: Chalets,
    onSubmit: updateData,
    validate: function (value) {
      seterrMsg(null);
      const errors = {};

      if (!value.Title || value.Title.length < 3 || value.Title.length > 35) {
        errors.Title = "The Title  must be at least 3 letters long";
      }

      if (
        !value.WeekDayPrice ||
        value.WeekDayPrice.length < 3 ||
        value.WeekDayPrice.length > 50
      ) {
        errors.WeekDayPrice =
          "The  Week Day Price must be not less than 3 numbers ";
      }

      if (
        !value.WeekendDayPrice ||
        value.WeekendDayPrice.length < 3 ||
        value.WeekendDayPrice.length > 50
      ) {
        errors.WeekendDayPrice =
          "The Weekend Day Price must be not less than 3 numbers ";
      }
      if (
        !value.NoOfGuest ||
        value.NoOfGuest.length < 3 ||
        value.NoOfGuest.length > 50
      ) {
        errors.NoOfGuest =
          "The Number Of Guset  must be not less than 1 charcters long ";
      }

      if (
        !value.NoOfadults ||
        value.NoOfadults.length < 3 ||
        value.NoOfadults.length > 66
      ) {
        errors.NoOfadults =
          "The Number Of adults  must be not less than 1 charcters long  ";
      }
      if (
        !value.NoOfchildren ||
        value.NoOfchildren.length < 3 ||
        value.NoOfchildren.length > 66
      ) {
        errors.NoOfchildren =
          "The Number Of children  must be not less than 1  charcters long  ";
      }
      if (
        !value.Numberofsimilarchalets ||
        value.Numberofsimilarchalets.length < 3 ||
        value.Numberofsimilarchalets.length > 66
      ) {
        errors.Numberofsimilarchalets =
          "The Number of similar chalets  must be not less than 1 charcters long  ";
      }

      return errors;
    },
  });

  // set values
  useEffect(() => {
    if (props.chaletsData) {
      formikObj.setValues({
        id: props.chaletsData.id || "",
        Title: props.chaletsData.Title || "",
        paymentmethod: props.chaletsData.paymentmethod || "",
        WeekDayPrice: props.chaletsData.WeekDayPrice || "",
        WeekendDayPrice: props.chaletsData.WeekendDayPrice || "",
        DepositweekDayPrice: props.chaletsData.DepositweekDayPrice || "",
        NoOfGuest: props.chaletsData.NoOfGuest || "",
        NoOfadults: props.chaletsData.NoOfadults || "",
        NoOfchildren: props.chaletsData.NoOfchildren || "",
        Numberofsimilarchalets: props.chaletsData.Numberofsimilarchalets || "",
        Chaletsize: props.chaletsData.Chaletsize || "",
        Publish: props.chaletsData.Publish || "",
        dateNotAva: props.chaletsData.dateNotAva || "",
        ImageFile: props.chaletsData.ImageFile || "",
        facility: props.chaletsData.facility || "",
        amenity: props.chaletsData.amenity || "",
        Description: props.chaletsData.Description || "",
        Guesttype: props.chaletsData.Guesttype || "",
        TypeofAccommodation: props.chaletsData.TypeofAccommodation || "",
      });
    }
  }, [props.chaletsData]);

  // get reosrt setting data
  useEffect(() => {
    getResortSettings();
  }, []);

  // Expose the showUpdateModal method
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      setShow(true);
    },
  }));

  // handle close
  const handleClose = () => setShow(false);

  // handle add and remove image
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

  // select and remove facilities

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
  };
  // select and remove amenities
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

  // get reosrt setting data
  async function getResortSettings(params) {
    try {
      const response = await axios.get("http://localhost:8082/ResortSettong");
      setResortSettingAPIdata(response.data); // Store the fetched data in the state
    } catch (error) {
      console.error(error);
    }
  }

  // add data
  async function updateData(value) {
    setisloading(true);
    try {
      await axios
        .put(`http://localhost:8082/Chalets/${props.chaletsId}`, value, {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => swal("update Successfly"));
      formikObj.resetForm();
      handleClose();
      setSelectedImages([]);
      props.getAllData();
    } catch (error) {}

    setisloading(false);
  }

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="offcanvas-end customeoff"
      placement="end"
    >
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                {"hello"}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShow(false)}
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
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Title*</label>
                      <input
                        type="text"
                        name="Title"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Title}
                        className="form-control"
                        placeholder="Title"
                        required
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
                      <label className="text-label">payment method*</label>

                      <Field
                        className="default-select form-control"
                        name="paymentmethod"
                        as="select"
                      >
                        <option data-display="Select">Please select</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Paythefullamount">
                          Pay the full amount
                        </option>
                      </Field>

                      {formikObj.values.paymentmethod === "Deposit" && (
                        <>
                          <div className="col-lg-12 mb-2">
                            <div className="form-group mb-3">
                              <label className="text-label">
                                Deposit Week Day Price*
                              </label>
                              <input
                                type="number"
                                name="DepositweekDayPrice"
                                className="form-control"
                                placeholder="Deposit Week Day Price"
                                onBlur={formikObj.handleBlur}
                                onChange={formikObj.handleChange}
                                value={formikObj.values.DepositweekDayPrice}
                                required
                              />
                              {formikObj.errors.DepositweekDayPrice &&
                              formikObj.touched.DepositweekDayPrice ? (
                                <div className="alert alert-danger">
                                  {formikObj.errors.DepositweekDayPrice}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12 mb-2">
                            <div className="form-group mb-3">
                              <label className="text-label">
                                Deposit Weekend Day Price*
                              </label>
                              <input
                                type="number"
                                name="DepositweekendDayPrice"
                                className="form-control"
                                placeholder="Deposit Weekend Day Price"
                                onBlur={formikObj.handleBlur}
                                onChange={formikObj.handleChange}
                                value={formikObj.values.DepositweekendDayPrice}
                                required
                              />
                              {formikObj.errors.DepositweekendDayPrice &&
                              formikObj.touched.DepositweekendDayPrice ? (
                                <div className="alert alert-danger">
                                  {formikObj.errors.DepositweekendDayPrice}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Week Day Price*</label>
                      <input
                        type="number"
                        name="WeekDayPrice"
                        className="form-control"
                        placeholder="week Day price"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.WeekDayPrice}
                        required
                      />
                      {formikObj.errors.WeekDayPrice &&
                      formikObj.touched.WeekDayPrice ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.WeekDayPrice}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Weekend Day Price*</label>
                      <input
                        type="number"
                        name="WeekendDayPrice"
                        className="form-control"
                        placeholder="Weekend Day Price"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.WeekendDayPrice}
                        required
                      />
                      {formikObj.errors.WeekendDayPrice &&
                      formikObj.touched.WeekendDayPrice ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.WeekendDayPrice}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Chalet size*</label>

                      <Field
                        className="default-select form-control"
                        name="Chaletsize"
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
                      <label className="text-label">checkbox*</label>
                      <div className="col-xl-6 col-lg-6">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-xl-6 col-xxl-6 col-6">
                              <div className="form-check custom-checkbox mb-3 checkbox-warning">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckBox4"
                                  name="Publish"
                                  onBlur={formikObj.handleBlur}
                                  onChange={formikObj.handleChange}
                                  value={formikObj.values.Publish}
                                  required
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="customCheckBox4"
                                >
                                  Publish{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number Of Guest*</label>
                      <input
                        type="number"
                        name="NoOfGuest"
                        className="form-control"
                        placeholder="No Of Guest"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.NoOfGuest}
                        required
                      />
                      {formikObj.errors.NoOfGuest &&
                      formikObj.touched.NoOfGuest ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.NoOfGuest}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number Of adults*</label>
                      <input
                        type="number"
                        name="NoOfadults"
                        className="form-control"
                        placeholder="No Of adults"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.NoOfadults}
                        required
                      />
                      {formikObj.errors.NoOfadults &&
                      formikObj.touched.NoOfadults ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.NoOfadults}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number Of children*</label>
                      <input
                        type="number"
                        name="NoOfchildren"
                        className="form-control"
                        placeholder="No Of children"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.NoOfchildren}
                        required
                      />
                      {formikObj.errors.NoOfchildren &&
                      formikObj.touched.NoOfchildren ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.NoOfchildren}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        Number of similar chalets*
                      </label>

                      <Field
                        className="default-select form-control"
                        name="Numberofsimilarchalets"
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
                      <label className="text-label">
                        select the date not avalible*
                      </label>

                      <Field
                        className="default-select form-control"
                        name="dateNotAva"
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
                      <label className="text-label">Guest type*</label>
                      <Field
                        name="Guesttype"
                        className="default-select form-control"
                        as="select"
                      >
                        <option data-display="Select">Please select</option>
                        <option value="Number">family</option>
                        <option value="Turista">person</option>
                      </Field>
                      {formikObj.errors.Guesttype &&
                      formikObj.touched.Guesttype ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Guesttype}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">نوع الإقامة*</label>
                      <Field
                        name="TypeofAccommodation"
                        className="default-select form-control"
                        as="select"
                      >
                        <option data-display="Select">Please select</option>
                        <option value="Notmal">عادية</option>
                        <option value="VIP">VIP</option>
                      </Field>
                      {formikObj.errors.TypeofAccommodation &&
                      formikObj.touched.TypeofAccommodation ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.TypeofAccommodation}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-2 ">
                    <label>add the Image </label>

                    <input
                      type="file"
                      multiple
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                      name="ImageFile"
                      onBlur={formikObj.handleBlur}
                      value={formikObj.values.ImageFile}
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

                <div className=" mt-4">
                  <button
                    type="submit"
                    disabled={!formikObj.isValid || !formikObj.dirty}
                    className="btn btn-primary me-1"
                  >
                    {isloading ? (
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
                    onClick={() => setShow(false)}
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

export default ChaletsMmodelUpdate;
