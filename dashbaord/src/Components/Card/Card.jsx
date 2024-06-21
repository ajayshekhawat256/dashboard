import React, { useState } from 'react';
import { motion, LayoutGroup } from "framer-motion";
import './Card.css';
import { UilTimes } from "@iconscout/react-unicons";
import { CircularProgressbar } from "react-circular-progressbar";
import Chart from "react-apexcharts";

const Card = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <LayoutGroup>
            {expanded ? (
                <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
            ) : (
                <CompactCard param={props} setExpanded={() => setExpanded(true)} />
            )}
        </LayoutGroup>
    );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
    const Png = param.png;
    return (
        <motion.div
            className="CompactCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId="expandable"
            onClick={setExpanded}
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png />
                <span>{param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </motion.div>
    );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
    const data = {
        options: {
            chart: {
                type: "area",
                height: "auto",
            },
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                color: "#000",
                opacity: 0.35,
            },
            fill: {
                colors: ["#fff"],
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["white"],
            },
            tooltip: {
                x: {
                    format: "yyyy",
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: "category", // Use "category" type for better handling of string dates
                categories: param.arr.map(item => item.date),
            },
        },
    };

    return (
        <motion.div
            className="ExpandedCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId="expandableCard"
        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>
            <div className="chartContainer">
                <Chart options={data.options} series={param.series} type="area" />
            </div>
            <span>Last 24 hours</span>
        </motion.div>
    );
}

export default Card;
