import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
    Sparklines,SparklinesLine   
  } from "react-sparklines";                      
import { IMAGES, SVGICON } from '../../constant/theme';

const tableDataBlog = [
    {image:IMAGES.osimg1, color:'#3A9B94', name:"Jobick", rate:'2.8',  subtitle:'Admin', price:'19', status:'Completed', badge:'success'},
    {image:IMAGES.osimg2, color:'#FF5E5E', name:"Winkit", rate:'3.5', subtitle:'Front-End', price:'45', status:'Inprogress', badge:'primary'},
    {image:IMAGES.osimg3, color:'#FF5E5E', name:"W3CRM", rate:'4.9', subtitle:'Admin', price:'78', status:'Completed', badge:'success'},
    {image:IMAGES.osimg5, color:'#452b90', name:"JobZilla", rate:'1.7', subtitle:'WordPress', price:'32', status:'Inprogress', badge:'primary'}
];
const Data = [8,4,5,9,5,3,5,7,5];

const Dashboard2Project = () => {
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="heading mb-0">Projects</h4>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table  card-table border-no success-tbl">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Price</th>
                                <th>Groth</th>
                                <th>Chart</th>
                                <th>status</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataBlog.map((item, ind)=>(
                                <tr key={ind}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={item.image} className="avatar avatar-xl" alt="" />
                                            <div className="ms-2 cat-name">
                                                <p className="mb-0">{item.name}</p>	
                                                <span>{item.subtitle}</span>
                                            </div>	
                                        </div>
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Sparklines data={Data} className="peity-line2">
                                                <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                            </Sparklines>
                                        </div>	
                                    </td>
                                    <td><span className={`badge border-0 badge-${item.badge}`}><i className="fa-solid fa-arrow-up me-1"></i>{item.rate}</span></td>
                                    <td><span className={`badge light border-0 badge-${item.badge}`}>{item.status}</span></td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="btn-link i-false" >
                                                {SVGICON.DropThreeDot}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end">
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
    );
};

export default Dashboard2Project;