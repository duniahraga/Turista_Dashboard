
import axios from 'axios';
import { Field, FormikProvider, useFormik } from 'formik';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import { Offcanvas } from "react-bootstrap";
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


const UserModelAdd = forwardRef((props, ref) => {
   const [addEmploye, setAddEmploye] = useState(false);
   //APi Test 
   const [isloading, setisloading] = useState(false)
   const [errMsg, seterrMsg] = useState(null)
   const handelClose = () => setAddEmploye(false)
   const token = localStorage.getItem('token');
   const [selectedImages, setSelectedImages] = useState([]);
   const [ResortSettingAPIdata, setResortSettingAPIdata] = useState([]);
   const [showCheckboxes, setShowCheckboxes] = useState(false);
   const [selectedItems, setSelectedItems] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [selectedItemsLogin, setSelectedItemsLogin] = useState([]);
   const [showCheckboxesLogin, setShowCheckboxesLogin] = useState(false);
   const [inputValueLogin, setInputValueLogin] = useState('');


   
   useImperativeHandle(ref, () => ({
      showEmployeModal() {
         setAddEmploye(true)
      }
   }));



   //varibels
   let Users = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: [
      ],
      phoneNumber: '',
      loginSettings:[]
   }








   //functions 
   async function addData(value) {
      setisloading(true)

      try {
         await axios.post('http://localhost:8082/Uers', value, {
            headers: {
               token: localStorage.getItem('tkn')
            }
         }).then(res => swal(("add Successfly")))
         formikObj.resetForm()
         handelClose()
         setSelectedImages([]);
         setSelectedItems([]); // Clear selected items after submission
        setInputValue(''); // Clear input value
        setShowCheckboxes(false); // Hide checkboxes
        setSelectedItemsLogin([]); // Clear selected items after submission
        setInputValueLogin(''); // Clear input value
        setShowCheckboxesLogin(false); // Hide checkboxes


         props.getAllData()
      } catch (error) {

      }

      setisloading(false)
   }





   //validations 
   const formikObj = useFormik({

      initialValues: Users,
      onSubmit: addData,
      validate: function (value) {
         seterrMsg(null);

         const errors = {}


         if (value.firstName.length < 3 || value.firstName.length > 35) {
            errors.firstName = "The first name  must be at least 3 letters long";

         }


         if (value.lastName.length < 3 || value.lastName.length > 50) {
            errors.lastName = 'The  last name Price must be not less than 3 letters long '
         }


         if (value.email.includes("@") === false || value.email.includes(".") === false) {
            errors.email = ' Email Invalid'
         }

         if (!value.phoneNumber || !String(value.phoneNumber).match(/^(?:\+?218)?\d{9}$/)) {
            errors.phoneNumber = 'Invalid Libyan phone number';
         }


         if (value.password.length < 6 || value.password.length > 12) {
            errors.password = " Password must be from  6 charcter to 12  charcters"

         }

         console.log(errors)
         return errors;
      }


   })


   const Roles = [
      { id: 1, label: 'إمكانية الحجز' },
      { id: 2, label: 'عرض حجوزات هدا الموظف' },
      { id: 3, label: 'عرض كل الحجزات في النظام ' },
      { id: 4, label: 'الدخول لتقارير المالية' },
      { id: 5, label: 'الايام المتاحة والغير متاحة' },
      { id: 6, label: 'تعديل بيانات المنتجع' },
      { id: 7, label: 'تعديل بيانات  الشاليهات' },
      { id:8 , label: 'إضافة الشاليهات' }
   ];

   const LoginSettings = [
      { id: 1, label: 'تحكم في إعدادات الوجبات' },
      { id: 2, label: '   تحكم في إعدادات الخدمات ' },
      { id: 3, label: ' تحكم في سعر الضيف الزائد ' },
      
   ];
   const handleInputChange = () => {
      setShowCheckboxes(!showCheckboxes);
   };
   const handleInputChangeLogin = () => {
      setShowCheckboxesLogin(!showCheckboxesLogin);
   };
   const handleCheckboxChange = (label) => {
      let updatedItems;
  
      if (selectedItems.includes(label)) {
        updatedItems = selectedItems.filter((item) => item !== label);
      } else {
        updatedItems = [...selectedItems, label];
      }
  
      setSelectedItems(updatedItems);
      setInputValue(updatedItems.join(', '));
  
      formikObj.setFieldValue('role', updatedItems);
   };
   
    const handleCheckboxChangeLogin = (label) => {
      let updatedItems;
  
      if (selectedItems.includes(label)) {
        updatedItems = selectedItemsLogin.filter((item) => item !== label);
      } else {
        updatedItems = [...selectedItemsLogin, label];
      }
  
      setSelectedItemsLogin(updatedItems);
      setInputValueLogin(updatedItems.join(', '));
  
      formikObj.setFieldValue('loginSettings', updatedItems);
    };



   return (

      <Offcanvas show={addEmploye} onHide={setAddEmploye} className="offcanvas-end customeoff" placement='end'>

         <>
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
                     <form onSubmit={formikObj.handleSubmit}>
                        <div className="row">
                           <div className="col-lg-6 mb-2">
                              <div className="form-group mb-3">
                                 <label className="text-label">First Name*</label>
                                 <input
                                    type="text"
                                    name="firstName"
                                    onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.firstName}
                                    className="form-control"
                                    placeholder="First Name"

                                    required
                                 />
                                 {formikObj.errors.firstName && formikObj.touched.firstName ? <div className=' alert alert-danger'>{formikObj.errors.firstName}</div> : ""}

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
                                    onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.lastName}
                                    required
                                 />
                                 {formikObj.errors.lastName && formikObj.touched.lastName ? <div className=' alert alert-danger'>{formikObj.errors.lastName}</div> : ""}

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
                                    onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email}
                                    required
                                 />
                                 {formikObj.errors.email && formikObj.touched.email ? <div className=' alert alert-danger'>{formikObj.errors.email}</div> : ""}
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
                                    onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phoneNumber}
                                    required
                                 />
                                 {formikObj.errors.phoneNumber && formikObj.touched.phoneNumber ? <div className=' alert alert-danger'>{formikObj.errors.phoneNumber}</div> : ""}


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
                                    onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password}
                                    required
                                 />
                                 {formikObj.errors.password && formikObj.touched.password ? <div className=' alert alert-danger'>{formikObj.errors.password}</div> : ""}

                              </div>
                           </div>

                           <div className="col-lg-6 mb-2">
                              

                              <div className='form-group mb-3'>
                                 <label className="text-label">Role*</label>
                                 <input
                                    className='form-control'
                                    type="text"
                                    value={inputValue}
                                    onClick={handleInputChange}
                                    placeholder="Select items"
                                 />
                                 {showCheckboxes && (
                                    <div  className='mt-4 d-flex flex-column flex-wrap'>
                                       {Roles.map((item) => (
                                          <label key={item.id}  className=' d-inline ms-3'>
                                             <input
                                                type="checkbox"
                                                name='role'
                                                checked={selectedItems.includes(item.label)}
                                                onChange={() => handleCheckboxChange(item.label)}
                                                onBlur={formikObj.handleBlur}
                                                value={formikObj.values.role}
                                             />
                                             {item.label}
                                          </label>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           </div>

                           
                           <div className="col-lg-6 mb-2">
                              

                              <div className='form-group mb-3'>
                                 <label className="text-label">Login Settings*</label>
                                 <input
                                    className='form-control'
                                    type="text"
                                    value={inputValueLogin}
                                    onClick={handleInputChangeLogin}
                                    placeholder="Select items"
                                 />
                                 {showCheckboxesLogin && (
                                    <div  className='mt-4 d-flex flex-column flex-wrap'>
                                       {LoginSettings.map((item) => (
                                          <label key={item.id}  className=' d-inline ms-3'>
                                             <input
                                                type="checkbox"
                                                name='loginSettings'
                                                checked={selectedItemsLogin.includes(item.label)}
                                                onChange={() => handleCheckboxChangeLogin(item.label)}
                                                onBlur={formikObj.handleBlur}
                                                value={formikObj.values.loginSettings}
                                             />
                                             {item.label}
                                          </label>
                                       ))}
                                    </div>
                                 )}
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
      </Offcanvas>
   );
});

export default UserModelAdd;
