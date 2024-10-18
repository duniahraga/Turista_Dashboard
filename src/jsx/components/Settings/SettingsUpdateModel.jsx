// import dependencies
import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

// create the component
const SettingsUpdateModel = forwardRef((props, ref) => {
  //States
  const [addEmploye, setAddEmploye] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesTtileLaogo, setSelectedImagesTtileLaogo] = useState([]);
  const [selectedImagesFavIcon, setSelectedImagesFavIcon] = useState([]);

  //varibels
  let Settings = {
    MainLogo: "",
    logotitle: "",
    FavIcon: "",
    Title: "",
  };

  //validations
  const formikObj = useFormik({
    initialValues: Settings,
    onSubmit: updateData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {};

      if (!value.Title || value.Title.length < 3 || value.Title.length > 35) {
        errors.Title = "The Title  must be at least 3 letters long";
      }

      return errors;
    },
  });

  useEffect(() => {
    // Update form values when bookingData changes
    formikObj.setValues({
      Title: props.settingData.Title || "",
      MainLogo: props.settingData.MainLogo || "",
      logotitle: props.settingData.logotitle || "",
      FavIcon: props.settingData.FavIcon || "",
    });
  }, [props.settingData]);

  // handle close
  const handelClose = () => {
    setAddEmploye(false);
    formikObj.resetForm();
    setSelectedImages([]);
    setSelectedImagesFavIcon([]);
    setSelectedImagesTtileLaogo([]);
  };

  // Function to show the modal
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      setAddEmploye(true); // Show the modal
    },
  }));

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImages([imageUrl]); // Update the selected images state

    // Update the formikObj values with the image path in MainLogo field
    formikObj.setFieldValue("MainLogo", imageUrl); // Update MainLogo field using setFieldValue

    localStorage.setItem("selectedImages", JSON.stringify([imageUrl]));

    // Clear the file input value to allow selecting the same file again
    e.target.value = null;
  };

  // remove image
  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    localStorage.setItem("selectedImages", JSON.stringify(updatedImages));
  };

  // handle image change title logo
  const handleImageChangeLogotitle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImagesTtileLaogo([imageUrl]); // Update the selected images state

    // Update the formikObj values with the image path in MainLogo field
    formikObj.setFieldValue("logotitle", imageUrl); // Update MainLogo field using setFieldValue

    localStorage.setItem(
      "selectedImagesTtileLaogo",
      JSON.stringify([imageUrl])
    );

    // Clear the file input value to allow selecting the same file again
    e.target.value = null;
  };

  // remove image title logo
  const removeImageTitleLogo = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImagesTtileLaogo(updatedImages);
    localStorage.setItem(
      "selectedImagesTtileLaogo",
      JSON.stringify(updatedImages)
    );
  };

  // handle image change fav icon
  const handleImageChangeFavIcon = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImagesFavIcon([imageUrl]); // Update the selected images state

    // Update the formikObj values with the image path in MainLogo field
    formikObj.setFieldValue("FavIcon", imageUrl); // Update MainLogo field using setFieldValue

    localStorage.setItem("selectedImagesFavIcon", JSON.stringify([imageUrl]));

    // Clear the file input value to allow selecting the same file again
    e.target.value = null;
  };

  // remove image fav icon
  const removeImageFavIcon = (index) => {
    const updatedImages = [...selectedImagesFavIcon];
    updatedImages.splice(index, 1);
    setSelectedImagesFavIcon(updatedImages);
    localStorage.setItem(
      "selectedImagesFavIcon",
      JSON.stringify(updatedImages)
    );
  };

  //functions
  async function updateData(value) {
    setisloading(true);

    try {
      const response = await axios
        .put(`http://localhost:8082/Setting/${props.settingId}`, value, {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => {
          swal("update Successfly");
          handelClose();
          props.refresh();
        });
    } catch (error) {}

    setisloading(false);
  }

  // return the body of the component
  return (
    <Offcanvas
      show={addEmploye}
      onHide={handelClose}
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
              <button type="button" className="btn-close" onClick={handelClose}>
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
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Title*</label>
                      <input
                        type="text"
                        name="Title"
                        className="form-control"
                        placeholder="Dashboard Title"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Title}
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

                  {/* main logo */}
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-3">
                      <label htmlFor="file-input" className="">
                        Select Main Logo Image
                      </label>
                      <input
                        id="file-input"
                        className=" form-control"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        placeholder="Select  Main Logo Image"
                      />
                      <div>
                        <div className="d-flex">
                          {selectedImages.map((url, index) => (
                            <div key={index}>
                              <img
                                className="mt-4 mb-4"
                                src={url}
                                alt={`Selected ${index + 1}`}
                                style={{ maxWidth: "350px" }}
                              />
                              <button onClick={() => removeImage(index)}>
                                <i className="fa-solid fa-trash ps-1"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* title logo */}
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-3">
                      <label htmlFor="file-input2" className="">
                        Select Title Logo Image
                      </label>
                      <input
                        id="file-input2"
                        className=" form-control"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChangeLogotitle}
                        placeholder="Select  Title Logo Image"
                      />
                      <div>
                        <div className="d-flex">
                          {selectedImagesTtileLaogo.map((url, index) => (
                            <div key={index}>
                              <img
                                className="mt-4 mb-4"
                                src={url}
                                alt={`Selected ${index + 1}`}
                                style={{ maxWidth: "350px" }}
                              />
                              <button
                                onClick={() => removeImageTitleLogo(index)}
                              >
                                <i className="fa-solid fa-trash ps-1"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* fav icon */}
                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-3">
                      <label htmlFor="file-input3" className="">
                        Select Fav Icon
                      </label>
                      <input
                        id="file-input3"
                        className=" form-control"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChangeFavIcon}
                        placeholder="Select  Fav Icon"
                      />
                      <div>
                        <div className="d-flex">
                          {selectedImagesFavIcon.map((url, index) => (
                            <div key={index}>
                              <img
                                className="mt-4 mb-4"
                                src={url}
                                alt={`Selected ${index + 1}`}
                                style={{ maxWidth: "350px" }}
                              />
                              <button onClick={() => removeImageFavIcon(index)}>
                                <i className="fa-solid fa-trash ps-1"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
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

export default SettingsUpdateModel;
