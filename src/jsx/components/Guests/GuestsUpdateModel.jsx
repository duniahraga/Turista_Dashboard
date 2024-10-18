import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import swal from "sweetalert";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const GuestsAddModel = forwardRef((props, ref) => {
  //States
  const [addEmploye, setAddEmploye] = useState(false);
  //APi Test
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);

  //varibels
  let Guests = {
    Guests: "",
    Price: "",
  };

  //validations
  const formikObj = useFormik({
    initialValues: Guests,
    onSubmit: addData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {};

      if (value.Guests.length < 3 || value.Guests.length > 66) {
        errors.Guests = "The Guests  must be not less than 3 leters long  ";
      }
      if (value.Price.length < 3 || value.Price.length > 66) {
        errors.Price = "The Price  must be not less than 1 Number  long  ";
      }

      return errors;
    },
  });

  // set values
  useEffect(() => {
    formikObj.setValues({
      id: props.guestsData.id || "",
      Guests: props.guestsData.Guests || "",
      Price: props.guestsData.Price || "",
    });
  }, [props.guestsData]);

  // handle close the component
  const handelClose = () => {
    setAddEmploye(false);
    props.refresh();
  };

  // Function to show the modal
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      setAddEmploye(true); // Show the modal
    },
  }));

  //functions
  async function addData(value) {
    setisloading(true);

    try {
      const response = await axios
        .put(`http://localhost:8082/Guests/${props.guestsId}`, value, {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => {
          swal("Updated Successfully");
          formikObj.resetForm();
          handelClose();
        });
    } catch (error) {}

    setisloading(false);
  }

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
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Guests*</label>
                      <input
                        type="text"
                        multiple
                        name="Guests"
                        className="form-control"
                        placeholder="Guests"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Guests}
                      />
                      {formikObj.errors.Guests && formikObj.touched.Guests ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Guests}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Price*</label>
                      <input
                        type="number"
                        name="Price"
                        className="form-control"
                        placeholder="Price"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Price}
                      />

                      {formikObj.errors.Price && formikObj.touched.Price ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Price}
                        </div>
                      ) : (
                        ""
                      )}
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

export default GuestsAddModel;
