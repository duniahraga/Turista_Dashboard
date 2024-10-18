import axios from "axios";
import { FormikProvider, useFormik } from "formik";
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

const UserUpdateModel = forwardRef((props, ref) => {
  // state
  const [addEmploye, setAddEmploye] = useState(false);
  //APi Test
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedItemsLogin, setSelectedItemsLogin] = useState([]);
  const [showCheckboxesLogin, setShowCheckboxesLogin] = useState(false);
  const [inputValueLogin, setInputValueLogin] = useState("");

  // Function to show the modal
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      setAddEmploye(true); // Show the modal
    },
  }));

  //varibels
  let Users = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: [],
    phoneNumber: "",
    loginSettings: [],
  };

  //validations
  const formikObj = useFormik({
    initialValues: Users,
    onSubmit: updateData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {};

      if (value.firstName.length < 3 || value.firstName.length > 35) {
        errors.firstName = "The first name  must be at least 3 letters long";
      }

      if (value.lastName.length < 3 || value.lastName.length > 50) {
        errors.lastName =
          "The  last name Price must be not less than 3 letters long ";
      }

      if (
        value.email.includes("@") === false ||
        value.email.includes(".") === false
      ) {
        errors.email = " Email Invalid";
      }

      if (
        !value.phoneNumber ||
        !String(value.phoneNumber).match(/^(?:\+?218)?\d{9}$/)
      ) {
        errors.phoneNumber = "Invalid Libyan phone number";
      }

      if (value.password.length < 6 || value.password.length > 12) {
        errors.password = " Password must be from  6 charcter to 12  charcters";
      }

      return errors;
    },
  });

  const handleClose = () => {
    setAddEmploye(false);
    formikObj.resetForm();
  };

  useEffect(() => {
    formikObj.setValues({
      firstName: props.userData.firstName || "",
      lastName: props.userData.lastName || "",
      email: props.userData.email || "",
      phoneNumber: props.userData.phoneNumber || "",
      password: props.userData.password || "",
      role: props.userData.role || [],
      loginSettings: props.userData.loginSettings || [],
   });

   // Set selected items based on userData
   setSelectedItems(props.userData.role || []);
   setSelectedItemsLogin(props.userData.loginSettings || []);
  }, [props.userData]);

  // roles for the user
  const Roles = [
    { id: 1, label: "إمكانية الحجز" },
    { id: 2, label: "عرض حجوزات هدا الموظف" },
    { id: 3, label: "عرض كل الحجزات في النظام " },
    { id: 4, label: "الدخول لتقارير المالية" },
    { id: 5, label: "الايام المتاحة والغير متاحة" },
    { id: 6, label: "تعديل بيانات المنتجع" },
    { id: 7, label: "تعديل بيانات  الشاليهات" },
    { id: 8, label: "إضافة الشاليهات" },
  ];

  // login settings for the user
  const LoginSettings = [
    { id: 1, label: "تحكم في إعدادات الوجبات" },
    { id: 2, label: "   تحكم في إعدادات الخدمات " },
    { id: 3, label: " تحكم في سعر الضيف الزائد " },
  ];

  // functions
  const handleInputChange = () => {
    setShowCheckboxes(!showCheckboxes);
  };
  const handleInputChangeLogin = () => {
    setShowCheckboxesLogin(!showCheckboxesLogin);
  };

  // Update the input values based on selected items
  const updateInputValues = () => {
    setInputValue(selectedItems.join(", "));
    setInputValueLogin(selectedItemsLogin.join(", "));
  };

  // functions
  const handleCheckboxChange = (label) => {
    let updatedItems;

    if (selectedItems.includes(label)) {
      updatedItems = selectedItems.filter((item) => item !== label);
    } else {
      updatedItems = [...selectedItems, label];
    }

    setSelectedItems(updatedItems);
    formikObj.setFieldValue("role", updatedItems);
    updateInputValues(); // Update input value when checkbox changes
  };

  const handleCheckboxChangeLogin = (label) => {
    let updatedItems;

    if (selectedItemsLogin.includes(label)) {
      updatedItems = selectedItemsLogin.filter((item) => item !== label);
    } else {
      updatedItems = [...selectedItemsLogin, label];
    }

    setSelectedItemsLogin(updatedItems);
    formikObj.setFieldValue("loginSettings", updatedItems);
    updateInputValues(); // Update input value when checkbox changes
  };

  //functions
  async function updateData(value) {
    setisloading(true);

    try {
      await axios.put(`http://localhost:8082/Uers/${props.userID}`, value, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      });
      swal("Update Successfly");
      formikObj.resetForm();
      props.refresh();
      handleClose();
    } catch (error) {}

    setisloading(false);
  }

  // return the body of the component
  return (
    <Offcanvas
      show={addEmploye}
      onHide={handleClose}
      className="offcanvas-end customeoff"
      placement="end"
    >
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                {props.Title}
              </h1>
              <button type="button" className="btn-close" onClick={handleClose}>
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
                      <label className="text-label">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.firstName}
                        className="form-control"
                        placeholder="First Name"
                        required
                      />
                      {formikObj.errors.firstName &&
                      formikObj.touched.firstName ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.firstName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.lastName}
                        required
                      />
                      {formikObj.errors.lastName &&
                      formikObj.touched.lastName ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.lastName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Email*</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.email}
                        required
                      />
                      {formikObj.errors.email && formikObj.touched.email ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.email}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Phone Number*</label>
                      <input
                        type="number"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Phone Number"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.phoneNumber}
                        required
                      />
                      {formikObj.errors.phoneNumber &&
                      formikObj.touched.phoneNumber ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.phoneNumber}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Password*</label>
                      <input
                        type="passeord"
                        name="password"
                        className="form-control"
                        placeholder="Passwoed"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.password}
                        required
                      />
                      {formikObj.errors.password &&
                      formikObj.touched.password ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Role*</label>
                      <input
                        className="form-control"
                        type="text"
                        value={inputValue}
                        onClick={handleInputChange}
                        placeholder="Select items"
                        readOnly // Make it read-only to prevent manual input
                      />
                      {showCheckboxes && (
                        <div className="mt-4 d-flex flex-column flex-wrap">
                          {Roles.map((item) => (
                            <label key={item.id} className="d-inline ms-3">
                              <input
                                type="checkbox"
                                name="role"
                                checked={selectedItems.includes(item.label)}
                                onChange={() =>
                                  handleCheckboxChange(item.label)
                                }
                                onBlur={formikObj.handleBlur}
                              />
                              {item.label}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Login Settings*</label>
                      <input
                        className="form-control"
                        type="text"
                        value={inputValueLogin}
                        onClick={handleInputChangeLogin}
                        placeholder="Select items"
                        readOnly // Make it read-only to prevent manual input
                      />
                      {showCheckboxesLogin && (
                        <div className="mt-4 d-flex flex-column flex-wrap">
                          {LoginSettings.map((item) => (
                            <label key={item.id} className="d-inline ms-3">
                              <input
                                type="checkbox"
                                name="loginSettings"
                                checked={selectedItemsLogin.includes(item.label)}
                                onChange={() =>
                                  handleCheckboxChangeLogin(item.label)
                                }
                                onBlur={formikObj.handleBlur}
                              />
                              {item.label}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
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

export default UserUpdateModel;
