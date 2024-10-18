// import dependencies
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
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import Multiselect from "multiselect-react-dropdown";

const parseDate = (dateString) => {
  try {
    const timestamp = Date.parse(dateString);
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      } else {
        console.error("Invalid date:", dateString);
        return "Invalid Date";
      }
    } else {
      console.error("Invalid timestamp:", dateString);
      return "Invalid Date";
    }
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Error";
  }
};

const BookingUpdateModel = forwardRef((props, ref) => {
  //States
  const [addEmploye, setAddEmploye] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState(null);
  const [ChaletsAPIdata, setChaletsAPIdata] = useState([]);
  const [OtherServicesAPIdata, setOtherServicesAPIdata] = useState([]);
  const [Meals, setMeals] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);
  const [guestType, setGuestType] = useState("");
  const [Typeofaccommodation, setTypeofaccommodation] = useState("");
  const [paymentMethod, setpaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceMeals, setTotalPriceMeals] = useState(0);

  // select date function
  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  // show modal function
  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddEmploye(true);
    },
  }));

  let Booking = {
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    whatsappNumber: "",
    residentialAddress: "",
    typeOfAccommodation: "",
    guestType: "",
    chaletName: "",
    numberOfGuests: "",
    numberOfAdults: "",
    numberOfChildren: "",
    excessNumber: "",
    extraPricePerPersonPerDay: "",
    entryDate: "",
    exitDate: "",
    meals: [],
    otherServices: [],
    mealsPricePerDay: "",
    otherServicesPerDay: "",
    numberOfDays: "",
    paymentMethod: "",
    payTheRestOfTheAmount: "", // Corrected to 'payTheRestOfTheAmount'
    paymentOfGuarantee: "", // Corrected to 'paymentOfGuarantee'
    guarantee: "", // Corrected to 'guarantee'
    sameAsPhoneNumber: false, // Corrected to 'sameAsPhoneNumber'
  };

  //validations
  const formikObj = useFormik({
    initialValues: Booking,
    onSubmit: addData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {};

      if (
        !value.firstName ||
        value.firstName.length < 3 ||
        value.firstName.length > 35
      ) {
        errors.firstName = "The first Name  must be at least 3 letters long";
      }

      if (
        !value.LastName ||
        value.LastName.length < 3 ||
        value.LastName.length > 35
      ) {
        errors.LastName = "The last Name  must be at least 3 letters long";
      }

      if (!value.phoneNumber.match(/^(218)?09[12346][0-9]{7}$/)) {
        errors.phoneNumber = " Invalid phone number";
      }
      if (!value.whatsappNumber.match(/^(218)?09[12346][0-9]{7}$/)) {
        errors.whatsappNumber = " Invalid whatsapp number";
      }

      if (!value.Numberofguests || value.Numberofguests.length <= 7) {
        errors.Numberofguests =
          " The Number of guests should not exceed 7 people. ";
      }
      if (value.Numberofadults + value.Numberofchildren <= 7) {
        errors.Numberofadults = errors.Numberofchildren =
          "The Number of adults and  Number of children should not exceed 7 people  ";
      }

      return errors;
    },
  });

  useEffect(() => {
    // Update form values when bookingData changes
    formikObj.setValues({
      id: props.bookingData.id || "",
      firstName: props.bookingData.firstName || "",
      lastName: props.bookingData.LastName || "", // Corrected to 'lastName' for consistency
      phoneNumber: props.bookingData.phoneNumber || "",
      whatsappNumber: props.bookingData.whatsappNumber || "",
      residentialAddress: props.bookingData.Residentialِddress || "", // Corrected to 'residentialAddress'
      typeOfAccommodation: props.bookingData.Typeofaccommodation || "", // Corrected to 'typeOfAccommodation'
      guestType: props.bookingData.Guesttype || "", // Corrected to 'guestType'
      chaletName: props.bookingData.ChaletName || "", // Corrected to 'chaletName'
      numberOfGuests: props.bookingData.Numberofguests || "", // Corrected to 'numberOfGuests'
      numberOfAdults: props.bookingData.Numberofadults || "", // Corrected to 'numberOfAdults'
      numberOfChildren: props.bookingData.Numberofchildren || "", // Corrected to 'numberOfChildren'
      excessNumber: props.bookingData.ExcessNumber || "", // Corrected to 'excessNumber'
      extraPricePerPersonPerDay:
        props.bookingData.Extrapriceperpersonperday || "", // Corrected to 'extraPricePerPersonPerDay'
      entryDate: props.bookingData.EntryDate || "",
      exitDate: props.bookingData.ExitDate || "",
      meals: props.bookingData.Meals || [],
      otherServices: props.bookingData.Otherservices || [],
      mealsPricePerDay: props.bookingData.mealspriceperday || "",
      otherServicesPerDay: props.bookingData.Otherservicesperday || "",
      numberOfDays: props.bookingData.numberofday || "",
      paymentMethod: props.bookingData.paymentMethod || "",
      payTheRestOfTheAmount: props.bookingData.Paytherestoftheamount || "", // Corrected to 'payTheRestOfTheAmount'
      paymentOfGuarantee: props.bookingData.Paymentofuarantee || "", // Corrected to 'paymentOfGuarantee'
      guarantee: props.bookingData.uarantee || "", // Corrected to 'guarantee'
      sameAsPhoneNumber: props.bookingData.sameAsPhoneNumber || false, // Corrected to 'sameAsPhoneNumber'
    });
    if (props.bookingData) {
      setDateRange({
        startDate: props.bookingData.EntryDate
          ? new Date(props.bookingData.EntryDate)
          : new Date(),
        endDate: props.bookingData.ExitDate
          ? new Date(props.bookingData.ExitDate)
          : new Date(),
        key: "selection",
      });
    }
  }, [props.bookingData]);

  // formate date to exept in json file
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to show the modal
  useImperativeHandle(ref, () => ({
    showUpdateModal() {
      setAddEmploye(true); // Show the modal
    },
  }));

  // close the component on hide
  const handleClose = () => setAddEmploye(false);

  // handle checkbox
  const handleCheckboxChange = (e) => {
    formikObj.setFieldValue("sameAsPhoneNumber", e.target.checked);

    if (e.target.checked) {
      formikObj.setFieldValue("whatsappNumber", formikObj.values.phoneNumber);
    } else {
      formikObj.setFieldValue("whatsappNumber", "");
    }
  };

  // fetch data on enter
  useEffect(() => {
    getChaletsData();
    getOtherServicesData();
    getMeals();
    getDates();

    if (props.ApiDate) {
      const apiDates = props.ApiDate;
      const formattedDates = apiDates.map((dateObj) => {
        if (dateObj && dateObj.EntryDate) {
          return parseDate(dateObj.EntryDate);
        }
        return "Invalid Date";
      });

      if (JSON.stringify(formattedDates) !== JSON.stringify(bookedDates)) {
        setBookedDates(formattedDates);
      }
    }
  }, [props.ApiDate, bookedDates]);

  const handleChaletChange = (e) => {
    const selectedItemId = e.target.value;
    //Find the selected Chalet object
    const selectedChalet = ChaletsAPIdata.find(
      (item) => item.id === selectedItemId
    );
    const selectedChaletType = ChaletsAPIdata.find(
      (item) => item.id === selectedItemId
    );
    const selectedChalePayment = ChaletsAPIdata.find(
      (item) => item.id === selectedItemId
    );

    // Update the GuestType based on the selected Chalet
    if (selectedChalet) {
      setGuestType(selectedChalet.Guesttype);
    } else {
      setGuestType("");
    }
    //typeAccoiment
    if (selectedChaletType) {
      setTypeofaccommodation(selectedChalet.TypeofAccommodation);
    } else {
      setTypeofaccommodation("");
    }

    //payment type
    if (selectedChalePayment) {
      setpaymentMethod(selectedChalet.paymentmethod);
    } else {
      setpaymentMethod("");
    }
  };

  // selecte and remove other services handler
  const onSelectOtherService = (selectedList, selectedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      Services: item.Services,
      Price: item.Price,
    }));

    formikObj.setFieldValue("Otherservices", updatedSelections);
    const calculateTotalPrice = () => {
      const totalPrice = updatedSelections.reduce(
        (total, item) => total + item.Price,
        0
      );
      setTotalPrice(totalPrice);
    };

    // Call calculateTotalPrice function
    calculateTotalPrice();
  };
  const onRemoveOtherService = (selectedList, removedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      Services: item.Services,
      Price: item.Price,
    }));
    formikObj.setFieldValue("Otherservices", updatedSelections);
    const totalPrice = updatedSelections.reduce(
      (total, item) => total + item.Price,
      0
    );
    setTotalPrice(totalPrice); // Assuming you have totalPrice state and setTotalPrice functi
    // Additional logic if needed
  };

  // on select and remove meals handler
  const onSelectMeals = (selectedList, selectedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      Meal: item.Meal,
      Price: item.Price,
    }));

    formikObj.setFieldValue("Meals", updatedSelections);
    const calculateTotalPrice = () => {
      const totalPrice = updatedSelections.reduce(
        (total, item) => total + item.Price,
        0
      );
      setTotalPriceMeals(totalPrice);
    };

    // Call calculateTotalPrice function
    calculateTotalPrice();
  };
  const onRemoveMeals = (selectedList, removedItem) => {
    const updatedSelections = selectedList.map((item) => ({
      id: item.id,
      Meal: item.Meal,
      Price: item.Price,
    }));
    formikObj.setFieldValue("Meals", updatedSelections);

    // Recalculate and update the total price after removing the item
    const totalPrice = updatedSelections.reduce(
      (total, item) => total + item.Price,
      0
    );
    setTotalPriceMeals(totalPrice); // Assuming you have totalPrice state and setTotalPrice functi
    // Additional logic if needed
  };

  // Function to check if a date is the start or end date of the current booking
  const isCurrentBookingDate = (date) => {
    if (!props.bookingData) return false;
    const currentStartDate = new Date(props.bookingData.EntryDate);
    const currentEndDate = new Date(props.bookingData.ExitDate);

    // Compare the date directly without converting to string
    return date >= currentStartDate && date <= currentEndDate;
  };

  // functions

  // fetch chalets data
  async function getChaletsData(params) {
    try {
      const response = await axios.get("http://localhost:8082/Chalets");
      setChaletsAPIdata(response.data); // Store the fetched data in the state
    } catch (error) {
      console.error(error);
    }
  }

  // fetch meals
  async function getMeals() {
    try {
      const response = await axios.get("http://localhost:8082/Meals");
      setMeals(response.data); // Store the fetched data in the state
    } catch (error) {
      console.error(error);
    }
  }

  // fetch other services
  async function getOtherServicesData() {
    try {
      const response = await axios.get("http://localhost:8082/OtherServices");
      setOtherServicesAPIdata(response.data); // Store the fetched data in the state
    } catch (error) {
      console.error(error);
    }
  }

  // fetch bookings dates
  async function getDates() {
    fetch("http://localhost:8082/Booking")
      .then((response) => response.json())
      .then((data) => {
        setReservationDates(data);
      })
      .catch((error) => {
        console.error("Error fetching reservation dates:", error);
      });
  }

  // post data
  async function addData(value) {
    setisloading(true);
    try {
      const formattedEntryDate = formatDate(dateRange.startDate);
      const formattedExitDate = formatDate(dateRange.endDate);

      const response = await axios
        .put(
          `http://localhost:8082/Booking/${props.bookingId}`,
          {
            ...value,
            EntryDate: formattedEntryDate,
            ExitDate: formattedExitDate,
          },
          {
            headers: {
              token: localStorage.getItem("tkn"),
            },
          }
        )
        .then((res) => swal("تم التعديل بنجاح"));
      formikObj.resetForm();
      formikObj.setFieldValue("EntryDate", null);
      formikObj.setFieldValue("ExitDate", null);

      handleClose();
      props.getAllData();
    } catch (error) {
      console.error("حدث خطأ:", error);
    }

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
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Fisrt Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="first Name"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.firstName}
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
                        name="LastName"
                        className="form-control"
                        placeholder="Last Name"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.LastName}
                      />
                      {formikObj.errors.LastName &&
                      formikObj.touched.LastName ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.LastName}
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
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Phone Number"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.phoneNumber}
                      />
                      {formikObj.errors.phoneNumber &&
                      formikObj.touched.phoneNumber ? (
                        <div className="alert alert-danger">
                          {formikObj.errors.phoneNumber}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">WhatsApp Number*</label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        className="form-control"
                        placeholder="WhatsApp Number"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.whatsappNumber}
                      />
                      {formikObj.errors.whatsappNumber &&
                      formikObj.touched.whatsappNumber ? (
                        <div className="alert alert-danger">
                          {formikObj.errors.whatsappNumber}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <div className="form-group mb-3">
                      <label>
                        <input
                          type="checkbox"
                          name="sameAsPhoneNumber"
                          checked={formikObj.values.sameAsPhoneNumber}
                          onChange={handleCheckboxChange}
                        />
                        Same as Phone Number
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        Residentialِ Address*
                      </label>
                      <input
                        type="text"
                        name="Residentialِddress"
                        className="form-control"
                        placeholder="Residentialِ Address"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.residentialAddress}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Chalet Name*</label>
                      <Field
                        as="select"
                        name="ChaletName"
                        className="form-control"
                        onChange={(e) => {
                          formikObj.handleChange(e);
                          handleChaletChange(e);
                        }}
                        value={formikObj.values.chaletName}
                      >
                        <option value="">Select</option>
                        {ChaletsAPIdata.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.Title}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Guest type*</label>
                      <Field
                        type="text"
                        name="guestType"
                        value={formikObj.values.guestType}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        Type of Accommodation*
                      </label>
                      <Field
                        type="text"
                        name="Typeofaccommodation"
                        value={formikObj.values.typeOfAccommodation}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number of guests*</label>
                      <input
                        type="number"
                        name="Numberofguests"
                        className="form-control"
                        placeholder="Number of guests"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.numberOfGuests}
                      />
                      {formikObj.errors.Numberofguests &&
                      formikObj.touched.Numberofguests ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Numberofguests}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number of adults*</label>
                      <input
                        type="number"
                        name="Numberofadults"
                        className="form-control"
                        placeholder="Number of adults"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.Numberofadults}
                      />
                      {formikObj.errors.Numberofadults &&
                      formikObj.touched.Numberofadults ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.Numberofadults}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number of children*</label>
                      <input
                        type="number"
                        name="Numberofchildren"
                        className="form-control"
                        placeholder="Number of children"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.numberOfChildren}
                      />
                      {formikObj.errors.Numberofchildren &&
                      formikObj.touched.Numberofchildren ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.numberOfChildren}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Excess Number*</label>
                      <input
                        type="number"
                        name="ExcessNumber"
                        className="form-control"
                        placeholder="Excess Number"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.excessNumber}
                      />
                      {formikObj.errors.ExcessNumber &&
                      formikObj.touched.ExcessNumber ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.excessNumber}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        Extra price per person per day*
                      </label>
                      <input
                        type="number"
                        name="Extrapriceperpersonperday"
                        className="form-control"
                        placeholder="Extra price per person per day"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.extrapriceperpersonperday}
                      />
                      {formikObj.errors.Extrapriceperpersonperday &&
                      formikObj.touched.Extrapriceperpersonperday ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.extrapriceperpersonperday}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* new component */}
                  <div className="col-12 mb-2">
                    <div className="calendar">
                      <DateRange
                        ranges={[dateRange]}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        rangeColors={["#26B396", "#F8B940"]}
                        minDate={new Date()}
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        disabledDates={reservationDates.flatMap(
                          (reservation) => {
                            const dates = [];
                            if (reservation.EntryDate && reservation.ExitDate) {
                              const currentDate = new Date(
                                reservation.EntryDate
                              );
                              const endDate = new Date(reservation.ExitDate);
                              while (currentDate <= endDate) {
                                // Only disable dates that are not part of the current booking
                                if (!isCurrentBookingDate(currentDate)) {
                                  dates.push(new Date(currentDate));
                                }
                                currentDate.setDate(currentDate.getDate() + 1);
                              }
                            }
                            return dates;
                          }
                        )}
                        renderDayContents={(day) => {
                          return (
                            <div
                              style={{
                                borderRadius: "30%",
                                padding: "5px",
                              }}
                            >
                              {day.getDate()}
                            </div>
                          );
                        }}
                      />
                    </div>
                    <div className="selected-range">
                      {`تاريخ الوصول: ${dateRange.startDate.toLocaleDateString()} - تاريخ المغادرة ${dateRange.endDate.toLocaleDateString()}`}
                    </div>
                  </div>
                  {/* end of new component */}
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Meals*</label>
                      <Multiselect
                        options={Meals}
                        selectedValues={formikObj.values.meals}
                        onSelect={onSelectMeals}
                        onRemove={onRemoveMeals}
                        displayValue="Meal"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Other Services</label>
                      <div>
                        <Multiselect
                          options={OtherServicesAPIdata}
                          selectedValues={formikObj.values.otherServices}
                          onSelect={onSelectOtherService}
                          onRemove={onRemoveOtherService}
                          displayValue="Services"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        {" "}
                        Meals Price Per Day, *
                      </label>
                      <Field
                        type="text"
                        name="mealspriceperday"
                        value={formikObj.values.mealsPricePerDay}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        Price Per day Other Services*
                      </label>
                      <Field
                        type="text"
                        name="Otherservicesperday"
                        value={formikObj.values.otherServicesPerDay}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Number of Day*</label>
                      <input
                        type="number"
                        name="numberofday"
                        required
                        className="form-control"
                        placeholder="Number of day"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.numberOfDays}
                      />
                      {formikObj.errors.numberofday &&
                      formikObj.touched.numberofday ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.numberOfDays}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Payment Method*</label>
                      <Field
                        type="text"
                        name="paymentMethod"
                        value={formikObj.values.paymentMethod}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">
                        Pay The Rest of The Amount*
                      </label>
                      <Field
                        required
                        name="Paytherestoftheamount"
                        className="default-select form-control"
                        as="select"
                      >
                        <option data-display="Select">Please select</option>
                        <option value="Breakfats">In the village</option>
                        <option value="Dineer">In the office</option>
                        <option value="lunch">lunch</option>
                      </Field>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Payment of Uarantee*</label>
                      <Field
                        required
                        name="Paymentofuarantee"
                        className="default-select form-control"
                        as="select"
                        value={formikObj.values.paymentOfGuarantee}
                      >
                        <option data-display="Select">Please select</option>
                        <option value="Breakfats">Break fast</option>
                        <option value="Dineer">Dineer</option>
                        <option value="lunch">lunch</option>
                      </Field>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <div className="form-group mb-3">
                      <label className="text-label">Uarantee*</label>
                      <input
                        type="number"
                        name="uarantee"
                        className="form-control"
                        placeholder="uarantee"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.guarantee}
                      />
                      {formikObj.errors.uarantee &&
                      formikObj.touched.uarantee ? (
                        <div className=" alert alert-danger">
                          {formikObj.errors.guarantee}
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
export default BookingUpdateModel;
