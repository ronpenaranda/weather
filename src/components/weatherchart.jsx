import React from 'react';
import Chart from 'react-apexcharts';
import { transformData } from '../utils/utilities';

const WeatherChart = ({ data }) => {

  const options = {
    series: [{
      name: 'Temperature',
      data: transformData(data)
    }],
    options: {
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function (value) {
            const date = new Date(value)

            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
          },
        },
      },
      chart: {
        type: 'line',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 200,
          },
        },
        toolbar: {
          show: false,
        },
      },
      grid: {
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'straight',
        width: 1.5,
      },
      markers: {
        size: 0,
      },
    },
    legend: {
      show: true,
      position: 'right',
      labels: {
        style: {
          colors: '#1c1f1f',
        },
      },
    },
  };

  return (
<div className="bg-gray-100 p-4 rounded-lg">
  <h2 className="text-gray-500 font-semibold text-left mb-4" id="forecast-heading">Forecast</h2>
  <div className="flex justify-between text-center text-gray-800 text-sm w-full">
  <div className="w-full">
    <Chart
      options={options.options}
      series={options.series}
      type="line"
      height={250}
      aria-labelledby="forecast-heading"
    />
  </div>
  </div>
</div>

  );
};

export default WeatherChart;
