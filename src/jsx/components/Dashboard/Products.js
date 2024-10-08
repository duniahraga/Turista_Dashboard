import React from 'react';
import {Link} from 'react-router-dom';

import ProductSellerTable from './elements/ProductSellerTable';
import { IMAGES } from '../../constant/theme';

const iconBoxCard = [
    {icon:'fa-solid fa-briefcase', bg:'success', number:'200+', title:'Total Projects'},
    {icon:'fa-solid fa-cart-shopping', bg:'primary', number:'1560', title:'Total Orders'},
    {icon:'fa-solid fa-users ', bg:'secondary', number:'400', title:'Total User'},
    {icon:'fa-solid fa-hand-holding-dollar', bg:'danger', number:'$1500', title:'Total Sales'},
];

const sourceTable = [
    {icon:'fa-brands fa-google', name:'Google', visit:'25,655', page:'1,255', revenue:'9555', trend:'60%', bg:'secondary'},
    {icon:'fa-brands fa-linkedin-in', name:'Linkedin', visit:'55,655', page:'3,100', revenue:'8855', trend:'30%', bg:'info'},
    {icon:'fa-brands fa-facebook-f', name:'Facebook', visit:'25,255', page:'1,205', revenue:'1955', trend:'50%', bg:'primary'},
    {icon:'fa-brands fa-instagram', name:'Daniel Arran', visit:'42,655', page:'2,999', revenue:'9855', trend:'80%', bg:'secondary'},
    {icon:'fa-brands fa-linkedin-in', name:'Linkedin', visit:'55,655', page:'3,100', revenue:'8855', trend:'30%', bg:'info'},
];

const newproductList = [
    {name:'Air Conditioner', image: IMAGES.ac, price:'999'},
    {name:'Bag Pack', image: IMAGES.beg, price:'101'},
    {name:'Dress', image: IMAGES.dress, price:'235'},
    {name:'Jacket', image: IMAGES.jacket, price:'456'},
    {name:'Air Conditioner', image:IMAGES.ac, price:'999'},
];
const topsellinglist = [
    {name:'Air Conditioner', image: IMAGES.ac, price:'999', sold:'55', revenue:'5,956'},
    {name:'Bag Pack', image: IMAGES.beg, price:'101', sold:'485', revenue:'3,156'},
    {name:'Dress', image: IMAGES.dress, price:'235', sold:'1200', revenue:'4,654'},
    {name:'Jacket', image: IMAGES.jacket, price:'456', sold:'301', revenue:'2,923'},
    {name:'Air Conditioner', image:IMAGES.ac, price:'999', sold:'236', revenue:'1,956'},
];

const Products = () => {
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">
                        {iconBoxCard.map((item, index)=>(
                            <div className="col-xl-3 col-sm-6" key={index}>
                                <div className="card box-hover">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className={`icon-box icon-box-lg bg-${item.bg}-light rounded`}>
                                                <i className={`${item.icon} text-${item.bg}`}></i>
                                            </div>
                                            <div className="total-projects ms-3">
                                                <h3 className={`text-${item.bg} count`}>{item.number}</h3> 
                                                <span>{item.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-xl-6">		
                            <div className="card">
                                <div className="card-body p-0">
                                    <ProductSellerTable />          
                                </div>            
                            </div>            
                        </div>  
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h4 className="heading mb-0">Source of Revenue Generat</h4>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive active-projects">
                                        <table id="projects-tbl3" className="table">
                                            <thead>
                                                <tr>
                                                    <th>SOURCE</th>
                                                    <th>VISITORS</th>
                                                    <th>PAGE VIEW</th>
                                                    <th>REVENUE</th>
                                                    <th>TRENDING</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sourceTable.map((item, ind)=>(
                                                    <tr key={ind}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className={`icon-box icon-box-sm bg-${item.bg}`}>
                                                                    <i className={` ${item.icon} text-white`} />
                                                                </div>
                                                                <p className="mb-0 ms-2 font-w500">{item.name}</p>	
                                                            </div>
                                                        </td>	
                                                        <td>{item.visit}</td>
                                                        <td>{item.page}</td>
                                                        <td>${item.revenue}</td>
                                                        <td>
                                                            <div className="progress">
                                                                <div className={`progress-bar bg-${item.bg}`} style={{width:item.trend, height:'5px', borderRadius:"4px"}}></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>   
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h4 className="heading mb-0">New Product</h4>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive active-projects">
                                        <table id="projects-tbl4" className="table">
                                            <thead>
                                                <tr>
                                                    <th>PRDUCTS NAME</th>
                                                    <th>PRICE</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {newproductList.map((item, ind)=>(
                                                    <tr key={ind}>
                                                        <td>
                                                            <div className="products">
                                                                <img src={item.image} className="avatar avatar-sm" alt="" />
                                                                <div>
                                                                    <h6><Link to={"#"}>{item.name}</Link></h6>
                                                                    <span>24 Apr 2021</span>	
                                                                </div>	
                                                            </div>
                                                        </td>	
                                                        <td>${item.price}</td>
                                                    </tr>  
                                                ))}
                                            </tbody>     
                                        </table>
                                    </div>    
                                </div>    
                            </div>    
                        </div>    
                        <div className="col-xl-8">
                                <div className="card">
									<div className="card-header border-0">
										<h4 className="heading mb-0">Top Selling Products</h4>
									</div>
									<div className="card-body p-0">
										<div className="table-responsive active-projects">
											<table id="projects-tbl2" className="table">
												<thead>
													<tr>
														<th>PRDUCTS NAME</th>
														<th>PRICE</th>
														<th>SOLD</th>
														<th>REVENUE</th>
														
													</tr>
												</thead>
												<tbody>
                                                    {topsellinglist.map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td>
                                                                <div className="products">
                                                                    <img src={item.image} className="avatar avatar-sm" alt="" />
                                                                    <div>
                                                                        <h6><Link to={"#"}>{item.name}</Link></h6>
                                                                        <span>24 Apr 2021</span>	
                                                                    </div>	
                                                                </div>
                                                            </td>	
                                                            <td>${item.price}</td>
                                                            <td>{item.sold}</td>
                                                            <td>${item.revenue}</td>
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
    );
};

export default Products;
