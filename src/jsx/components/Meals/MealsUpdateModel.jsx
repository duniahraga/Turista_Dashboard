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

const MealsUpdateModel = forwardRef((props, ref) => {
  //States
  const [addEmploye, setAddEmploye] = useState(false);
  //APi Test
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);

  //varibels
  let Meals = {
    Meal: "",
    Price: "",
  };

  //validations
  const formikObj = useFormik({
    initialValues: Meals,
    onSubmit: updateData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {};

      if (value.Meal.length < 3 || value.Meal.length > 66) {
        errors.Meal = "The Meal  must be not less than 3 leters long  ";
      }
      if (value.Price.length < 3 || value.Price.length > 66) {
        errors.Price = "The Price  must be not less than 1 Number  long  ";
      }

      return errors;
    },
  });

  useEffect(() => {
    formikObj.setValues({
      Meal: props.mealsData.Meal || "hello",
      Price: props.mealsData.Price || "",
    });
  }, [props.mealsData]);

  // handle close the component
  const handelClose = () => setAddEmploye(false);

  // Function to show the modal
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      setAddEmploye(true); // Show the modal
    },
  }));

  //functions
  async function updateData(value) {
    setisloading(true);

    try {
      const response = await axios
        .put(`http://localhost:8082/Meals/${props.mealsId}`, value, {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => swal("add Successfly"));
      formikObj.resetForm();
      handelClose();
      props.refresh();
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
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Meal*</label>
                      <input
                        type="text"
                        multiple
                        name="Meal"
                        className="form-control"
                        placeholder="Meal"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Meal}
                      />
                      {formikObj.errors.Meal && formikObj.touched.Meal ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Meal}
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

export default MealsUpdateModel;
