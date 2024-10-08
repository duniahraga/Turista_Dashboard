import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Offcanvas } from "react-bootstrap";
import axios from 'axios';
import { Field, FormikProvider, useFormik } from 'formik';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';





const MelasMoadel = forwardRef((props, ref) => {

	//States 
	const [addEmploye, setAddEmploye] = useState(false);
	//APi Test 
	const [isloading, setisloading] = useState(false)
	const [errMsg, seterrMsg] = useState(null)
	const handelClose = () => setAddEmploye(false)

	
	



	useImperativeHandle(ref, () => ({
		showEmployeModal() {
			setAddEmploye(true)
		}
	}));


	//varibels
	let Meals = {
		Meal: '',
		Price: '',
		

	}

	//functions 
	async function addData(value) {
		setisloading(true)

		try {
			const response = await axios.post('http://localhost:8082/Meals', value, {
				headers: {
					token: localStorage.getItem('tkn')
				}
			}).then(res => swal(("add Successfly")))
			formikObj.resetForm()
			handelClose()
			props.getAllData();

		}

		catch (error) {

		}

		setisloading(false)
	}



	
	//validations 
	const formikObj = useFormik({

		initialValues: Meals,
		onSubmit: addData,
		validate: function (value) {
			seterrMsg(null);

			const errors = {}


			
			if (value.Meal.length < 3 || value.Meal.length > 66) {
				errors.Meal = 'The Meal  must be not less than 3 leters long  '
			}
			if (value.Price.length < 3 || value.Price.length > 66) {
				errors.Price = 'The Price  must be not less than 1 Number  long  '
			}



			console.log(errors)
			return errors;
		}


	})









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
												onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Meal}
											/>
											{formikObj.errors.Meal && formikObj.touched.Meal ? <div className=' alert alert-danger'>{formikObj.errors.Meal}</div> : ""}

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
												onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Price}
											/>

											{formikObj.errors.Price && formikObj.touched.Price ? <div className=' alert alert-danger'>{formikObj.errors.Price}</div> : ""}

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

export default MelasMoadel;
