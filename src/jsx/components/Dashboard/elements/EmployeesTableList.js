import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { IMAGES } from '../../../constant/theme';
import InviteCustomer from '../../../constant/ModalList';
import EmployeeOffcanvas from '../../../constant/EmployeeOffcanvas';

const tableData = [
    {id: '1001', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Ricky Antony', email: 'ra@gmail.com', gender:'Female', location:'India', status:'Active'},    
    {id: '1002', image:IMAGES.contact2, contact:'+12 123 456 7890', title:'Ankites Risher', email: 'abc@gmail.com', gender:'Male', location:'Brazil', status:'Pending'},    
    {id: '1003', image:IMAGES.contact3, contact:'+12 123 456 7890', title:'Ricky M', email: 'pqr@gmail.com', gender:'Male', location:'France', status:'Inprogress'},    
    {id: '1004', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Elijah James', email: 'stuy@gmail.com', gender:'Female', location:'Dubai', status:'Active'},    
    {id: '1005', image:IMAGES.contact2, contact:'+12 123 456 7890', title:'Honey Risher', email: 'xyz@gmail.com', gender:'Male', location:'USA', status:'Pending'},    
    {id: '1006', image:IMAGES.contact2, contact:'+12 123 456 7890', title:'Honey Risher', email: 'xyz@gmail.com', gender:'Male', location:'USA', status:'Active'},    
    {id: '1007', image:IMAGES.contact2, contact:'+12 123 456 7890', title:'Ankites Risher', email: 'abc@gmail.com', gender:'Male', location:'Brazil', status:'Inprogress'},    
    {id: '1008', image:IMAGES.contact3, contact:'+12 123 456 7890', title:'Ricky M', email: 'pqr@gmail.com', gender:'Male', location:'France', status:'Pending'},    
    {id: '1009', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Ricky Antony', email: 'ra@gmail.com', gender:'Female', location:'India', status:'Active'},    
    {id: '1010', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Elijah James', email: 'stuy@gmail.com', gender:'Female', location:'Dubai', status:'Active'},   
    {id: '1011', image:IMAGES.contact2, contact:'+12 123 456 7890', title:'Ankites Risher', email: 'abc@gmail.com', gender:'Male', location:'Brazil', status:'Pending'},    
    {id: '1012', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Ricky Antony', email: 'ra@gmail.com', gender:'Female', location:'India', status:'Active'},    
    {id: '1013', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Elijah James', email: 'stuy@gmail.com', gender:'Female', location:'Dubai', status:'Inprogress'},    
    {id: '1014', image:IMAGES.contact3, contact:'+12 123 456 7890', title:'Ricky M', email: 'pqr@gmail.com', gender:'Male', location:'France', status:'Pending'},    
    {id: '1015', image:IMAGES.contact2, contact:'+12 123 456 7890', title:'Honey Risher', email: 'xyz@gmail.com', gender:'Male', location:'USA', status:'Active'},   
    {id: '1016', image:IMAGES.contact3, contact:'+12 123 456 7890', title:'Ricky M', email: 'pqr@gmail.com', gender:'Male', location:'France', status:'Pending'},    
    {id: '1017', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Ricky Antony', email: 'ra@gmail.com', gender:'Female', location:'India', status:'Active'},    
    {id: '1018', image:IMAGES.contact1, contact:'+12 123 456 7890', title:'Elijah James', email: 'stuy@gmail.com', gender:'Female', location:'Dubai', status:'Active'},    
];

const headersTitle = [
    {label:'Employee ID', key:'id'}, 
    {label:'Employee Name', key:'title'}, 
    {label:'Email Address', key:'email'}, 
    {label:'Contact Number', key:'contact'}, 
    {label:'Gender', key:'gender'}, 
    {label:'Location', key:'location'}, 
    {label:'Status', key:'status'}, 
]

const csvlink = {
    headers : headersTitle,
    data : tableData,
    filename: "csvfile.csv"
}

const EmployeesTableList = () => {
    const invite = useRef();
    const employe = useRef();

    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 6;
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
    const [checked, setChecked] = useState(records);
    const [unchecked, setUnChecked] = useState(true);
	const handleChecked = (id)=> {
        let temp = checked.map((data) => {
            if (id === data.id) {
                return { ...data, inputchecked: !data.inputchecked };
            }
            return data;
        });
        setChecked(temp);
    };
    const handleCheckedAll = (value)=> {
        let temp = checked.map((data) => {          
            return { ...data, inputchecked: value };   
        });
        setChecked(temp);
        setUnChecked(!unchecked);
    };
	
    return (
        <>
            <div className="card">            
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                        <div className="tbl-caption">
                            <h4 className="heading mb-0">Employees</h4>
                            <div>
                                <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> 
                                <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                   onClick={()=>employe.current.showEmployeModal()}
                                >+ Add Employee</Link> {" "}
                                <button type="button" className="btn btn-secondary btn-sm mt-1 mt-sm-0" 
                                    onClick={() => invite.current.showInviteModal()}
                                >+ Invite Employee
                                </button>
                            </div>
                        </div>          
                        <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                            <table id="projects-tbl" className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
                                <thead>
                                    <tr>
                                        <th className="sorting_asc_11" >
                                            <div className="form-check custom-checkbox ms-0">
                                                <input type="checkbox" className="form-check-input checkAllInput" required="" 
                                                    onClick={()=>handleCheckedAll(unchecked)}   
                                                />
                                                <label className="form-check-label" htmlFor="checkAll"></label>
                                            </div>
                                        </th>
                                        <th>Employee ID</th>
                                        <th>Employee Name</th>
                                        <th>Email Address</th>
                                        <th>Contact Number</th>
                                        <th>Gender</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checked.map((item, index)=>(
                                        <tr key={index}>
                                            <td className="sorting_20">
                                                <div className="form-check11custom-checkbox">
                                                    <input type="checkbox" className="form-check-input" 
                                                      id={`emply-${item.id}`}
                                                      checked={item.inputchecked}
                                                      onChange={()=>handleChecked(item.id)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`emply-${item.id}`}></label>
                                                </div>
                                            </td>
                                            <td><span>{item.id}</span></td>
                                            <td>
                                                <div className="products">
                                                    <img src={item.image} className="avatar avatar-md" alt="" />
                                                    <div>
                                                        <h6><Link to={"#"}>{item.title}</Link></h6>
                                                        <span>Web Designer</span>	
                                                    </div>	
                                                </div>
                                            </td>
                                            <td><Link to={"#"} className="text-primary">{item.email}</Link></td>
                                            <td>
                                                <span>{item.contact}</span>
                                            </td>
                                            <td>
                                                <span>{item.gender}</span>
                                            </td>	
                                            <td>
                                                <span>{item.location}</span>
                                            </td>
                                            <td>
                                                <span className=
                                                    {`badge badge-success light border-0 ${item.status === "Active" ? 'badge-succes': item.status === "Inprogress" ? 'badge-primary' : 'badge-danger' }`}
                                                >{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                    Showing {lastIndex-recordsPage + 1} to{" "}
                                    {tableData.length < lastIndex ? tableData.length : lastIndex}
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
            <EmployeeOffcanvas 
                ref={employe}
                Title="Add Employee"
            />
            <InviteCustomer
                ref={invite}     
                Title="Invite Employee"
            />
        
        </>
    );
};


export default EmployeesTableList;