import React from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import { IMAGES, SVGICON } from '../../constant/theme';
import DounutProject from './elements/DounutProject';
import TrafficDonutChart from './elements/TrafficDonutChart';
import CrmMarketArea from './elements/CrmMarketArea';
import CrmExtranalChart from './elements/CrmExtranalChart';
import CrmYearlyIncome from './elements/CrmYearlyIncome';

const CrmColumnChart = loadable(() =>
	pMinDelay(import("./elements/CrmColumnChart"), 1000)
);
const CrmTimelineChart = loadable(() =>
	pMinDelay(import("./elements/CrmTimelineChart"), 1000)
);

const groupBlog = [
    {title:'React'},
    {title:'Css'},
    {title:'Scss'},
    {title:'C++'},
    {title:'JavaScript'},
];
const projectList = [
    {title:'UI Kit Design', number1:'100', number2:'200', bg:'primary', icon:'fa-brands fa-uikit text-primary'},
    {title:'CRM Dashboard', number1:'90', number2:'100', bg:'secondary', icon:'fa-sharp fa-solid fa-star text-secondary'},
    {title:'Website Designing', number1:'80', number2:'100',bg:'success', icon:'fas fa-asterisk text-success'},
    {title:'Software Dovelopment', number1:'150', number2:'200', icon:SVGICON.Worldweb, iconbox : true},
    {title:'App Dovelopment', number1:'75', number2:'100',bg:'danger', icon:'fas fa-mobile-alt text-danger'},
    {title:'UI Kit Design', number1:'100', number2:'200',bg:'primary', icon:'fa-brands fa-uikit text-primary'},
    {title:'CRM Dashboard', number1:'90', number2:'100',bg:'secondary', icon:'fa-sharp fa-solid fa-star text-secondary'},
    {title:'Website Designing', number1:'80', number2:'100',bg:'success', icon:'fas fa-asterisk text-success'},
    {title:'Software Dovelopment', number1:'150', number2:'200', icon:SVGICON.Worldweb, iconbox : true},   
];

const netwrokBlog = [
    {image:IMAGES.dribble, title:'Dribble', price:'12,348', bg:'primary' , percent:'+36' },
    {image:IMAGES.facebook, title:'Facebook', price:'10,048', bg:'danger' , percent:'+33' },
    {image:IMAGES.instagram, title:'Instagram', price:'09,059', bg:'info' , percent:'-10' },
    {image:IMAGES.linkdin, title:'Linkedin', price:'13,259', bg:'success' , percent:'-14' },
    {image:IMAGES.pinterest, title:'Pinterest', price:'15,586', bg:'primary' , percent:'-21' },
];
const meetingList = [
    {image:IMAGES.contact1, title:'Liam Risher',  bg:'primary', status:'Business'},
    {image:IMAGES.contact2, title:'Oliver Noah', bg:'primary', status:'Business'},
    {image:IMAGES.contact3, title:'Donald Benjamin', bg:'success', status:'Accountant'},
    {image:IMAGES.contact6, title:'Elijah James',  bg:'info', status:'Manager'},
    {image:IMAGES.contact5, title:'William Risher', bg:'info', status:'Manager'},
];

const tableList = [
    {name:'American Express', amount:'522', total:'4,5226'},
    {name:'Master Card', amount:'756', total:'1,1256'},
    {name:'Visa Card', amount:'3.4125', total:'5,1236'},
    {name:'American Express', amount:'522', total:'4,5226'},
    {name:'Master Card', amount:'756', total:'1,1256'},
    {name:'Visa Card', amount:'3.4125', total:'5,1236'}
];
const Crm = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-4 col-xxl-3 col-sm-6">
                    <div className="card overflow-hidden">
                        <div className="card-body">
                            <div className="c-con">
                                <h4 className="heading mb-0">Congratulations <strong>Hanu!!</strong><img src={IMAGES.popper} alt="" /></h4>
                                <span>Best seller of the week</span>
                            </div>
                            <div className="c-con-3d">
                                <div className="c-con-prise">
                                    <h3 className="mb-0 text-primary">$43.9k</h3>
                                    <span className="d-block mb-2">98% of target 🧡 </span>
                                    <Link to={"#"} className="btn btn-primary btn-sm">View Sale</Link>
                                </div>
                                <img src={IMAGES.object} alt="" />
                            </div>	
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-xxl-3 col-sm-6">
                    <div className="card crm-cart bg-secondary border-0">
                        <div className="card-header border-0 pb-0">
                            <span className="text-white fs-16">+38%<i className="fa-solid fa-chevron-up ms-1"></i></span>
                            <div className="icon-box bg-white">
                                {SVGICON.Doller}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="crm-cart-data">
                                <p>252$</p>
                                <span className="d-block mb-3 text-black">Total Sales</span>
                                <span className="badge bg-white text-black border-0">Last 4 Month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-xxl-3 col-sm-4">
                    <div className="card crm-cart bg-primary border-0">
                        <div className="card-header border-0 pb-0">
                            <span className="text-white fs-16">+34%<i className="fa-solid fa-chevron-up ms-1"></i></span>
                            <div className="icon-box bg-white">
                                {SVGICON.trolly}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="crm-cart-data">
                                <p className="text-white">256k</p>
                                <span className="d-block mb-3 text-white">Total Orders</span>
                                <span className="badge bg-white text-black border-0">Last 6 Month</span>
                            </div>
                        </div>
                    </div>
                
                </div>		
                <div className="col-xl-2 col-xxl-3 col-sm-4 clm-chart">
                    <div className="card crm-cart">
                        <div className="card-header border-0 pb-0">
                            <div>
                                <h4 className="mb-0">$5,655<small className="text-danger ms-2">-33%</small></h4>
                                <span className="d-block">Total Profit</span>
                            </div>	
                        </div>
                        <div className="card-body custome-tooltip">
                            <CrmColumnChart />
                        </div>
                    </div>
                </div>	
                <div className="col-xl-2 col-xxl-3 col-sm-4">
                    <div className="card crm-cart">
                        <div className="card-header border-0 pb-0">
                            <div>
                                <h4 className="mb-0">$5,586<small className="text-success ms-2">+59%</small></h4>
                                <span className="d-block">Total Growth</span>
                            </div>	
                        </div>
                        <div className="card-body d-flex justify-content-center pt-2">
                            <div id="AllProject" className="ms-0">
                                <DounutProject />
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Organic Traffic</h4>
                        </div>
                        <div className="card-body pt-0 custome-tooltip">
                            <div className="d-flex justify-content-center">                                
                                <TrafficDonutChart />
                            </div>
                            <ul className="lang-chart">
                                {groupBlog.map((item, index)=>(
                                    <li key={index}><i className="fa-sharp fa-regular fa-circle-dot"></i>{item.title}</li>
                                ))}   
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card overflow-hidden">
                        <div className="card-header border-0">
                            <div>
                                <h4 className="heading mb-0">Project Timeline</h4>
                                <span>Total 582 Projects Completed</span>
                            </div>	
                        </div>
                        <div className="card-body py-0 pe-0 ">
                            <div className="row">
                                <div className="col-xl-9 col-xxl-8 col-md-8">                                    
                                    <CrmTimelineChart />
                                </div>
                                <div className="col-xl-3 col-xxl-4 col-md-4 c-line">
                                    <div className="crm-p-list">
                                        <div>
                                            <h4 className="heading mb-0">Project List</h4>
                                            <span>4 Running Project</span>
                                        </div>
                                    </div>	
                                    <div className="dz-scroll project-scroll">
                                        {projectList.map((item, index)=>(                                        
                                            <div className="p-list" key={index}>                                                
                                                {item.iconbox ? 
                                                    <div className="icon-box bg-info-light">   
                                                        {SVGICON.Worldweb}
                                                    </div>
                                                    :
                                                    <div className={`icon-box bg-${item.bg}-light`}>
                                                        <i className={item.icon} />
                                                    </div>
                                                }
                                                
                                                <div className="ms-2">
                                                    <h6 className="mb-0">{item.title}</h6>
                                                    <span>Task {item.number1}/{item.number2}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Monthly Overview</h4>
                        </div>
                        <div className="card-body py-0 custome-tooltip">
                            <CrmMarketArea />
                            <div>
                                <h4 className="mb-0">80%</h4>
                                <p>Your sales performance is 49% 😀 better compared to last week</p>
                            </div>
                        </div>
                        <div className="card-footer border-0 pt-0">
                            <Link to={"#"} className="btn btn-primary btn-block">View Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Social Networking</h4>
                        </div>
                        <div className="card-body py-0 pb-3">
                            <div className="mb-3">
                                <div className="d-flex align-items-center">
                                <h4 className="mb-0">26,368</h4>
                                <span className="text-success font-w600 ms-2">
                                    <i className="mdi mdi-menu-up"></i>
                                    <small>62%</small>
                                </span>
                                </div>
                                <small>Last 2 Year Visits</small>
                            </div>
                            <ul className="sociallinks">
                                {netwrokBlog.map((item, ind)=>(
                                    <li className="d-flex" key={ind}>
                                        <div className="icon">
                                            <img src={item.image} className="icon-box" alt="" />
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                                            <div className="ms-2">
                                                <h6 className="mb-0">{item.title}</h6>
                                                <small>Social Media</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className="font-w500 text-primary">{item.price}</span>
                                                <span className={`badge border-0 ms-2 badge-${item.bg}`}>{item.percent}%</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>   
                        </div>   
                    </div>    
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Yearly Income</h4>
                        </div>
                        <div className="card-body custome-tooltip">                         
                            <CrmYearlyIncome  height={250}/>
                            <p className="mt-4 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Meeting Plane</h4>
                        </div>
                        <div className="card-body">
                            <ul className="sociallinks">
                                {meetingList.map((item, ind)=>(
                                    <li className="d-flex" key={ind}>
                                        <div className="icon">
                                            <img src={item.image} className="avatar avatar-xl" alt="" />
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                                            <div className="ms-2">
                                                <h6 className="mb-0">{item.title}</h6>
                                                <small><i className="fa-solid fa-calendar-days me-2"></i><span>21 Jul | 08:20-10:30</span></small>
                                            </div>
                                            <span className={`badge border-0 ms-2 badge-${item.bg}`}>{item.status}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>        
                    </div> 
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">External Data</h4>
                        </div>
                        <div className="card-body custome-tooltip pb-0">
                            <ul className="crm-ads-list">
                                <li>
                                    <div className="dots-crm">
                                        <span className="dots bg-primary"></span>
                                        <h6>Google Ads</h6>
                                    </div>	
                                    <span>$512k</span>
                                    <h6>83%<i className="fa-solid fa-chevron-up ms-2 text-primary"></i></h6>
                                </li>
                                <li>
                                    <div className="dots-crm">
                                        <span className="dots bg-secondary"></span>
                                        <h6>Fb Analytics</h6>
                                    </div>
                                    <span>$86.2k</span>
                                    <h6>58%<i className="fa-solid fa-chevron-down ms-2 text-secondary"></i></h6>
                                </li>
                                <li>
                                    <div className="dots-crm">
                                        <span className="dots bg-info"></span>
                                        <h6>Dribble User</h6>
                                    </div>	
                                    <span>$45.2k</span>
                                    <h6>58%<i className="fa-solid fa-chevron-down ms-2 text-info"></i></h6>
                                </li>
                            </ul>
                            <CrmExtranalChart />
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Payment History</h4>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive payment-tbl">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Card</th>
                                            <th className="text-center">Amount</th>
                                            <th className="text-center">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableList.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td>
                                                    <h6>{item.name}</h6>
                                                </td>
                                                <td>
                                                    <span>${item.amount}</span>
                                                </td>
                                                <td>
                                                    <span>${item.total}</span>
                                                </td>
                                            </tr>
                                        ))}                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crm;