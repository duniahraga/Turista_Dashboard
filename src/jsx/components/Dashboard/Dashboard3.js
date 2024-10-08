import React from 'react';
import { SVGICON } from '../../constant/theme';
import SocialNetworkRadialChart from './elements/SocialNetworkRadialChart';
import ProjectOverviewTab from './elements/ProjectOverviewTab';
import ActiveProjects from './elements/ActiveProjects';
import RevenueHistoryTable from './elements/RevenueHistoryTable';

const cardBlog = [
    {svg:SVGICON.UserSvgGreen, number:'5,652', title:'Total Completed', changetheme:'success'},
    {svg:SVGICON.CardProgress, number:'585', title:'Total In Progress', changetheme:'primary'},
    {svg:SVGICON.ShiledPrimary, number:'5,282', title:'Total Not Started', changetheme:'purple'},
    {svg:SVGICON.UserThree, number:'123', title:'Total In Cancel', changetheme:'danger'},
];

const smallCard = [
    {title:'Target', price:'55', icon:'up', color:'success'},
    {title:'Last week', price:'15', icon:'down', color:'danger'},
    {title:'Last Year', price:'85', icon:'up', color:'success'},
];

const Dashboard3 = () => {
    return (
        <>
          <div className="container-fluid">
				<div className="row">
                    {cardBlog.map((item, ind)=>(
                        <div className="col-xl-3 col-sm-6" key={ind}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className={`icon-box icon-box-lg rounded-circle bg-${item.changetheme}-light`} >
                                            {item.svg}               
                                        </div>
                                        <div className="total-projects ms-3">
                                            <h3 className={`count text-${item.changetheme}`}>{item.number}k</h3> 
                                            <span>{item.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-xl-4 col-lg-5">
						<div className="card">
							<div className="card-header border-0">
								<h4 className="heading mb-0">Social Networking</h4>
							</div>
							<div className="card-body py-0">								
                                 <SocialNetworkRadialChart />
								<div className="text-center">
									<h5 className="mb-0">Total sales made week</h5>
									<h4>$86</h4>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
								</div>
								<div className="row">
                                    {smallCard.map((item, ind)=>(
                                        <div className="col-xl-4 col-lg-4 col-sm-4 tg-base" key={ind}>
                                            <div className="card text-center">
                                                <div className="card-body p-2">
                                                    <span className="mb-1 d-block">{item.title}</span>
                                                    <h4 className="mb-0">
                                                        <i className={`fa-solid me-1 fa-arrow-${item.icon} text-${item.color}`}></i>${item.price}k
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
									
								</div>
							</div>
						</div>
					</div>
                    <div className="col-xl-8 col-lg-7">
                        <ProjectOverviewTab height={350} />
                    </div>
                    <div className="col-xl-6">
                        <ActiveProjects />
                    </div>
                    <div className="col-xl-6">
                        <RevenueHistoryTable />
                    </div>
                </div>

            </div>          
        </>
    );
};

export default Dashboard3;