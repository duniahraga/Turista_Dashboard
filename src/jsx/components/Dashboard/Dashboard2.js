import React from 'react';
import {Link} from 'react-router-dom';
import DounutProject from './elements/DounutProject';
import { IMAGES } from '../../constant/theme';
import ProjectOverviewTab from './elements/ProjectOverviewTab';
import LiterarySuccess from './elements/LiterarySuccess';
import EarningChart from './elements/EarningChart';
import EmployeesTableList from './elements/EmployeesTableList';
import Dashboard2Project from './Dashboard2Project';

const Dashboard2 = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-6 col-xxl-7">
                    <div className="row">
                        <div className="col-xl-6 col-sm-6">
                            <div className="card ds-2">
                                <div className="card-body">
                                    <div className="">
                                        <h3>20</h3>
                                        <h6>Tasks Not Finisheds</h6>
                                    </div>	
                                    <div className="progress-box">
                                        <div className="d-flex justify-content-between mb-2">
                                            <p className="mb-0">Complete Task</p>
                                            <p className="mb-0">20/28</p>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar bg-white" style={{width:"50%", height:"5px", borderRadius:"4px"}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="ds-head">
                                        <h3 className="d-flex align-items-center justify-content-between">$2,000<span className="badge badge-success light ms-2"><i className="fa-solid fa-arrow-up me-2"></i>5.2%
                                            </span></h3>
                                        <h6>Total Deposit</h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <DounutProject />
                                            <ul className="project-list">
                                                <li><h6>All Projects</h6></li>
                                                <li>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="10" height="10" rx="3" fill="#3AC977"/>
                                                    </svg>{" "}
                                                    Compete
                                                </li>
                                                <li>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="10" height="10" rx="3" fill="var(--primary)"/>
                                                    </svg>{" "}
                                                    Pending
                                                </li>
                                                <li>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="10" height="10" rx="3" fill="var(--secondary)"/>
                                                    </svg>{" "}
                                                    Not Start
                                                </li>
                                            </ul>
                                        </div>
                                        <ul className="ds-prise">
                                            <li>$500</li>
                                            <li>$200</li>
                                            <li>$560</li>
                                        </ul>
                                        
                                    </div>	
                                </div>	
                            </div>	
                        </div>
                        <div className="col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="ds-head">
                                        <h6 className="mb-0">Revenue</h6>
                                        <h3><small>$</small>310.435</h3>
                                    </div>
                                    <div className="d-team">
                                        <span className="d-block text-black">Our Star</span>
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-list avatar-list-stacked">
                                                <img src={IMAGES.contact6} className="avatar avatar-lg  rounded-circle" alt=""/>{" "}
                                                <img src={IMAGES.contact5} className="avatar avatar-lg rounded-circle" alt=""/>{" "}
                                                <img src={IMAGES.contact1} className="avatar avatar-lg rounded-circle" alt=""/>{" "}
                                                <span className="avatar avatar-lg  rounded-circle bg-primary text-white">P</span>{" "}
                                                <img src={IMAGES.contact6} className="avatar avatar-lg  rounded-circle" alt=""/>{" "}
                                                <span className="avatar avatar-lg  rounded-circle bg-danger text-white">H</span>
                                            </div>
                                            <Link to={"#"}>21+ Team</Link>
                                        </div>
                                    </div>	
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="ds-head">
                                        <img src={IMAGES.Uidesign} alt=""/>
                                    </div>
                                    <div className="">
                                        <h6>UI/UX Design</h6>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <Link to={"#"} className="btn btn-primary btn-sm">Learn More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>    
                </div> 
                <div className="col-xl-6 col-xxl-5">
                    <div className="card upgrade">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Upgrade Your Plan</h4>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <img src={IMAGES.Items} alt="" />
                            </div>
                            <h4>Enviroment with Pro Plan for Free</h4>
                            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal1">Upgrade</button>
                        </div>
                    </div>
                </div>   
                <div className="col-xl-6 col-xxl-12">
                    <LiterarySuccess />
                </div>
                <div className="col-xl-6 col-xxl-12">
                    <ProjectOverviewTab height={340}/>
                </div>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-6 col-xxl-5 col-sm-6">
                                    <div className="space-image">
                                        <img src={IMAGES.window} alt="" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-xxl-7 col-sm-6">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="">
                                            <h4 className="mb-0">Prominent</h4>
                                            <span>User Interface Design</span>
                                        </div>	
                                        <Link to={"/project"} className="btn btn-primary btn-sm">View Project</Link>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="s-date">
                                            <p className="mb-0">Start Date</p>
                                            <span>17 June 2023</span>
                                        </div>
                                        <div className="s-date">
                                            <p className="mb-0">End Date</p>
                                            <span>08 May 2023</span>
                                        </div>
                                        <div className="s-date">
                                            <p className="mb-0">Price</p>
                                            <span>$256</span>
                                        </div>
                                    </div>
                                    <p className="para">Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center p-bd">
                                            <img src={IMAGES.contact6} className="avatar avatar-lg  rounded-circle" alt="" />
                                            <div className="ms-2">
                                                <p className="mb-0">Project Manager</p>
                                                <span>Hanuman</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <img src={IMAGES.budget} className="avatar avatar-lg  rounded-circle" alt="" />
                                            <div className="ms-2">
                                                <p className="mb-0 text-black">Budget</p>
                                                <span>$25,25</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-team mt-4">
                                        <span className="d-block text-black">Our Star</span>
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-list avatar-list-stacked">
                                                <img src={IMAGES.contact6} className="avatar avatar-lg  rounded-circle" alt="" />{" "}
                                                <img src={IMAGES.contact5} className="avatar avatar-lg rounded-circle" alt="" />{" "}
                                                <img src={IMAGES.contact1} className="avatar avatar-lg rounded-circle" alt="" />{" "}
                                                <span className="avatar avatar-lg  rounded-circle bg-primary text-white">P</span>{" "}
                                                <img src={IMAGES.contact6} className="avatar avatar-lg  rounded-circle" alt="" />{" "}
                                                <span className="avatar avatar-lg  rounded-circle bg-danger text-white">H</span>
                                            </div>
                                            <Link to={"#"}className="text-primary">21+ Team</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
                <div className="col-xl-6">
                    <Dashboard2Project/>
				</div>
                <div className="col-xl-9 col-xxl-8 bst-seller">
                    <EmployeesTableList />
                </div>
                <div className="col-xl-3 col-xxl-4 t-earn">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="heading mb-0">Total Earning</h4>
                        </div>
                        <EarningChart />
                    </div>
                </div>
            </div>    
        </div>    
    );
};

export default Dashboard2;