import React, { useEffect, useState } from 'react';
import './Cards.css';
import Card from '../Card/Card';
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { UilClipboardAlt } from "@iconscout/react-unicons";
import axios from 'axios';

const Cards = () => {
  const [data, setData] = useState([]);
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/data');
      const dataa = response.data;
      if (Array.isArray(dataa)) {
        setData(dataa.slice(0, 8));
        const tempArr = dataa.slice(0, 8).map(item => ({
          name: item.sector,
          intensity: item.intensity,
          date: item.end_year,
        }));
        const tempArr1 = dataa.slice(0, 8).map(item => ({
          name: item.sector,
          relevance: item.relevance,
          date: item.end_year,
        }));
        const tempArr2 = dataa.slice(0, 8).map(item => ({
          name: item.sector,
          likelihood: item.likelihood,
          date: item.end_year,
        }));
        setArr(tempArr);
        setArr1(tempArr1);
        setArr2(tempArr2);
      } else {
        console.error('Fetched data is not an array:', dataa);
      }
    }
    fetchData();
  }, []);

  const cardsData = [
    {
      title: "Intensity vs endYear",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "Technological",
      png: UilUsdSquare,
      series: [
        {
          name: "Intensity",
          data: arr.map(item => item.intensity),
        },
      ],
    },
    {
      title: "Relevance vs endYear",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "Relevance",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Relevance",
          data: arr1.map(item => item.relevance),
        },
      ],
    },
    {
      title: "Likelihood vs endYear",
      color: {
        backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "artificial intelligence",
      png: UilClipboardAlt,
      series: [
        {
          name: "Likelihood",
          data: arr2.map(item => item.likelihood),
        },
      ],
    },
  ];

  return (
    <div className='Cards'>
      {cardsData.map((card, index) => (
        <div className="parentContainer" key={index}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
            arr={arr} // Pass the correct array for each card
          />
        </div>
      ))}
    </div>
  );
}

export default Cards;
