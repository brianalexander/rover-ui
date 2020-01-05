import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DarkUnica from "highcharts/themes/dark-unica";
import { toast } from "react-toastify";

DarkUnica(Highcharts);

class AntennaSignal extends Component {
  POOR_SIGNAL_ID = "poor-signal-id";

  componentDidMount() {
    setInterval(() => {
      let prevData = this.state.chartOptions.series[0].data;

      if (prevData.length > 5) {
        prevData.shift();
      }
      prevData.push([new Date().getTime(), Math.random() * 20]);
      console.log(this.state.showToast);
      if (
        prevData[prevData.length - 1][1] < 5 &&
        !toast.isActive(this.POOR_SIGNAL_ID)
      ) {
        toast.error("Signal Strength Critical!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          toastId: this.POOR_SIGNAL_ID
        });
      }

      this.setState({
        chartOptions: {
          series: [
            {
              data: [...prevData]
            }
          ]
        }
      });
    }, 1000);
  }

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      chartOptions: {
        chart: {
          type: "spline"
        },

        time: {
          useUTC: false
        },

        title: {
          text: "3.4Ghz Signal Strength"
        },

        xAxis: {
          type: "datetime"
        },

        yAxis: {
          min: 0,
          max: 20,
          title: {
            text: "Value"
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080"
            }
          ]
        },

        legend: {
          enabled: false
        },

        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },

        series: [
          {
            zoneAxis: "y",
            zones: [
              { value: 5, color: "red" },
              { value: 15, color: "orange" },
              { color: "green" }
            ],
            name: "Random data",
            data: []
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          ref={this.chartComponent}
          highcharts={Highcharts}
          options={this.state.chartOptions}
        />
      </div>
    );
  }
}

export default AntennaSignal;
