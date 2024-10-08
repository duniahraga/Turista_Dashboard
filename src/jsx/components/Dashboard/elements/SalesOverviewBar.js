import React from "react";
import ReactApexChart from "react-apexcharts";

const series = [
    {
        name: "New Clients",
        data: [180, 150, 200, 100, 150, 180, 150,170,115,190,140,80,70,90,120,50,90,100,200,300,180,200,150]
    }
];
const  options = {
    chart: {
      type: "bar",
      height: 230,
      stacked: true,
      toolbar: {
        show: false,
      },          
        offsetX:0,
    },
    plotOptions: {
      bar: {
        columnWidth: "25%",
        endingShape: "rounded",
        startingShape: "rounded",
        borderRadius: 5,            
        colors: {
            backgroundBarColors: ['#F8F8F8', '#F8F8F8', '#F8F8F8', '#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8'],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 5,
        },          
      },
      distributed: true
    },
   
    colors:['var(--primary)'],
    grid: {
        show:false,
        borderColor:'#F8F8F8'
    },
    legend: {
        show: false
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
        enabled: false,
        colors: ['#000'],
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 1
      }
    },
    xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S','S','M','T','W','T','F','S','M','T','W','T','F','S','M','T','W'],
        labels: {
            style: {
                colors: '#787878',
                fontSize: '13px',
                fontFamily: 'poppins',
                fontWeight: 100,
                cssClass: 'apexcharts-xaxis-label',
           },
        },
        crosshairs: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
       
    yaxis: {
        show: false
    },
    
    tooltip: {
        x: {
            show: true
        }
    }
  
} 

const  SalesOverviewBar = () => {  
    
    return (
        <div id="activityChart" className="activityChart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={230}
            />
        </div>
    );
  
}
export default SalesOverviewBar;
