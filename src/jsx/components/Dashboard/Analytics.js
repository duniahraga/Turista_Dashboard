import React from 'react';
import {Link} from 'react-router-dom';
import { IMAGES, SVGICON } from '../../constant/theme';
import CrmYearlyIncome from './elements/CrmYearlyIncome';
import AnalyticsEarning from './elements/AnalyticsEarning';
import AddVisitorLine from './elements/AddVisitorLine';
import AnalyticsReportBar from './elements/AnalyticsReportBar';

const cardList =[
    {icon:'fa-solid fa-basketball', title:'Dribble', subtitle:'@statistics', number:'+23',},
    {icon:'fa-brands fa-facebook-f', title:'Fb', subtitle:'@fb', number:'+33',},
    {icon:'fa-brands fa-amazon', title:'Anazone', subtitle:'@hemsr', number:'-13',},
    {icon:'fa-brands fa-behance', title:'Behance', subtitle:'@behan', number:'+25',},
    {icon:'fa-brands fa-aws', title:'AWS', subtitle:'@awes', number:'+32',},
    {icon:'fa-brands fa-instagram', title:'Insta', subtitle:'@abcd', number:'-08',},
];
const countryList = [
    {image:IMAGES.india, doller:'9,525', name:'India', percent:'25.8', bg:'primary', icon:'up'},
    {image:IMAGES.canada, doller:'3,665', name:'Canada', percent:'18.5', bg:'secondary', icon:'up'},
    {image:IMAGES.china, doller:'6,500', name:'China', percent:'59.5', bg:'info', icon:'up'},
    {image:IMAGES.kingdom, doller:'3,162', name:'Kingdom', percent:'60.5', bg:'success', icon:'up'},
    {image:IMAGES.usa, doller:'1,256', name:'Usa', percent:'30.1', bg:'light', icon:'up'},
    {image:IMAGES.india, doller:'9,525', name:'India', percent:'25.8', bg:'primary', icon:'up'},
    {image:IMAGES.canada, doller:'3,665', name:'Canada', percent:'18.5', bg:'secondary', icon:'up'},
    {image:IMAGES.china, doller:'6,500', name:'China', percent:'59.5', bg:'info', icon:'up'},
    {image:IMAGES.kingdom, doller:'3,162', name:'Kingdom', percent:'60.5', bg:'success', icon:'up'},
    {image:IMAGES.usa, doller:'1,256', name:'Usa', percent:'30.1', bg:'light', icon:'up'},
];
const activityBlog = [
    {svg:'#2769ee', title:'Bubles Studios have 5 available', time:'8min',},
    {svg:'#eeac27', title:'Elextra Studios has invited you', time:'2min',},
    {svg:'#22bc32', title:'Highspeed Design Team have', time:'5min',},
    {svg:'#9933cb', title:'Kleon Studios have 5 available', time:'4min',},
    {svg:'#eeac27', title:'Elextra Studios has invited you', time:'3min',},
    {svg:'#22bc32', title:'Highspeed Design Team have', time:'9min',},
    {svg:'#9933cb', title:'Bubles Studios have 5 available', time:'7min',},
];

const iconBox = [
    {icon:'fa-solid fa-chart-simple', price:'5,536', name:'Sales', color:'danger'},
    {icon:'fa-solid fa-user', price:'4,613', name:'Customer', color:'primary'},
    {icon:'fa-solid fa-box', price:'1,536', name:'Products', color:'info'},
    {icon:'fa-solid fa-user', price:'2,036', name:'Market', color:'secondary'},
];

const earningCard = [
    {title:'Earning', number:'2,256', svg:SVGICON.dollersecondary, chart:'secondary',chartTheme:'var(--secondary)'},
    {title:'Profit', number:'3,367', svg:SVGICON.dollerprimary, chart:'primary', chartTheme:'var(--primary)'},
    {title:'Expense', number:'3,567', svg:SVGICON.calenderInfo, chart:'info', chartTheme:'#58bad7'},
];

const Analytics = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-6">
                    <div className="card overflow-hidden">
                        <div className="card-body">
                            <div className="any-card">
                                <div className="c-con">
                                    <h4 className="heading mb-0">Congratulations <strong>Hanu!!</strong><img src={IMAGES.popper} alt=""/></h4>
                                    <span>Best seller of the week</span>
                                    <p className="mt-3">Lorem Ipsum is simply dummy 😎 text of the printing and typesetting industry.</p>
                                        
                                    <Link to={"#"} className="btn btn-primary btn-sm">View Profile</Link>
                                </div>
                                <img src={IMAGES.develop} className="harry-img" alt="" />
                                
                            </div>	
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0 text-white">Overview Of Sales 😎</h4>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="sales-bx">
                                    <img src={IMAGES.sales} alt="" />
                                    <h4>$3,651</h4>
                                    <span>Total Sales</span>
                                </div>
                                <div className="sales-bx">
                                    <img src={IMAGES.shopping} alt="" />
                                    <h4>5831</h4>
                                    <span>Total Sales</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary-light">
                                    {SVGICON.calender}
                                </div>
                                <div className="ms-2">
                                    <h6 className="mb-0">Total</h6>
                                    <span>2520</span>
                                </div>
                            </div>	
                        </div>
                        <div className="card-body p-0 custome-tooltip">                            
                            <CrmYearlyIncome  height={120}/>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="card bg-primary-light analytics-card">
                        <div className="card-body mt-4 pb-1">
                            <div className="row align-items-center"> 
                                <div className="col-xl-2">
                                    <h3 className="mb-3">Analytics</h3>
                                    <p className="mb-0 text-primary pb-4">Yout statistics for<br/> 1 month period.</p>
                                </div>
                                <div className="col-xl-10">
                                    <div className="row">
                                        {cardList.map((item, ind)=>(
                                            <div className="col-xl-2 col-sm-4 col-6" key={ind}>
                                                <div className="card ov-card">
                                                    <div className="card-body">
                                                        <div className="ana-box">	
                                                            <div className="ic-n-bx">
                                                                <div className="icon-box bg-primary rounded-circle">
                                                                    <i className={`text-white ${item.icon}`}></i>
                                                                </div>
                                                            </div>
                                                            <div className="anta-data">
                                                                <h5>{item.title}</h5>
                                                                <span>{item.subtitle}</span>
                                                                <h3>{item.number}%</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-xxl-12">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Reports Of Earning</h4>
                        </div>
                        <div className="card-body py-0">
                            <div className="row align-items-center">
                                {earningCard.map((item, ind)=>(
                                    <div className="col-xl-4 col-sm-4" key={ind}> 	
                                        <div className="card">
                                            <div className="card-header border-0 p-2">
                                                <div className="d-flex align-items-center">
                                                    <div className={`icon-box bg-${item.chart}-light`}>                                                       
                                                        {item.svg}
                                                    </div>
                                                    <div className="ms-2">
                                                        <h6 className="mb-0">{item.title}</h6>
                                                        <span>${item.number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body p-0 custome-tooltip">                                                
                                                <AddVisitorLine colorTheme ={item.chartTheme} />
                                            </div>
                                        </div>
                                    </div>
                                ))}                                    
                                
                                <div className="col-xl-3 ">
                                    <h3>$5,6641</h3>	
                                    <p>Lorem Ipsum is simply dummy text</p>
                                </div>
                                <div className="col-xl-9 custome-tooltip">
                                    <div id="chartBar" className="chartBar1"></div>
                                    <AnalyticsReportBar />
                                </div>
                            </div>
                        </div>
                    </div>                       
                </div>
                <div className="col-xl-3 col-xxl-6 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <div>
                                <h4 className="heading mb-0">Country Sale</h4>
                                <span>Weekly Sales</span>
                            </div>	
                        </div>
                        <div className="card-body p-0 pb-3">
                            <ul className="country-sale dz-scroll">
                                {countryList.map((item, index)=>(
                                    <li className="d-flex" key={index}>
                                        <div className="country-flag">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                                            <div className="ms-2">
                                                <h6 className="mb-0">${item.doller}</h6>
                                                <small>{item.name}</small>
                                            </div>
                                            <span className={`badge border-0 ms-2 badge-${item.bg}`}>{item.percent}%<i className={`fa-solid  ms-2 text-white fa-chevron-${item.icon}`}></i></span>
                                        </div>
                                    </li>
                                ))}
                            </ul>   
                        </div>    
                    </div>    
                </div>
                <div className="col-xl-3 col-xxl-6 col-md-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <div>
                                <h4 className="heading mb-0">Activity Log</h4>
                                <span>Update 2 Hours Before</span>
                            </div>	
                        </div>
                        <div className="card-body px-0 pt-0">
                            <div className="activity-sale dz-scroll">
                                {activityBlog.map((item, ind)=>(
                                    <div className="d-flex recent-activity" key={ind}>
                                        <span className="me-3 activity">
                                            {ind === 0 ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17 17">
                                                    <circle cx="8.5" cy="8.5" r="8.5" fill="#f93a0b"></circle>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17 17">
                                                    <circle cx="8.5" cy="8.5" r="8.5" fill="#d9d9d9"></circle>
                                                </svg>
                                            }
                                        </span>
                                        <div className="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 71 71">
                                                <g transform="translate(-457 -443)">
                                                <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"></rect>
                                                <g transform="translate(457 443)">
                                                    <rect data-name="placeholder" width="71" height="71" rx="12" fill={item.svg}></rect>
                                                    <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"></circle>
                                                    <circle data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" style={{mixBlendMode: "multiply", isolation: "isolate" }}></circle>
                                                </g>
                                                </g>
                                            </svg>
                                            <div className="ms-3 active-data">
                                                <h5 className="mb-1">{item.title}</h5>
                                                <span>{item.time} ago</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="row">
                        {iconBox.map((item, ind)=>(
                            <div className="col-xl-6 col-sm-6" key={ind}>
                                <div className="card">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div className="d-flex">
                                            <div className="icon-box icon-box-md bg-danger-light me-1">
                                                <i className={`${item.icon} text-${item.color}`} ></i>
                                            </div>
                                            <div className="ms-2">
                                                <h4>${item.price}</h4>
                                                <p className="mb-0">{item.name}</p>
                                            </div>
                                        </div>
                                        <Link to={"#"}><i className={`fa-solid fa-chevron-right text-${item.color}`}></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))}                       
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="heading mb-0">Total Sale</h4>
                        </div>
                        <div className="card-body pb-0">
                            <AnalyticsEarning />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;