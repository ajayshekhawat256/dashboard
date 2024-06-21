import React from 'react'
import './Review.css'
import Chart from "react-apexcharts";
const Review = ({arr1}) => {
    const data = {
        series: [
            {
                name: "Liklihood",
                data: arr1.map(item => item.likelihood),
            },
        ],
        options: {
            chart: {
                type: "area",
                height: "auto",
            },

            fill: {
                colors: ["#fff"],
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "stepline",
                colors: ["#ff929f"],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
            grid: {
                show: false,
            },
            xaxis: {
                type: "date",
                categories: arr1.map(item=>item.date)
            },
            yaxis: {
                show: false
            },
            toolbar: {
                show: false
            }
        },
    };
  return (
      <div className="CustomerReview">
          <Chart options={data.options} series={data.series} type="area" />
      </div>
  )
}

export default Review