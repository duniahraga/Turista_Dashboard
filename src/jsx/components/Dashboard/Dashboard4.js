import React from 'react';
import AddVisitorLine from './elements/AddVisitorLine';
import { IMAGES, SVGICON } from '../../constant/theme';
import TrafficBarChart from './elements/TrafficBarChart';
import SalesStatisticsArea from './elements/SalesStatisticsArea';
import { Dropdown } from 'react-bootstrap';
import SalesFigureChart from './elements/SalesFigureChart';
import TotalSaleLineChart from './elements/TotalSaleLineChart';
import ActiveUserChart from './elements/ActiveUserChart';
import ActiveUserChart2 from './elements/ActiveUserChart2';

const chartCardBlog = [
    {title:'Add Visitors', svg: SVGICON.VisitorPerson, number:'3,569',chartTheme:'var(--primary)', cardColor: 'primary'},
    {title:'Sessions Start', svg: SVGICON.Watch, number:'8:30 PM',chartTheme:'var(--secondary)', cardColor: 'secondary'},
    {title:'Total Live', svg: SVGICON.LivePerson, number:'4,187',chartTheme:'#58bad7', cardColor: 'info'},
];

const salesblog = [
    {title:'Orders', subtitle:'3,123'},
    {title:'Month', subtitle:'4,248'},
    {title:'Year', subtitle:'7,654'},
    {title:'Profit', subtitle:'2,545'},
];

const marketTable = [    
    { image: IMAGES.dribble, title:'Dribble', name:'Meta', icon:'up', changes:'2.556', price:'4,3655',status:'Active', color:'success' },
    { image: IMAGES.facebook, title:'Facebook', name:'Space', icon:'down', changes:'2.556', price:'3,2342',status:'Inactive', color:'danger' },
    { image: IMAGES.instagram, title:'Instagram', name:'Meta', icon:'up', changes:'4.556', price:'1,1255',status:'Active', color:'success' },
    { image: IMAGES.linkdin, title:'Linkedin', name:'Meta', icon:'down', changes:'2.556', price:'6,4612',status:'Deactive', color:'danger' },
];

const marketTable2 = [    
    { image: IMAGES.bing, title:'Bing', name:'Meta', icon:'up', changes:'2.556', price:'4,3655',status:'Active', color:'success' },
    { image: IMAGES.twitter, title:'Twitter Ads', name:'Tesla', icon:'down', changes:'1.556', price:'3,2342',status:'Pending', color:'danger' },
    { image: IMAGES.whatsapp, title:'Whatsapp Ads', name:'Meta', icon:'up', changes:'3.556', price:'1,1255',status:'Active', color:'success' }
];

const salesTable = [
    { image:IMAGES.dribble, title:'Dribble', subtitle:'Social Networking', date:'22 May 2023', budget:'3.55'},
    { image:IMAGES.whatsapp, title:'Whatsapp ', subtitle:'Service Provider', date:'12 June 2023', budget:'8.58'},
    { image:IMAGES.facebook, title:'Facebook', subtitle:'Social Networking', date:'30 April 2023', budget:'5.12'},
    { image:IMAGES.bing, title:'Bing', subtitle:'Search Engine', date:'21 June 2023', budget:'9.68'},
    { image:IMAGES.linkdin, title:'Linkedin', subtitle:'Social Networking ', date:'22 May 2023', budget:'1.12'},
];

const cardChartBlog = [
    {title:'Total Sale', number:'1,255', color:'primary', chartTheme:'var(--primary)'},
    {title:'Total Purchase', number:'5,552', color:'secondary', chartTheme:'var(--secondary)'},
    {title:'Active Customers', number:'3,431k', color:'info', chartTheme:'#58bad7'},
];

const Dashboard4 = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-7">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Traffic Update</h4>
                        </div>
                        <div className="card-body py-0 custome-tooltip">
                            <div className="row">
                                {chartCardBlog.map((item, ind)=>(
                                    <div className="col-xl-4 col-sm-4" key={ind}>
                                        <div className="card">
                                            <div className="card-header p-2 border-0">
                                                <div className="d-flex">
                                                    <div className={`icon-box rounded-circle bg-${item.cardColor}-light`}>
                                                     {item.svg}
                                                    </div>
                                                    <div className="ms-2 add-visit">
                                                        <h6 className="mb-0">{item.title}</h6>
                                                        <span>{item.number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body p-0 custome-tooltip">                                            
                                                <AddVisitorLine colorTheme ={item.chartTheme} />
                                            </div>
                                        </div>
                                    </div>
                                ))}                                
                            </div>                            
                            <TrafficBarChart />
                        </div>
                    </div>
                </div>
                <div className="col-xl-5">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Sales statistics</h4>
                        </div>
                        <div className="card-body custome-tooltip">
                            <div className="row">
                                {salesblog.map((item, index)=>(
                                    <div className="col-xl-3 col-3 or-series" key={index}>
                                        <div className="card text-center">
                                            <div className="card-body p-2">
                                                <h6>{item.title}</h6>
                                                <span>${item.subtitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}                               
                            </div>                            
                            <SalesStatisticsArea />
                        </div>
                    </div>
                </div>	
                <div className="col-xl-8">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="table-responsive active-projects task-table">
                                        <div className="tbl-caption">
                                            <h4 className="heading mb-0">Market Update</h4>
                                        </div>
                                        <table id="empoloyeestbl2" className="table market-update">
                                            <thead>
                                                <tr>
                                                    <th>Company Name</th>
                                                    <th>Client</th>
                                                    <th>Changes</th>
                                                    <th>Budget</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="heading-data">
                                                    <td colspan="5" className="text-start">Today</td>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Icons" viewBox="0 0 60 60" width="22" height="22"><path d="M2.245,29H4a1,1,0,0,1,1,1A24.943,24.943,0,0,0,17.2,51.465a6.144,6.144,0,0,1,1.976-3.195l.188-.163A20.9,20.9,0,0,1,9,30a1,1,0,0,1,1-1h1.755a.229.229,0,0,0,.222-.141.218.218,0,0,0-.037-.25L7.186,23.084a.247.247,0,0,0-.371,0L2.06,28.609a.218.218,0,0,0-.037.25A.229.229,0,0,0,2.245,29Z"/><path d="M11.738,19.167l.163.19A20.869,20.869,0,0,1,30,9a1,1,0,0,1,1,1v1.755a.229.229,0,0,0,.141.222.219.219,0,0,0,.25-.037l5.524-4.754a.247.247,0,0,0,0-.372L31.391,2.06a.221.221,0,0,0-.25-.037A.229.229,0,0,0,31,2.245V4a1,1,0,0,1-1,1A24.94,24.94,0,0,0,8.535,17.2a6.2,6.2,0,0,1,3.2,1.971Z"/><path d="M28.859,48.023a.252.252,0,0,0-.1-.023.223.223,0,0,0-.147.06l-5.526,4.754a.248.248,0,0,0,0,.372l5.525,4.754a.221.221,0,0,0,.25.037A.229.229,0,0,0,29,57.755V56a1,1,0,0,1,1-1A24.943,24.943,0,0,0,51.466,42.8a6.246,6.246,0,0,1-3.2-1.98v0l-.155-.179A20.9,20.9,0,0,1,30,51a1,1,0,0,1-1-1V48.245A.229.229,0,0,0,28.859,48.023Z"/><path d="M51,30a1,1,0,0,1-1,1H48.245a.229.229,0,0,0-.222.141.218.218,0,0,0,.037.25l4.754,5.524a.216.216,0,0,0,.371,0l4.755-5.525a.218.218,0,0,0,.037-.25A.229.229,0,0,0,57.755,31H56a1,1,0,0,1-1-1A24.941,24.941,0,0,0,42.8,8.534a6.239,6.239,0,0,1-1.98,3.2l-.181.156A20.9,20.9,0,0,1,51,30Z"/></svg>
                                                     </td>
                                                </tr>
                                                {marketTable.map((item, ind)=>(
                                                    <tr key={ind}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={item.image} className="avatar avatar-lg" alt="" />
                                                                <div className="ms-2 dr-data">
                                                                    <h6 className="mb-0">{item.title}</h6>
                                                                    <span>50 Template</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td className={`text-${item.color}`}><i className={`fa-solid me-1 fa-arrow-trend-${item.icon}`}></i> {item.changes}</td>
                                                        <td>${item.price}</td>
                                                        <td><span className={`badge light border-0 badge-${item.color}`}>{item.status}</span></td>
                                                        <td>
                                                            <Dropdown>
                                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                   {SVGICON.DropThreeDot}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu-right">
                                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="heading-data">
                                                    <td colspan="5" className="text-start">Yesterday</td>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Icons1" viewBox="0 0 60 60" width="22" height="22"><path d="M2.245,29H4a1,1,0,0,1,1,1A24.943,24.943,0,0,0,17.2,51.465a6.144,6.144,0,0,1,1.976-3.195l.188-.163A20.9,20.9,0,0,1,9,30a1,1,0,0,1,1-1h1.755a.229.229,0,0,0,.222-.141.218.218,0,0,0-.037-.25L7.186,23.084a.247.247,0,0,0-.371,0L2.06,28.609a.218.218,0,0,0-.037.25A.229.229,0,0,0,2.245,29Z"/><path d="M11.738,19.167l.163.19A20.869,20.869,0,0,1,30,9a1,1,0,0,1,1,1v1.755a.229.229,0,0,0,.141.222.219.219,0,0,0,.25-.037l5.524-4.754a.247.247,0,0,0,0-.372L31.391,2.06a.221.221,0,0,0-.25-.037A.229.229,0,0,0,31,2.245V4a1,1,0,0,1-1,1A24.94,24.94,0,0,0,8.535,17.2a6.2,6.2,0,0,1,3.2,1.971Z"/><path d="M28.859,48.023a.252.252,0,0,0-.1-.023.223.223,0,0,0-.147.06l-5.526,4.754a.248.248,0,0,0,0,.372l5.525,4.754a.221.221,0,0,0,.25.037A.229.229,0,0,0,29,57.755V56a1,1,0,0,1,1-1A24.943,24.943,0,0,0,51.466,42.8a6.246,6.246,0,0,1-3.2-1.98v0l-.155-.179A20.9,20.9,0,0,1,30,51a1,1,0,0,1-1-1V48.245A.229.229,0,0,0,28.859,48.023Z"/><path d="M51,30a1,1,0,0,1-1,1H48.245a.229.229,0,0,0-.222.141.218.218,0,0,0,.037.25l4.754,5.524a.216.216,0,0,0,.371,0l4.755-5.525a.218.218,0,0,0,.037-.25A.229.229,0,0,0,57.755,31H56a1,1,0,0,1-1-1A24.941,24.941,0,0,0,42.8,8.534a6.239,6.239,0,0,1-1.98,3.2l-.181.156A20.9,20.9,0,0,1,51,30Z"/></svg>
                                                    </td>
                                                </tr>
                                                {marketTable2.map((item, ind)=>(
                                                    <tr>
														<td>
															<div className="d-flex align-items-center">
																<img src={item.image} className="avatar avatar-lg" alt=""/>
																<div className="ms-2 dr-data">
																	<h6 className="mb-0">{item.title}</h6>
																	<span>30-50 Ads</span>
																</div>
															</div>
														</td>
														<td>Meta</td>
                                                        <td className={`text-${item.color}`}><i className={`fa-solid me-1 fa-arrow-trend-${item.icon}`}></i> {item.changes}</td>
														<td>${item.price}</td>
														<td><span className={`badge light border-0 badge-${item.color}`}>{item.status}</span></td>
														<td>
                                                            <Dropdown>
                                                                <Dropdown.Toggle as="div" className="btn-link i-false">
                                                                   {SVGICON.DropThreeDot}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="dropdown-menu-right">
                                                                    <Dropdown.Item>Edit</Dropdown.Item>
                                                                    <Dropdown.Item>Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
														</td>
													</tr>
                                                ))}
                                            </tbody>
                                        </table>        
                                    </div>    
                                </div>    
                            </div>    
                        </div> 
                        {cardChartBlog.map((item, index)=>(
                            <div className="col-xl-4 col-md-4" key={index}>
                                <div className="card sale-card">
                                    <div className="card-header pb-0 border-0 align-items-baseline">
                                        <div>
                                            <span>{item.title}</span>
                                            <h4>${item.number} <i className="fa-solid fa-arrow-trend-up ms-1"></i></h4>
                                        </div>
                                        <span className={`badge border-0 badge-${item.color}`}>3.5<i className="fa-solid fa-caret-up ms-1"></i></span>
                                    </div>
                                    <div className="card-body p-0 custome-tooltip">                                        
                                        <TotalSaleLineChart colorTheme={item.chartTheme}/>
                                    </div>
                                    <div className="card-footer border-0">
                                        <span className={`tag bg-${item.color}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                        </span>
                                    </div>	
                                </div>
                            </div>   
                        ))}
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0 chart-card">
                                    <div className="d-flex align-items-center">
                                        <img src={IMAGES.PieChart} alt="" />
                                        <div className="ms-2">
                                            <h4 className="mb-0">1,555k <small className="fs-12 text-success"><i className="fa-solid fa-arrow-trend-down mx-2"></i>(3.56)</small></h4>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-primary-light rounded-circle">
                                            <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M32.8961 26.5849C34.1612 26.5849 35.223 27.629 35.0296 28.8783C33.8947 36.2283 27.6026 41.6855 20.0138 41.6855C11.6178 41.6855 4.8125 34.8803 4.8125 26.4862C4.8125 19.5704 10.0664 13.1283 15.9816 11.6717C17.2526 11.3579 18.5553 12.252 18.5553 13.5605C18.5553 22.4263 18.8533 24.7197 20.5368 25.9671C22.2204 27.2145 24.2 26.5849 32.8961 26.5849Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.1733 19.2019C41.2739 13.5059 34.2772 4.32428 25.7509 4.48217C25.0877 4.49402 24.5568 5.04665 24.5272 5.70783C24.3121 10.3914 24.6022 16.4605 24.764 19.2118C24.8134 20.0684 25.4864 20.7414 26.341 20.7907C29.1693 20.9526 35.4594 21.1736 40.0759 20.4749C40.7035 20.3802 41.1634 19.8355 41.1733 19.2019Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                        <div className="ms-2">
                                            <h4 className="mb-0">1,5832k <small className="fs-12 text-success"><i className="fa-solid fa-arrow-trend-up mx-2"></i>(5.66)</small></h4>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-secondary-light rounded-circle">
                                            <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9717 41.0539C22.9717 41.0539 37.3567 36.6983 37.3567 24.6908C37.3567 12.6814 37.878 11.7439 36.723 10.5889C35.5699 9.43391 24.858 5.69891 22.9717 5.69891C21.0855 5.69891 10.3736 9.43391 9.21863 10.5889C8.0655 11.7439 8.58675 12.6814 8.58675 24.6908C8.58675 36.6983 22.9717 41.0539 22.9717 41.0539Z" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M26.4945 26.4642L19.4482 19.4179" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M19.4487 26.4642L26.495 19.4179" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                        <div className="ms-2">
                                            <h4 className="mb-0">5:22:23<small className="fs-12 text-success"><i className="fa-solid fa-arrow-trend-down mx-2"></i>(3.56)</small></h4>
                                            <span>Total Time</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   

                </div>   
                <div className="col-xl-4">
                    <div className="row">
                        <div className="col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="icon-box bg-primary-light rounded-circle">
                                            <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M32.8961 26.5849C34.1612 26.5849 35.223 27.629 35.0296 28.8783C33.8947 36.2283 27.6026 41.6855 20.0138 41.6855C11.6178 41.6855 4.8125 34.8803 4.8125 26.4862C4.8125 19.5704 10.0664 13.1283 15.9816 11.6717C17.2526 11.3579 18.5553 12.252 18.5553 13.5605C18.5553 22.4263 18.8533 24.7197 20.5368 25.9671C22.2204 27.2145 24.2 26.5849 32.8961 26.5849Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.1733 19.2019C41.2739 13.5059 34.2772 4.32428 25.7509 4.48217C25.0877 4.49402 24.5568 5.04665 24.5272 5.70783C24.3121 10.3914 24.6022 16.4605 24.764 19.2118C24.8134 20.0684 25.4864 20.7414 26.341 20.7907C29.1693 20.9526 35.4594 21.1736 40.0759 20.4749C40.7035 20.3802 41.1634 19.8355 41.1733 19.2019Z" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                        <div className="total-projects">
                                            <h4 className="text-primary count">67%</h4> 
                                            <span className="d-block">Free Hours</span>
                                            <small>56% average</small>
                                        </div>
                                    </div>                                    
                                    <ActiveUserChart />
                                    
                                </div>
                            </div>
                        
                        </div> 
                        <div className='col-xl-6 col-sm-6'>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="icon-box bg-secondary-light rounded-circle">
                                            <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9717 41.0539C22.9717 41.0539 37.3567 36.6983 37.3567 24.6908C37.3567 12.6814 37.878 11.7439 36.723 10.5889C35.5699 9.43391 24.858 5.69891 22.9717 5.69891C21.0855 5.69891 10.3736 9.43391 9.21863 10.5889C8.0655 11.7439 8.58675 12.6814 8.58675 24.6908C8.58675 36.6983 22.9717 41.0539 22.9717 41.0539Z" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M26.4945 26.4642L19.4482 19.4179" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M19.4487 26.4642L26.495 19.4179" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                        <div className="total-projects">
                                            <h4 className="text-secondary count">57%</h4> 
                                            <span className="d-block">Productiveness</span>
                                            <small>61% average</small>
                                        </div>
                                    </div>
                                    <ActiveUserChart2 />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="heading mb-0">Sales figures</h4>
                                    <h4 className="heading mb-0 text-success">$3,85k</h4>
                                </div>
                                <div className="card-body p-0">
                                    <SalesFigureChart />
                                    <div>
                                        <div className="table-responsive active-projects task-table">
                                            <table id="empoloyeestbl3" className="table market-update">
                                                <thead>
                                                    <tr>
                                                        <th>App Name</th>
                                                        <th>Date</th>
                                                        <th>Budget</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {salesTable.map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <img src={item.image} className="avatar avatar-lg" alt="" />
                                                                    <div className="ms-2 dr-data">
                                                                        <h6 className="mb-0">{item.title}</h6>
                                                                        <span>{item.subtitle}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{item.date}</td>
                                                            <td>${item.budget}k</td>
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
                </div>    

            </div>    
        </div>    
    );
};

export default Dashboard4;