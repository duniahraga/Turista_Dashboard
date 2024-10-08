import React from "react";
import ReactApexChart from "react-apexcharts";

const  AnalyticsReportBar = () => {
    const   series = [
        {
            name: 'Earning',
            data: [96, 60, 90,96, 60, 90],           
        }, 
        {
          name: 'Profit',
          data: [80, 40, 55,80, 40, 55]
        },        
    ];
    const  options = {
        chart: {
          type: "bar",
          height: 250,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            orizontal: false,
            columnWidth: '100%',
            endingShape: "rounded",
            borderRadius: 8,            
          },
        },
        states: {
            hover: {
              filter: 'none',
            }
        },
        colors:['var(--primary)', 'var(--secondary)'],
        dataLabels: {
            enabled: true,
            offsetY: -30,
            style: {
				fontSize: '14px',
				fontWeight: '600',
			},
        },          
        markers: {
            shape: "circle",
        },
        legend: {
            show: false,
            fontSize: '12px',
            labels: {
                colors: '#000000',
            },
            markers: {
                width: 18,
                height: 18,
                strokeWidth: 10,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,	
            }
        },
        stroke: {
          show: true,
          width:20,
          curve: 'smooth',
          lineCap: 'round',
          colors: ['transparent']
        },
        grid: {
            show: false,
            xaxis: {
                lines: {
                    show: false,
                }
            },
             yaxis: {
                lines: {
                    show: false
                }
            },  				
        },
          xaxis: {
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE'], 
            labels: {
                show: false,
                style: {
                    colors: '#A5AAB4',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'poppins',
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            crosshairs: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            }, 			
        },
        yaxis: {
            labels: {
            show: false,
                offsetX:-16,
               style: {
                  colors: '#000000',
                  fontSize: '13px',
                   fontFamily: 'poppins',
                  fontWeight: 100,
                  cssClass: 'apexcharts-xaxis-label',
              },
          },
        },
      
    } 
    
    return (
        <div id="chartBar" className="chartBar1">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={250}
            />
        </div>
    );
  
}
export default AnalyticsReportBar;
