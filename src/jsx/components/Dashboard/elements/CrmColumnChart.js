import React from "react";
import ReactApexChart from "react-apexcharts";

class CrmColumnChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [{
				name: 'Sent',
				data: [40, 55, 15,40]
			}, {
				name: 'Answered',
				data: [55, 55, 35,60]
			}, {
				name: 'Hired',
				data: [20, 17, 55, 45]
			}],
			options: {
				chart: {
					type: 'bar',
					height: 160,
					stacked: true,
					toolbar: {
						show: false,
					}
				},
				plotOptions: {
					bar: {						
                        horizontal: false,
                        columnWidth: '30%',                        
                        endingShape: "rounded",
                        startingShape: "rounded",
                        backgroundRadius: 10,
                        colors: {
                            backgroundBarColor: '#fff',
                            backgroundBarOpacity: 1,
                            backgroundBarRadius: 10,
                        },
					},
				},
				colors:['#FEC64F', 'var(--secondary)', '#DBDBDB'],
				stroke: {
					width: 5,
					colors: ['#fff'],					
				},
				xaxis: {
					show: false,
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					labels: {
                        show: false,	
						style: {
							colors: '#828282',
                            fontSize: '14px',
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            cssClass: 'apexcharts-xaxis-label',
						},
					},
					crosshairs: {
						show: false,
					},					
				},
				yaxis: {
					show: false,
					axisBorder: {
						show: false,
					},
					labels: {
						offsetX: -8,
						style: {
							colors: '#333',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 300,
							cssClass: 'apexcharts-yaxis-label',
						},
					},
					crosshairs: {
						show: false,
					},
				},
				grid: {
                    show: false,
                    borderColor: '#DBDBDB',
                    strokeDashArray: 10,
                    position: 'back',
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },   
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },  
                },
				toolbar: {
					enabled: false,
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: false,					
				},
				fill: {
					opacity: 1
				},
				responsive: [{
					breakpoint: 1601,
					options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '60%',
                            },
                            
                        },
                    },
				}],				
			}, 
		};
	}

	render() {
		return (
			<div id="columnChart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="bar"
				  height={160} 
				  
				/>
			</div>
		);
	}
}

export default CrmColumnChart;