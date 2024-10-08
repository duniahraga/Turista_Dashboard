import React from 'react';
import {Tab, Nav, Dropdown} from 'react-bootstrap';
import { IMAGES, SVGICON } from '../../../constant/theme';
import {
    Sparklines,SparklinesLine   
  } from "react-sparklines";

const tableData = [
    { color:'#FF5E5E', image: IMAGES.contact1, name:'Liam Risher', subtitle:'Span', avg:'66.99', view:'78.89', status:'Inprogress', badge:'primary'},
    { color:'#3A9B94', image: IMAGES.contact2, name:'Oliver Noah', subtitle:'USA', avg:'78.89', view:'59.87', status:'Completed', badge:'success'},
    { color:'#452b90', image: IMAGES.contact8, name:'Elijah James', subtitle:'NYC', avg:'59.87', view:'66.99', status:'Inprogress', badge:'primary'},
    { color:'#FF5E5E', image: IMAGES.contact3, name:'Oliver Noah', subtitle:'USA', avg:'72.89', view:'78.89', status:'Completed', badge:'success'},
];

const tableData2 = [
    { color:'#3A9B94', image: IMAGES.contact2, name:'Oliver Noah', subtitle:'USA', avg:'78.89', view:'59.87', status:'Completed', badge:'success'},
    { color:'#FF5E5E', image: IMAGES.contact1, name:'Liam Risher', subtitle:'Span', avg:'66.99', view:'78.89', status:'Inprogress', badge:'primary'},
    { color:'#FF5E5E', image: IMAGES.contact3, name:'Oliver Noah', subtitle:'USA', avg:'72.89', view:'78.89', status:'Completed', badge:'success'},
    { color:'#452b90', image: IMAGES.contact8, name:'Elijah James', subtitle:'NYC', avg:'59.87', view:'66.99', status:'Inprogress', badge:'primary'},
];
const Data = [8,4,5,9,5,3,5,7,5];

const LiterarySuccess = () => {
    return (
        <div className="card">
            <div className="card-header border-0 pb-0 flex-wrap">
                <h4 className="heading mb-0">Literary success</h4>
            </div>
            <div className="card-body px-0 pb-0">
                <Tab.Container defaultActiveKey={'Social'}>
                    <Nav as="ul" className="nav nav-pills success-tab" id="pills-tab" role="tablist">
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Social'}>
                                {SVGICON.SocialHeart}
                                <span>Social</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Project'}>
                                {SVGICON.Folder}
                                <span>Project</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Sale'}>
                                {SVGICON.SaleChart}
                                <span>Sale</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'Mobile'}>
                                {SVGICON.Mobile}
                                <span>Mobile</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" >
                            <Nav.Link as="button" eventKey={'All'}>
                                {SVGICON.FolderHeart}
                                <span>All</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav> 
                    <Tab.Content>
                        <Tab.Pane eventKey={'Social'}>                                
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Avg.</th>
                                            <th>Groth</th>
                                            <th>View</th>
                                            <th>status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, ind)=>(
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={item.image} className="avatar avatar-xl" alt="" />
                                                        <div className="ms-2 cat-name">
                                                            <p className="mb-0">{item.name}</p>	
                                                            <span>{item.subtitle}</span>
                                                        </div>	
                                                    </div>
                                                </td>
                                                <td>{item.avg}%</td>
                                                <td>
                                                    <div className="d-flex align-items-center">                                                    
                                                        <Sparklines data={Data} className="peity-line2">
                                                            <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                        </Sparklines>
                                                    </div>	
                                                </td>
                                                <td>{item.view}%</td>
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
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Project'}>
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Avg.</th>
                                            <th>Groth</th>
                                            <th>View</th>
                                            <th>status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData2.map((item, ind)=>(
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
                                                <td>{item.avg}%</td>
                                                <td>
                                                    <div className="d-flex align-items-center">                                                    
                                                        <Sparklines data={Data} className="peity-line2">
                                                            <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                        </Sparklines>
                                                    </div>	
                                                </td>
                                                <td>{item.view}%</td>
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
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Sale'}>
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Avg.</th>
                                            <th>Groth</th>
                                            <th>View</th>
                                            <th>status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, ind)=>(
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={item.image} className="avatar avatar-xl" alt="" />
                                                        <div className="ms-2 cat-name">
                                                            <p className="mb-0">{item.name}</p>	
                                                            <span>{item.subtitle}</span>
                                                        </div>	
                                                    </div>
                                                </td>
                                                <td>{item.avg}%</td>
                                                <td>
                                                    <div className="d-flex align-items-center">                                                    
                                                        <Sparklines data={Data} className="peity-line2">
                                                            <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                        </Sparklines>
                                                    </div>	
                                                </td>
                                                <td>{item.view}%</td>
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
                        </Tab.Pane>
                        <Tab.Pane eventKey={'Mobile'}>
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Avg.</th>
                                            <th>Groth</th>
                                            <th>View</th>
                                            <th>status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData2.map((item, ind)=>(
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
                                                <td>{item.avg}%</td>
                                                <td>
                                                    <div className="d-flex align-items-center">                                                    
                                                        <Sparklines data={Data} className="peity-line2">
                                                            <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                        </Sparklines>
                                                    </div>	
                                                </td>
                                                <td>{item.view}%</td>
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
                        </Tab.Pane>
                        <Tab.Pane eventKey={'All'}>
                            <div className="table-responsive">
                                <table className="table  card-table border-no success-tbl">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Avg.</th>
                                            <th>Groth</th>
                                            <th>View</th>
                                            <th>status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, ind)=>(
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={item.image} className="avatar avatar-xl" alt="" />
                                                        <div className="ms-2 cat-name">
                                                            <p className="mb-0">{item.name}</p>	
                                                            <span>{item.subtitle}</span>
                                                        </div>	
                                                    </div>
                                                </td>
                                                <td>{item.avg}%</td>
                                                <td>
                                                    <div className="d-flex align-items-center">                                                    
                                                        <Sparklines data={Data} className="peity-line2">
                                                            <SparklinesLine color={item.color} style={{ strokeWidth: 8, stroke: item.color, fill: "none" }}/>                                                        
                                                        </Sparklines>
                                                    </div>	
                                                </td>
                                                <td>{item.view}%</td>
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
                        </Tab.Pane>
                    </Tab.Content>               
                </Tab.Container>
            </div>
         </div>   
    );
};

export default LiterarySuccess;