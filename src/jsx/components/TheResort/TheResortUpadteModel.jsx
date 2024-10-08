import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Offcanvas } from "react-bootstrap";
import axios from 'axios';
import { Field, FormikProvider, useFormik } from 'formik';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';





const UpadteResoreModel = forwardRef((props, ref) => {
	console.log(props)

	//States 
	//APi Test 
	const [isloading, setisloading] = useState(false)
	const [errMsg, seterrMsg] = useState(null)
	const token = localStorage.getItem('token');
	const [UpdateResrore, setUpdateResrore] = useState(false);
	const handelClose = () => setUpdateResrore(false)




	//varibels
	const [Restore, setRestore] = useState({
		Title: props.updateRestore.Title,
		Cities: props.updateRestore.Cities,
		Zones: props.updateRestore.Zones,
		NearSea: props.updateRestore.NearSea,
		Publish: props.updateRestore.Publish,
		CheckInTime: props.updateRestore.CheckInTime,
		CheckOutTime: props.updateRestore.CheckOutTime,
		Advancedinformation: props.updateRestore.Advancedinformation || null,
		longitude: props.updateRestore.longitude,
		latitude: props.updateRestore.latitude,
		Seizurelaw: props.updateRestore.Seizurelaw,
		Abolitionlaw: props.updateRestore.Abolitionlaw,
		facility: props.updateRestore.facility,
		amenity: props.updateRestore.amenity,
		Description: props.updateRestore.Description,
		NumberOfMeter:props.updateRestore.NumberOfMeter


	})


	console.log(Restore)







	useImperativeHandle(ref, () => ({
		showUpdateModal() {
			setUpdateResrore(true)
		}
	}));

	useEffect(() => {

		setRestore(props.updateRestore)

		props.getAllData()
	}, [props.updateRestore, setUpdateResrore]);
	//functions
	const onSubmit = ev => {
		ev.preventDefault()
		setisloading(true)
		axios.put(`http://localhost:8081/Restore/${Restore.id}`, Restore)
		swal(("UpdateSuccsfly")).then(res => props.getAllData())
		handelClose()
		setisloading(false)



	}





	const handleImageUpload = (file) => {
		const reader = new FileReader();
		reader.onload = function (e) {
			const imgData = e.target.result;
			setRestore({ ...Restore, Advancedinformation: imgData });
		};
		reader.readAsDataURL(file);
	};






	return (

		<Offcanvas show={UpdateResrore} onHide={setUpdateResrore} className="offcanvas-end customeoff" placement='end'>

			<>
				{errMsg ? <div className=' alert alert-danger w-75 text-center fs-4'> {errMsg}</div> : ''}

				<div className="container-fluid">
					<div className="row">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel1">{("Add Restore ")}</h1>
							<button type="button" className="btn-close" onClick={() => setUpdateResrore(false)}
							>

								<i className="fa-solid fa-xmark"></i>

							</button>
						</div>




					</div>
				</div>

				<div className="offcanvas-body">
					<div className="container-fluid">

						<form onSubmit={onSubmit}>
							<div className="row">
								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">Title*</label>
										<input
											type="text"
											name="Title"
											className="form-control"
											placeholder="Title"
											required defaultValue={props.updateRestore.Title} onChange={ev => setRestore({ ...Restore, Title: ev.target.value })} />

									</div>
								</div>
								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">Cities*</label>
										<select name="Cities" className="default-select form-control" as="select" defaultValue={props.updateRestore.Cities} onChange={ev => setRestore({ ...Restore, Cities: ev.target.value })}	>

											<option data-display="Select">Please select</option>
											<option value="html">Ind</option>
											<option value="css">USA</option>
											<option value="javascript">UK</option>
										</select>

									</div>
								</div>
								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">Zones*</label>
										<select name='Zones' className="default-select form-control" as="select"
											required defaultValue={props.updateRestore.Zones} onChange={ev => setRestore({ ...Restore, Zones: ev.target.value })}>


											<option data-display="Select">Please select</option>
											<option value="html">Ind</option>
											<option value="css">USA</option>
											<option value="javascript">UK</option>
										</select>
									</div>
								</div>

								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">checkbox*</label>
										<div className="col-xl-12 col-lg-6">

											<div className="card-body">
												<div className="row">
													<div className="col-xl-4 col-xxl-4 col-4">
														<div className="form-check custom-checkbox mb-3">
															<input
																type="checkbox"
																defaultChecked={props.updateRestore.NearSea}
																className="form-check-input"
																id="customCheckBox1"
																name="NearSea"
																onChange={ev => setRestore({ ...Restore, NearSea: ev.target.checked })}
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
																	className=' form-control '
																	placeholder="meters near see "
                                                                     required
																	disabled={!props.updateRestore.NearSea}
																	defaultValue={props.updateRestore.NumberOfMeter} onChange={ev => setRestore({ ...Restore, NumberOfMeter: ev.target.value })} />


																
																
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
										<input className=' form-control' type="time" name='CheckInTime'
											required defaultValue={props.updateRestore.CheckInTime} onChange={ev => setRestore({ ...Restore, CheckInTime: ev.target.value })} />


									</div>

								</div>
								<div className="col-lg-6 mb-3 picker-data">
									<div className="form-group mb-3">
										<label className="text-label">Check Out Time*</label>
										<div className="color-time-picker">
											<input className=' form-control' type="time" name='CheckOutTime'
												required defaultValue={props.updateRestore.CheckOutTime} onChange={ev => setRestore({ ...Restore, CheckOutTime: ev.target.value })} />

										</div>
									</div>
								</div>

								<div>
									<label>add the Image </label>
									<input
										type='file'
										onChange={(ev) => {
											const file = ev.target.files[0];
											if (file) {
												handleImageUpload(file);
											}
										}}
										className="form-control"
										id="exampleFormControlInput2"
										placeholder=""
									/>
									{Restore.Advancedinformation && <img src={Restore.Advancedinformation} alt="Uploaded" />}
								</div>
								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">latitude*</label>
										<input
											type="text"
											name="latitude"
											className="form-control"
											placeholder="latitude"
											defaultValue={props.updateRestore.latitude} onChange={ev => setRestore({ ...Restore, latitude: ev.target.value })} />




									</div>
								</div>
								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">longitude*</label>
										<input
											type="text"
											name="longitude"
											className="form-control"
											placeholder="longitude"
											required defaultValue={props.updateRestore.longitude} onChange={ev => setRestore({ ...Restore, longitude: ev.target.value })} />

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
											required defaultValue={props.updateRestore.Seizurelaw} onChange={ev => setRestore({ ...Restore, Seizurelaw: ev.target.value })} />



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
											required defaultValue={props.updateRestore.Abolitionlaw} onChange={ev => setRestore({ ...Restore, Abolitionlaw: ev.target.value })} />

									</div>
								</div>


								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">facility*</label>
										<input
											type="text"
											name="facility"
											className="form-control"
											placeholder="facility"
											required defaultValue={props.updateRestore.facility} onChange={ev => setRestore({ ...Restore, facility: ev.target.value })} />



									</div>
								</div>
								<div className="col-lg-6 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">Amenity*</label>
										<input
											type="text"
											name="amenity"
											className="form-control"
											placeholder="amenity"
											required defaultValue={props.updateRestore.amenity} onChange={ev => setRestore({ ...Restore, amenity: ev.target.value })} />



									</div>
								</div>

								<div className="col-lg-12 mb-2">
									<div className="form-group mb-3">
										<label className="text-label">Description*</label>
										<textarea name='Description' className="form-control " rows="10" cols="50"  defaultValue={props.updateRestore.Description} onChange={ev => setRestore({ ...Restore, Description: ev.target.value })}></textarea>

									</div>
								</div>
							</div>



							<div className=' mt-4'>
								<button type="submit" className="btn btn-primary me-1">

									{isloading ? <ThreeDots
										color="#fff"
										width="50"
										visible={true}
										ariaLabel='falling-lines-loading'
									/> : "Submit"}

								</button>
								<Link to={"#"} onClick={() => setUpdateResrore(false)} className="btn btn-danger light ms-1">Cancel</Link>
							</div>



						</form>

					</div>
				</div>



			</>
		</Offcanvas>
	);
});

export default UpadteResoreModel;
