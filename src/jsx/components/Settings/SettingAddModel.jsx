import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Offcanvas } from "react-bootstrap";
import axios from 'axios';
import { Field, FormikProvider, useFormik } from 'formik';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';





const SettingAddModel = forwardRef((props, ref) => {

  //States 
  const [addEmploye, setAddEmploye] = useState(false);
  //APi Test 
  const [isloading, setisloading] = useState(false)
  const [errMsg, seterrMsg] = useState(null)
  const handelClose = () => setAddEmploye(false)
  const token = localStorage.getItem('token');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesTtileLaogo, setSelectedImagesTtileLaogo] = useState([]);
  const [selectedImagesFavIcon, setSelectedImagesFavIcon] = useState([]);

   const [MainLogo, setMainLogo] = useState('')






  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddEmploye(true)
    }
  }));


  //varibels
  let Settings = {
    MainLogo: "",
    logotitle: "",
    FavIcon: "",
    Title: ""


  }
  

  
  //functions 
  async function addData(value) {
    setisloading(true)

    try {
      const response = await axios.post('http://localhost:8082/Setting', value, {
        headers: {
          token: localStorage.getItem('tkn')
        }
      }).then(res => swal(("add Successfly")))
      formikObj.resetForm()
      handelClose()
      setSelectedImages([]);
      setSelectedImagesFavIcon([]);
      props.getAllData();
      

    }

    catch (error) {

    }

    setisloading(false)
  }



  //validations 
  const formikObj = useFormik({

    initialValues: Settings,
    onSubmit: addData,
    validate: function (value) {
      seterrMsg(null);

      const errors = {}

      if (value.Title.length < 3 || value.Title.length > 35) {
        errors.Title = "The Title  must be at least 3 letters long";

     }

  

      console.log(errors)
      return errors;
    }


  })



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImages([imageUrl]); // Update the selected images state

    // Update the formikObj values with the image path in MainLogo field
    formikObj.setFieldValue('MainLogo', imageUrl); // Update MainLogo field using setFieldValue

    localStorage.setItem('selectedImages', JSON.stringify([imageUrl]));

    // Clear the file input value to allow selecting the same file again
    e.target.value = null;
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    localStorage.setItem('selectedImages', JSON.stringify(updatedImages));
  };

  const handleImageChangeLogotitle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImagesTtileLaogo([imageUrl]); // Update the selected images state

    // Update the formikObj values with the image path in MainLogo field
    formikObj.setFieldValue('logotitle', imageUrl); // Update MainLogo field using setFieldValue

    localStorage.setItem('selectedImagesTtileLaogo', JSON.stringify([imageUrl]));

    // Clear the file input value to allow selecting the same file again
    e.target.value = null;
  };


  const removeImageTitleLogo = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImagesTtileLaogo(updatedImages);
    localStorage.setItem('selectedImagesTtileLaogo', JSON.stringify(updatedImages));
  };



  const handleImageChangeFavIcon = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImagesFavIcon([imageUrl]); // Update the selected images state

    // Update the formikObj values with the image path in MainLogo field
    formikObj.setFieldValue('FavIcon', imageUrl); // Update MainLogo field using setFieldValue

    localStorage.setItem('selectedImagesFavIcon', JSON.stringify([imageUrl]));

    // Clear the file input value to allow selecting the same file again
    e.target.value = null;
  };


  const removeImageFavIcon = (index) => {
    const updatedImages = [...selectedImagesFavIcon];
    updatedImages.splice(index, 1);
    setSelectedImagesFavIcon(updatedImages);
    localStorage.setItem('selectedImagesFavIcon', JSON.stringify(updatedImages));
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
                                    onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.Title}
                                    required
                                 />
                                 {formikObj.errors.Title && formikObj.touched.Title ? <div className=' alert alert-danger'>{formikObj.errors.Title}</div> : ""}

                    </div>
                    </div>

                <div className="col-lg-12 mb-2">
                      <div className="form-group mb-3">
                        <label htmlFor="file-input" className="">Select  Main Logo Image</label>
                        <input
                          id="file-input"
                          className=' form-control'
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          placeholder='Select  Main Logo Image'
                        />
                        <div>
                          <div className='d-flex'>
                            {selectedImages.map((url, index) => (
                              <div key={index}>
                                <img className='mt-4 mb-4' src={url} alt={`Selected ${index + 1}`} style={{ maxWidth: '350px' }} />
                                <a onClick={() => removeImage(index)}><i className="fa-solid fa-trash ps-1"></i></a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  <div className="col-lg-12 mb-2">
                  
                  <div className="form-group mb-3">
                        <label htmlFor="file-input2" className="">Select  Title Logo Image</label>
                        <input
                          id="file-input2"
                          className=' form-control'
                          type="file"
                          accept="image/*"
                          onChange={handleImageChangeLogotitle}
                          placeholder='Select  Title Logo Image'
                        />
                        <div>
                          <div className='d-flex'>
                            {selectedImagesTtileLaogo.map((url, index) => (
                              <div key={index}>
                                <img className='mt-4 mb-4' src={url} alt={`Selected ${index + 1}`} style={{ maxWidth: '350px' }} />
                                <a onClick={() => removeImageTitleLogo(index)}><i className="fa-solid fa-trash ps-1"></i></a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                  
                  
                  </div>
                     
                  



                  <div className="col-lg-12 mb-2">
                      <div className="form-group mb-3">
                        <label htmlFor="file-input3" className="">Select  Fav Icon</label>
                        <input
                          id="file-input3"
                          className=' form-control'
                          type="file"
                          accept="image/*"
                          onChange={handleImageChangeFavIcon}
                          placeholder='Select  Fav Icon'
                        />
                        <div>
                          <div className='d-flex'>
                            {selectedImagesFavIcon.map((url, index) => (
                              <div key={index}>
                                <img className='mt-4 mb-4' src={url} alt={`Selected ${index + 1}`} style={{ maxWidth: '350px' }} />
                                <a onClick={() => removeImageFavIcon(index)}><i className="fa-solid fa-trash ps-1"></i></a>
                              </div>
                            ))}
                          </div>
                        </div>
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

export default SettingAddModel;
