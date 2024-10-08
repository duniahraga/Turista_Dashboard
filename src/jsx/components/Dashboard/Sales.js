import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import SalesActiveBar from './elements/SalesActiveBar';
import SalesAvgArea from './elements/SalesAvgArea';
import ActiveSubscriptions from './elements/ActiveSubscriptions';
import SalesOverviewBar from './elements/SalesOverviewBar';
import { IMAGES } from '../../constant/theme';

const coloumnBlog = [
    {title:'Avg Subscriptions', subtitle:'month', charts: <SalesAvgArea />,  bg:'primary'},
    {title:'Active Subscriptions', subtitle:'week', charts:  <ActiveSubscriptions />, bg:'secondary'},
];

const activityBlog = [
    {image:IMAGES.contact1, title:'Blanca Schultz requested to Widthdrawl.', hours:'2'},
    {image:IMAGES.contact2, title:'Hanuman transfer to Money.', hours:'4'},
    {image:IMAGES.contact6, title:'Subham Place Order.', hours:'6'},
    {image:IMAGES.contact2, title:'Hanuman transfer to Money.', hours:'4'},
    {image:IMAGES.contact1, title:'Blanca Schultz requested to Widthdrawl.', hours:'2'},
    {image:IMAGES.contact6, title:'Subham Place Order.', hours:'6'},
];


const tableData = [
    {id:'00001', image:IMAGES.contact1, name:'Liam Risher', date:'2 May 2023', ref:'HA-10133',amount:'5,522',status:'Pending', color:'danger'},
    {id:'00501', image:IMAGES.contact2, name:'William Risher', date:'3 June 2023', ref:'HA-12133',amount:'1,022',status:'Success', color:'success'},
    {id:'00101', image:IMAGES.contact6, name:'Donald Benjamin', date:'4 March 2023', ref:'HA-20033',amount:'3,123',status:'Pending', color:'danger'},
    {id:'00701', image:IMAGES.contact5, name:'Elijah James', date:'7 July 2023', ref:'HA-51500',amount:'4,022',status:'Inprogress', color:'primary'},
    {id:'00801', image:IMAGES.contact1, name:'Liam Risher', date:'3 Feb 2023', ref:'HA-22533',amount:'1,077',status:'Success', color:'success'},    
    {id:'01501', image:IMAGES.contact2, name:'William Risher', date:'3 June 2023', ref:'HA-12133',amount:'1,022',status:'Success', color:'success'},
    {id:'01401', image:IMAGES.contact1, name:'Liam Risher', date:'2 May 2023', ref:'HA-10133',amount:'5,522',status:'Pending', color:'danger'},
    {id:'01301', image:IMAGES.contact5, name:'Elijah James', date:'7 July 2023', ref:'HA-51500',amount:'4,022',status:'Inprogress', color:'primary'},
    {id:'01101', image:IMAGES.contact1, name:'Liam Risher', date:'3 Feb 2023', ref:'HA-22533',amount:'1,077',status:'Success', color:'success'},    
    {id:'01201', image:IMAGES.contact6, name:'Donald Benjamin', date:'4 March 2023', ref:'HA-20033',amount:'3,123',status:'Pending', color:'danger'},
];

const headersTitle = [
    {label:'Seller Name', key:'title'}, 
    {label:'Product', key:'product'}, 
    {label:'Company', key:'company'}, 
    {label:'Status', key:'status'}, 
    {label:'Theme', key:'color'}, 
]

const csvlink = {
    headers : headersTitle,
    data : tableData,
    filename: "csvfile.csv"
}

const Sales = () => {

    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 5;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableData.length / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)
    function prePage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-6">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <div>
                                        <h4 className="heading mb-0">Active Projects</h4>
                                        <span>In last 30 days revenue from subscription.</span>
                                    </div>
                                </div>
                                <div className="card-body pb-0 pe-2 pt-0 custome-tooltip">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div>
                                            <h4>15,369.59</h4>
                                            <span className="text-danger">
                                                <i className="fa-solid fa-arrow-down"></i>
                                                % 52.36 <small className="text-black">This Week</small>
                                            </span>
                                        </div>
                                        <div>
                                            <h4>3,269.89</h4>
                                            <span className="text-success">
                                                <i className="fa-solid fa-arrow-up"></i>
                                                % 15.36 <small className="text-black">This month</small>
                                            </span>
                                        </div>                                        
                                        <SalesActiveBar />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            coloumnBlog.map((item, ind)=>(
                                <div className="col-xl-6 col-sm-6" key={ind}>
                                    <div className="card overflow-hidden">
                                        <div className="card-header border-0">
                                            <h4 className="heading mb-0">Avg Subscriptions</h4>
                                        </div>
                                        <div className="card-body d-flex justify-content-between pb-0 pe-0 pt-0">
                                            <div>
                                                <h4>15,369.59</h4>
                                                <span className={`text-${item.bg}`}>
                                                    <i className="fa-solid fa-arrow-down" /> {" "}
                                                    % 52.36 <small className="text-black">since last month</small>
                                                </span>
                                            </div>                                    
                                            {item.charts}                                           
                                        </div>
                                    </div>
                                </div>
                            ))
                        }                        
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-header border-0">
                            <div>
                                <h4 className="heading mb-0">Sales Overview</h4>
                                <span>In 30 days sales of product subscription. <Link to={"#"} className="text-primary">See Details</Link></span>
                            </div>
                        </div>
                        <div className="card-body pt-0 custome-tooltip">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>$55,5252</h4>
                                <span>500 Followers</span>
                            </div>                            
                            <SalesOverviewBar />                            
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="table-responsive active-projects style-1">
                                <div className="tbl-caption">
                                    <h4 className="heading mb-0">Transaction</h4>
                                    <div>
                                        <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> 
                                    </div>
                                </div>
                                <div id="transtion-seller" className="dataTables_wrapper no-footer">
                                    <table id="projects-tbl" className="table mb-sm-0 mb-2">
                                        <thead>
                                            <tr>
                                                <th>Order No.</th>
                                                <th>Customer</th>
                                                <th>Date</th>
                                                <th>Ref</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((item, ind)=>(
                                                <tr key={ind}>
                                                    <td className="text-primary">#{item.id}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img src={item.image} className="avatar avatar-md rounded-circle" alt=""/>
                                                            <p className="mb-0 ms-2">{item.name}</p>	
                                                        </div>
                                                    </td>
                                                    <td>{item.date}</td>
                                                    <td className="text-primary">{item.ref}</td>
                                                    <td >${item.amount}</td>
                                                    <td>
                                                        <span className={`badge light border-0 badge-${item.color}`}>{item.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody> 
                                    </table> 
                                    <div className="d-sm-flex text-center justify-content-between align-items-center">                    
                                        <div className='dataTables_info'>
                                            Showing {lastIndex-recordsPage + 1} to{" "}
                                            {lastIndex} 
                                            {" "}of {tableData.length} entries
                                        </div>
                                        <div
                                            className="dataTables_paginate paging_simple_numbers justify-content-center"
                                            id="example2_paginate"
                                        >
                                            <Link
                                                className="paginate_button previous disabled"
                                                to="#"                                        
                                                onClick={prePage}
                                            >
                                                <i className="fa-solid fa-angle-left" />
                                            </Link>
                                            <span>                                      
                                                {number.map((n , i )=>(
                                                    <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                        onClick={()=>changeCPage(n)}
                                                    > 
                                                        {n}                                                

                                                    </Link>
                                                ))}
                                            </span>
                                            <Link
                                                className="paginate_button next"
                                                to="#"                                        
                                                onClick={nextPage}
                                            >
                                                <i className="fa-solid fa-angle-right" />
                                            </Link>
                                        </div>
                                    </div> 
                                </div> 
                            </div>   
                        </div>   
                    </div>   
                </div>
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="heading mb-0">Recent Activities</h4>
                        </div>
                        <div className="card-body pt-0 px-0">
                            <ul className="recent-app">
                                {activityBlog.map((item, ind)=>(
                                    <li key={ind}>
                                        <img src={item.image} className="avatar avatar-md rounded-circle" alt="" />
                                        <div>
                                            <h5>{item.title}</h5>
                                            <span>{item.hours} Hourse Ago</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>    
        </div>    
    );
};

export default Sales;