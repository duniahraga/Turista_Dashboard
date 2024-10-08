import React from "react";
import ReactApexChart from "react-apexcharts";

class AnalyticsEarning extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [{
				name: "Earning",
				data: [15, 10, 20, 8, 12, 18, 12, 5,18, 12, 5]
			},
            {
				name: "Expense",
				data: [-7, -10, -7, -12, -6, -9, -5, -8,-9, -5, -8]
			}],
			options: {
				chart: {
					type: 'bar',
					height: 150,
					stacked: true,
					toolbar: {
						show: false,
					}
				},
				plotOptions: {
					bar: {
                        horizontal: !1,
                        columnWidth: "25%",
                        borderRadius: 5,
                        endingShape: "rounded",
                        startingShape: "rounded",
                    }
				},
				colors:['var(--secondary)', 'var(--primary)', '#58bad7'],
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
					labels: {
                        style: {
                            colors: '#828282',
                            fontSize: '14px',
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    },					
				},
				grid: {
                    show: !1,
                    padding: {
                        top: -40,
                        bottom: -20,
                        left: -10,
                        right: -2
                    }
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
			<div id="TotalEarning">
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

export default AnalyticsEarning;