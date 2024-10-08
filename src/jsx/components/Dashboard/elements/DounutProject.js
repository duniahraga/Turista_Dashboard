import React from "react";
import ReactApexChart from "react-apexcharts";

class DounutProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [12, 30, 20],
        options: {
            chart: {
                type: 'donut',                
                width: 150,                
		    },
        
            plotOptions: {          
                pie: {
                    donut: {
                      size: '80%',
                      labels: {
                          show: true,
                          name: {
                              show: true,
                              offsetY: 12,
                          },
                          value: {
                              show: true,
                              fontSize: '18px',
                              fontFamily:'Arial',
                              fontWeight:'500',
                              offsetY: -17,
                          },
                          total: {
                              show: true,
                              fontSize: '11px',
                              fontWeight:'500',
                              fontFamily:'Arial',
                              label: 'Compete',
                             
                              formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                  return a + b
                                }, 0)
                              }
                          }
                      }
                    }
                },               
            },            
            
            legend: {
                show: false,
            },
            colors: ['#3AC977', 'var(--primary)', 'var(--secondary)'],
            labels: ["Compete", "Pending", "Not Start"],
            dataLabels: {
                enabled: false,
            },
       
        },
    };
  }

  render() {
    return (
      <div id="AllProject">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={150}
        />
      </div>
    );
  }
}

export default DounutProject;