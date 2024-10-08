import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';

const tableData = [
    {name:'Marketing Revenue', date:'April 18, 2023', payouts:'4528.68', status:'Completed', statuscolor:'info', action:'Action', },
    {name:'Brian Market', date:'July 13, 2023', payouts:'1238.50', status:'Inprogress', statuscolor:'primary', action:'Action', },
    {name:'David Market', date:'May 30, 2023', payouts:'3210.52', status:'Pending', statuscolor:'danger', action:'Action', },
    {name:'Edwar Market', date:'June 15, 2023', payouts:'4125.50', status:'Completed', statuscolor:'info', action:'Action', },
    {name:'Donald Revenue', date:'August 10, 2023', payouts:'6541.10', status:'Inprogress', statuscolor:'primary', action:'Action', },
    {name:'Edward Market', date:'July 28, 2023', payouts:'3214.25', status:'Pending', statuscolor:'danger', action:'Action', },
    {name:'Brian Market', date:'July 13, 2023', payouts:'1238.50', status:'Inprogress', statuscolor:'primary', action:'Action', },
    {name:'David Market', date:'May 30, 2023', payouts:'3210.52', status:'Pending', statuscolor:'danger', action:'Action', },
    {name:'David Market', date:'May 30, 2023', payouts:'3210.52', status:'Pending', statuscolor:'danger', action:'Action', },
    {name:'Edwar Market', date:'June 15, 2023', payouts:'4125.50', status:'Completed', statuscolor:'info', action:'Action', },
];

const headersTitle = [
    {label:'Market Places', key:'name'}, 
    {label:'Date', key:'date'}, 
    {label:'Payouts', key:'payouts'}, 
    {label:'Status', key:'status'}, 
    {label:'Action', key:'action'}, 
]

const csvlink = {
    headers : headersTitle,
    data : tableData,
    filename: "csvfile.csv"
}

const RevenueHistoryTable = () => {
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
        <div className="card">
            <div className="card-body p-0">
                <div className="table-responsive active-projects style-1">
                    <div className="tbl-caption">
                        <h4 className="heading mb-0">Revenue History</h4>
                        <div>
                            <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> 
                        </div>
                    </div>
                    <div id="revenue-tbl" className="dataTables_wrapper no-footer">
                        <table id="empoloyees-tbl3" className="table  mb-2 mb-sm-0">
                            <thead>
                                <tr>
                                    <th>Marketplaces</th>
                                    <th>Date</th>
                                    <th>Payouts</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((item, ind)=>(
                                    <tr key={ind}>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                        <td>${item.payouts}</td>
                                        <td><span className={`badge border-0 badge-${item.statuscolor}`}>{item.status}</span></td>
                                        <td className="edit-action">
                                            <div className="icon-box icon-box-xs bg-primary me-1">
                                                <i className="fa-solid fa-pencil text-white"></i>
                                            </div>
                                            <div className="icon-box icon-box-xs bg-danger  ms-1">
                                                <i className="fa-solid fa-trash text-white"></i>
                                            </div>
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
    );
};

export default RevenueHistoryTable;