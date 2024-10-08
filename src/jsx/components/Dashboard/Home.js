import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import Rain from './../../../images/rainbow.gif';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { IMAGES, SVGICON } from '../../constant/theme';

import ProjectOverviewTab from './elements/ProjectOverviewTab';
import ToDoList from './elements/ToDoList';
import ActiveProjects from './elements/ActiveProjects';
import UpcomingBlog from './elements/UpcomingBlog';
import AllProjectBlog from './elements/AllProjectBlog';
import CrmColumnChart from './elements/CrmColumnChart';
import DounutProject from './elements/DounutProject';
import AddVisitorLine from './elements/AddVisitorLine';
import TrafficBarChart from './elements/TrafficBarChart';
import SalesAvgArea from './elements/SalesAvgArea';
import ActiveSubscriptions from './elements/ActiveSubscriptions';
import Dashboard2Project from './Dashboard2Project';
import TrafficDonutChart from './elements/TrafficDonutChart';
import SalesStatisticsArea from './elements/SalesStatisticsArea';

const RevenueChart = loadable(() =>
	pMinDelay(import("./elements/RevenueChart"), 1000)
);
const ExpensesBarChart = loadable(() =>
	pMinDelay(import("./elements/ExpensesBarChart"), 1000)
);
const TotalDeposit = loadable(() =>
	pMinDelay(import("./elements/TotalDeposit"), 1000)
);
const MyProgressChart = loadable(() =>
	pMinDelay(import("./elements/MyProgressChart"), 1000)
);
const chartCardBlog = [
	{ title: 'Add Visitors', svg: SVGICON.VisitorPerson, number: '3,569', chartTheme: 'var(--primary)', cardColor: 'primary' },
	{ title: 'Sessions Start', svg: SVGICON.Watch, number: '8:30 PM', chartTheme: 'var(--secondary)', cardColor: 'secondary' },
	{ title: 'Total Live', svg: SVGICON.LivePerson, number: '4,187', chartTheme: '#58bad7', cardColor: 'info' },
];

const coloumnBlog = [
	{ title: 'Empty Chalets', subtitle: 'month', charts: <SalesAvgArea />, bg: 'primary' },
	{ title: 'Avilabel Chalets', subtitle: 'week', charts: <ActiveSubscriptions />, bg: 'secondary' },
];
const groupBlog = [
    {title:'React'},
    {title:'Css'},
    {title:'Scss'},
    {title:'C++'},
    {title:'JavaScript'},
];
const salesblog = [
    {title:'Orders', subtitle:'3,123'},
    {title:'Month', subtitle:'4,248'},
    {title:'Year', subtitle:'7,654'},
    {title:'Profit', subtitle:'2,545'},
];
const Home = () => {
	const { changeBackground } = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					
						<div className="col-xl-12">
							<div className="row">
								{
									coloumnBlog.map((item, ind) => (
										<div className="col-xl-4 col-sm-4" key={ind}>
											<div className="card overflow-hidden">
												<div className="card-header border-0">
													<h4 className="heading mb-0">{item.title}    </h4>
												</div>
												<div className="card-body d-flex justify-content-between pb-0 pe-0 pt-0">
													<div>
														<h3>10</h3>
														<span className={`text-${item.bg}`}>
															<i className="fa-solid fa-arrow-down" /> {" "}
															<h4> % 5.3</h4>  <small className="text-black"></small>
														</span>
													</div>
													{item.charts}
												</div>
											</div>
										</div>
									))
								}
								<div className="col-xl-7 col-xxl-4 col-sm-4">
									<div className="card crm-cart">
										<div className="card-header border-0 pb-0">
											<div>
												<h5 className="d-block">Total Chalets</h5>
												<h4 className="mb-0">15<small className="text-success ms-2"></small></h4>
											</div>
										</div>

										<div className="card-body d-flex justify-content-center pt-2">
											<div id="AllProject" className="ms-0">
												<DounutProject />
											</div>

										</div>
									</div>
								</div>



							</div>
						</div>
					


					<div className="col-xl-8">
						<div className="card">
							<div className="card-header border-0">
								<h4 className="heading mb-0">Booking Update</h4>
							</div>
							<div className="card-body py-0 custome-tooltip">
								<div className="row">
									{chartCardBlog.map((item, ind) => (
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
													<AddVisitorLine colorTheme={item.chartTheme} />
												</div>
											</div>
										</div>
									))}
								</div>
								<TrafficBarChart />
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
					<div className="col-xl-4  col-xxl-4 col-lg-5">
						<div className="row">
							<div className="col-xl-12">
								<UpcomingBlog />
							</div>
							<div className="col-xl-12">
								<AllProjectBlog />
							</div>
						</div>
					</div>


					<div className="col-xl-12">
						<Dashboard2Project />
					
					</div>
					
					
				</div>


				
			</div>
		</>
	)
}
export default Home;