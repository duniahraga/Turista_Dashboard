import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { CarouselItem, Offcanvas } from "react-bootstrap";
import axios from 'axios';
import { Field, FormikProvider, useFormik } from 'formik';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
// import { DateRange, DateRangePicker } from "react-date-range";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import Multiselect from 'multiselect-react-dropdown';
// import OtherServices from '../OtherServices/OtherServices';
const parseDate = (dateString) => {
    try {
        const timestamp = Date.parse(dateString);
        if (!isNaN(timestamp)) {
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            } else {
                console.error('Invalid date:', dateString);
                return 'Invalid Date';
            }
        } else {
            console.error('Invalid timestamp:', dateString);
            return 'Invalid Date';
        }
    } catch (error) {
        console.error('Error parsing date:', error);
        return 'Error';
    }
};

const BookingAddModal = forwardRef((props, ref) => {

    //States 
    const [addEmploye, setAddEmploye] = useState(false);
    //APi Test 
    const [isloading, setisloading] = useState(false)
    const [errMsg, seterrMsg] = useState(null)
    const handelClose = () => setAddEmploye(false)
    const [ChaletsAPIdata, setChaletsAPIdata] = useState([])
    const [OtherServicesAPIdata, setOtherServicesAPIdata] = useState([])
    const [Meals, setMeals] = useState([]);
    const [APIDATA, setAPIDATA] = useState([]);
    // const [bookedDates, setBookedDates] = useState([]);
    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');

    // const bookedDates = ['2024-09-28', '2024-09-29', '2024-09-30'];
    const [bookedDates, setBookedDates] = useState([]);
    const [BookedDateExitDate, setBookedDateExitDate] = useState([])

    const apiDates = props.ApiDAte;


    useImperativeHandle(ref, () => ({
        showEmployeModal() {
            setAddEmploye(true)
        }
    }));


    //varibels
    let [Booking, setBooking] = useState({
        firstName: '',
        LastName: '',
        phoneNumber: '',
        whatsappNumber: '',
        Residentialِddress: '',
        Typeofaccommodation: '',
        Guesttype: '',
        ChaletName: '',
        Numberofguests: '',
        Numberofadults: '',
        Numberofchildren: '',
        ExcessNumber: '',
        Extrapriceperpersonperday: '',
        EntryDate: '',
        ExitDate: '',
        Meals: [],
        Otherservices: [],
        mealspriceperday: '',
        Otherservicesperday: '',
        numberofday: '',
        paymentMethod: '',
        Paytherestoftheamount: '',
        Paymentofuarantee: '',
        uarantee: '',
        sameAsPhoneNumber: false,
    })


    
    
    //functions 
    async function addData(value) {
        setisloading(true);

        try {
            const response = await axios.post('http://localhost:8082/Booking', value, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });

           
            swal("تمت الإضافة بنجاح");

            formikObj.resetForm();

            handelClose();

            props.getAllData();

           

           
            formikObj.setFieldValue('EntryDate', null);
            formikObj.setFieldValue('ExitDate', null);
            setEntryDate(formikObj.EntryDate || '');
            setExitDate(formikObj.ExitDate || '');

        } catch (error) {
            console.error('حدث خطأ:', error);
        }

        setisloading(false);
    }
    //validations 
    const formikObj = useFormik({

        initialValues: Booking,
        onSubmit: addData,
        validate: function (value) {
            seterrMsg(null);

            const errors = {}




            if (value.firstName.length < 3 || value.firstName.length > 35) {
                errors.firstName = "The first Name  must be at least 3 letters long";

            }

            if (value.LastName.length < 3 || value.LastName.length > 35) {
                errors.LastName = "The last Name  must be at least 3 letters long";

            }

            if (!value.phoneNumber.match(/^(218)?09[12346][0-9]{7}$/)) {
                errors.phoneNumber = ' Invalid phone number'
            }
            if (!value.whatsappNumber.match(/^(218)?09[12346][0-9]{7}$/)) {
                errors.whatsappNumber = ' Invalid whatsapp number'
            }



            if (value.Numberofguests.length <= 7) {
                errors.Numberofguests = ' The Number of guests should not exceed 7 people. '
            }
            if ((value.Numberofadults + value.Numberofchildren) <= 7) {
                errors.Numberofadults = errors.Numberofchildren = 'The Number of adults and  Number of children should not exceed 7 people  '
            }




            console.log(errors)
            return errors;
        }


    })

   
    



    const handleCheckboxChange = (e) => {
        formikObj.setFieldValue('sameAsPhoneNumber', e.target.checked);

        if (e.target.checked) {
            formikObj.setFieldValue('whatsappNumber', formikObj.values.phoneNumber);
        } else {
            formikObj.setFieldValue('whatsappNumber', '');
        }
    };



    //============================Display all Chalets=====================================

    const getChaletsData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/Chalets');
            setChaletsAPIdata(response.data); // Store the fetched data in the state
        } catch (error) {
            console.error(error);
        }
    };
    //============================Display all OtherServices=====================================

    const getOtherServicesData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/OtherServices');
            setOtherServicesAPIdata(response.data); // Store the fetched data in the state
        } catch (error) {
            console.error(error);
        }
    };


    //============================Display all Meals=====================================

    const getMeals = async () => {
        try {
            const response = await axios.get('http://localhost:8082/Meals');
            setMeals(response.data); // Store the fetched data in the state
        } catch (error) {
            console.error(error);
        }
    };





    useEffect(() => {
        getChaletsData();
        getOtherServicesData();
        getMeals();
        getDates();
        
        const storedEntryDate = localStorage.getItem('EntryDate');
        const storedExitDate = localStorage.getItem('ExitDate');
        

        if (storedEntryDate) {
            formikObj.setFieldValue('EntryDate', new Date(storedEntryDate));
        }

        if (storedExitDate) {
            formikObj.setFieldValue('ExitDate', new Date(storedExitDate));
        }


        if (props.ApiDAte) {
            const apiDates = props.ApiDAte;
            const formattedDates = apiDates.map(dateObj => {
                if (dateObj && dateObj.EntryDate) {
                    return parseDate(dateObj.EntryDate);
                }
                return 'Invalid Date';
            });

            if (JSON.stringify(formattedDates) !== JSON.stringify(bookedDates)) {
                setBookedDates(formattedDates);
            }
        }
        if (props.ApiDAte) {
            const apiDates = props.ApiDAte;
            const formattedDates = apiDates.map(dateObj => {
                if (dateObj && dateObj.EntryDate) {
                    return parseDate(dateObj.EntryDate);
                }
                return 'Invalid Date';
            });

            if (JSON.stringify(formattedDates) !== JSON.stringify(bookedDates)) {
                setBookedDates(formattedDates);
            }
        }
    }, [props.ApiDAte, bookedDates]);
    console.log(bookedDates)
    const handleEntryDateChange = date => {
        formikObj.setFieldValue('EntryDate', date);
        localStorage.setItem('EntryDate', date);
    };

    const handleExitDateChange = date => {
        formikObj.setFieldValue('ExitDate', date);
        localStorage.setItem('ExitDate', date);
    };

    const [guestType, setGuestType] = useState('');
    const [Typeofaccommodation, setTypeofaccommodation] = useState('');
    const [paymentMethod, setpaymentMethod] = useState('');



    const handleChaletChange = (e) => {
        const selectedItemId = e.target.value;
        console.log(selectedItemId)
        //Find the selected Chalet object
        const selectedChalet = ChaletsAPIdata.find((item) => item.id === selectedItemId);
        const selectedChaletType = ChaletsAPIdata.find((item) => item.id === selectedItemId);
        const selectedChalePayment = ChaletsAPIdata.find((item) => item.id === selectedItemId);


        // Update the GuestType based on the selected Chalet
        if (selectedChalet) {
            setGuestType(selectedChalet.Guesttype);
        } else {
            setGuestType('');
        }
        //typeAccoiment
        if (selectedChaletType) {
            setTypeofaccommodation(selectedChalet.TypeofAccommodation);
        } else {
            setTypeofaccommodation('');
        }

        //payment type
        if (selectedChalePayment) {
            setpaymentMethod(selectedChalet.paymentmethod);
        } else {
            setpaymentMethod('');
        }
    };







    //============================Display all  Dates =====================================

    const getDates = async () => {
        fetch('http://localhost:8082/Booking')
            .then(response => response.json())
            .then(data => {
                // setReservationDates(data);
            })
            .catch(error => {
                console.error('Error fetching reservation dates:', error);
            });
    };
    const [totalPrice, setTotalPrice] = useState(0);
    const onSelectOtherService = (selectedList, selectedItem) => {
        const updatedSelections = selectedList.map((item) => ({
            id: item.id,
            Services: item.Services,
            Price: item.Price,
        }));


        formikObj.setFieldValue('Otherservices', updatedSelections);
        const calculateTotalPrice = () => {
            const totalPrice = updatedSelections.reduce((total, item) => total + item.Price, 0);
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
        formikObj.setFieldValue('Otherservices', updatedSelections);
        const totalPrice = updatedSelections.reduce((total, item) => total + item.Price, 0);
        setTotalPrice(totalPrice); // Assuming you have totalPrice state and setTotalPrice functi
        // Additional logic if needed
    };
    const [totalPriceMeals, setTotalPriceMeals] = useState(0);
    const onSelectMeals = (selectedList, selectedItem) => {
        const updatedSelections = selectedList.map((item) => ({
            id: item.id,
            Meal: item.Meal,
            Price: item.Price,
        }));


        formikObj.setFieldValue('Meals', updatedSelections);
        const calculateTotalPrice = () => {
            const totalPrice = updatedSelections.reduce((total, item) => total + item.Price, 0);
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
        formikObj.setFieldValue('Meals', updatedSelections);

        // Recalculate and update the total price after removing the item
        const totalPrice = updatedSelections.reduce((total, item) => total + item.Price, 0);
        setTotalPriceMeals(totalPrice); // Assuming you have totalPrice state and setTotalPrice functi
        // Additional logic if needed
    };


    return (

        <Offcanvas show={addEmploye} onHide={setAddEmploye} className="offcanvas-end customeoff" placement='end'>

            <>
                {errMsg ? <div className=' alert alert-danger w-75 text-center fs-4'> {errMsg}</div> : ''}

                <div className="container-fluid">
                    <div className="row">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel1">{props.Title}</h1>
                            <button type="button" className="btn-close" onClick={() => setAddEmploye(false)}
                            >

                                <i className="fa-solid fa-xmark"></i>

                            </button>
                        </div>




                    </div>
                </div>

                <div className="offcanvas-body">
                    <div className="container-fluid">
                        <FormikProvider value={formikObj}>
                            <form onSubmit={formikObj.handleSubmit} >
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Fisrt Name*</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                placeholder="first Name"
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.firstName}

                                            />
                                            {formikObj.errors.firstName && formikObj.touched.firstName ? <div className=' alert alert-danger'>{formikObj.errors.firstName}</div> : ""}

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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.LastName}

                                            />
                                            {formikObj.errors.LastName && formikObj.touched.LastName ? <div className=' alert alert-danger'>{formikObj.errors.LastName}</div> : ""}

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
                                            {formikObj.errors.phoneNumber && formikObj.touched.phoneNumber ? <div className="alert alert-danger">{formikObj.errors.phoneNumber}</div> : ''}
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
                                            {formikObj.errors.whatsappNumber && formikObj.touched.whatsappNumber ? <div className="alert alert-danger">{formikObj.errors.whatsappNumber}</div> : ''}
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
                                            <label className="text-label">Residentialِ Address*</label>
                                            <input
                                                type="text"
                                                name="Residentialِddress"
                                                className="form-control"
                                                placeholder="Residentialِ Address"
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Residentialِddress}

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
                                                name="Guesttype"
                                                value={guestType}
                                                readOnly
                                                className="form-control"
                                            />


                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Type of Accommodation*</label>
                                            <Field
                                                type="text"
                                                name="Typeofaccommodation"
                                                value={Typeofaccommodation}
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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Numberofguests}

                                            />
                                            {formikObj.errors.Numberofguests && formikObj.touched.Numberofguests ? <div className=' alert alert-danger'>{formikObj.errors.Numberofguests}</div> : ""}

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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Numberofadults}

                                            />
                                            {formikObj.errors.Numberofadults && formikObj.touched.Numberofadults ? <div className=' alert alert-danger'>{formikObj.errors.Numberofadults}</div> : ""}

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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Numberofchildren}

                                            />
                                            {formikObj.errors.Numberofchildren && formikObj.touched.Numberofchildren ? <div className=' alert alert-danger'>{formikObj.errors.Numberofchildren}</div> : ""}

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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.ExcessNumber}

                                            />
                                            {formikObj.errors.ExcessNumber && formikObj.touched.ExcessNumber ? <div className=' alert alert-danger'>{formikObj.errors.ExcessNumber}</div> : ""}

                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Extra price per person per day*</label>
                                            <input
                                                type="number"
                                                name="Extrapriceperpersonperday"
                                                className="form-control"
                                                placeholder="Extra price per person per day"
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Extrapriceperpersonperday}

                                            />
                                            {formikObj.errors.Extrapriceperpersonperday && formikObj.touched.Extrapriceperpersonperday ? <div className=' alert alert-danger'>{formikObj.errors.Extrapriceperpersonperday}</div> : ""}

                                        </div>
                                    </div>

                                    <div>
                                        <div className="col-lg-6 mb-2">
                                            <label>تاريخ الوصول:</label>
                                            <DatePicker
                                                selected={formikObj.values.EntryDate}
                                                onChange={handleEntryDateChange}
                                                selectsStart
                                                highlightDates={bookedDates.map(date => new Date(date))}
                                                inline
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-2">
                                            <label>تاريخ المغادرة:</label>
                                            <DatePicker
                                                selected={formikObj.values.ExitDate}
                                                onChange={handleExitDateChange}
                                                selectsEnd
                                                highlightDates={bookedDates.map(date => new Date(date))}
                                                inline
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Meals*</label>
                                            <Multiselect
                                                options={Meals}
                                                selectedValues={formikObj.values.Meals}
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
                                                    selectedValues={formikObj.values.Otherservices}
                                                    onSelect={onSelectOtherService}
                                                    onRemove={onRemoveOtherService}
                                                    displayValue="Services"
                                                />
                                            </div>





                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label"> Meals Price Per Day,
                                                *</label>
                                            <Field
                                                type="text"
                                                name="mealspriceperday"
                                                value={totalPriceMeals}
                                                readOnly
                                                className="form-control"
                                            />


                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Price Per day Other Services*</label>
                                            <Field
                                                type="text"
                                                name="Otherservicesperday"
                                                value={totalPrice}
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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.numberofday}
                                            />
                                            {formikObj.errors.numberofday && formikObj.touched.numberofday ? <div className=' alert alert-danger'>{formikObj.errors.numberofday}</div> : ""}


                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Payment Method*</label>
                                            <Field
                                                type="text"
                                                name="paymentMethod"
                                                value={paymentMethod}
                                                readOnly
                                                className="form-control"
                                            />

                                        </div>
                                    </div>





                                    <div className="col-lg-6 mb-2">
                                        <div className="form-group mb-3">
                                            <label className="text-label">Pay The Rest of The Amount*</label>
                                            <Field required name="Paytherestoftheamount" className="default-select form-control" as="select">
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
                                            <Field required name="Paymentofuarantee" className="default-select form-control" as="select">
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
                                                onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.uarantee}

                                            />
                                            {formikObj.errors.uarantee && formikObj.touched.uarantee ? <div className=' alert alert-danger'>{formikObj.errors.uarantee}</div> : ""}

                                        </div>
                                    </div>
                                </div>



                                <div className=' mt-4'>
                                    <button type="submit" disabled={!formikObj.isValid || !formikObj.dirty} className="btn btn-primary me-1">

                                        {isloading ? <ThreeDots
                                            color="#fff"
                                            width="50"
                                            visible={true}
                                            ariaLabel='falling-lines-loading'
                                        /> : "Submit"}

                                    </button>
                                    <Link to={"#"} onClick={() => setAddEmploye(false)} className="btn btn-danger light ms-1">Cancel</Link>
                                </div>



                            </form>
                        </FormikProvider>

                        

                    </div>
                </div>



            </>
        </Offcanvas >
    );
});
export default BookingAddModal;
