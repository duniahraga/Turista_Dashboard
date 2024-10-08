import React from "react";
import ReactApexChart from "react-apexcharts";

class SocialNetworkRadialChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [75],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: 0,
                // width: 220,
                height: 200,
                sparkline: {
                    enabled: true
                }
		    },
        
            plotOptions: {          
                radialBar: {
                    startAngle: -180,
                    endAngle: 180,
                    track: {
                        background: "var(--rgba-secondary-1)",
                        strokeWidth: '100%',
                        margin: 3,
                    },                
                    hollow: {
                        margin: 20,
                        size: '60%',
                        background: 'transparent',
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: 'front',
                    },                
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: 5,
                            fontSize: '16px',
                            color:'#000000',
                            fontWeight:600,
                        }
                    }
                },
                grid: {
                    padding: {
                        top: -10
                    }
                },
            },            
            fill: {
                type: 'gradient',
                colors:'var(--secondary)',
                gradient: {
                    shade: 'black',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [64, 43, 64, 0.5]
                },
            },
            labels: ['Average Results'],
            responsive: [{
                breakpoint: 1600,
                options: {
                    chart: {
                        height:150
                    },
                }
            }],
       
        },
    };
  }

  render() {
    return (
      <div id="redial">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
        //   width={220}
        height={200}
        />
      </div>
    );
  }
}

export default SocialNetworkRadialChart;