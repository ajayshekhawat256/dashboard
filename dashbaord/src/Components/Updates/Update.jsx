import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios';
const Update = ({dataa,arr}) => {
    const data = {
        series: [
            {
                name: "Intensity",
                data: arr.map(item=>item.intensity),
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
                    format: "yyyy",
                },
            },
            grid: {
                show: false,
            },
            xaxis: {
                type: "date",
                categories: arr.map(item=>item.date),
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

export default Update