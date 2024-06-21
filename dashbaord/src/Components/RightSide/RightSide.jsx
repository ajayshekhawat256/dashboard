import React, { useEffect, useState } from 'react'
import './RightSide.css'
import Review from '../Review/Review'
import Update from '../Updates/Update'
import { useScroll } from 'framer-motion'
import axios from 'axios';
const RightSide = () => {
  const [dataa,setDataa]=useState([]);
  const [arr, setArr] = useState([]);
  const [arr1,setArr1]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/data');
      const dataaa = response.data;
      if (Array.isArray(dataaa)) {
        setDataa(dataaa.slice(0, 7));
        const tempArr = dataaa.slice(0, 8).map(item => ({
          name: item.sector,
          intensity: item.intensity,
          date:item.end_year
        }));
        const tempArr1=dataaa.slice(0,8).map(item=>({
          name:item.sector,
          likelihood: item.likelihood,
          date:item.end_year
        }))
        setArr1(tempArr1);
        setArr(tempArr);
      } else {
        console.error('Fetched data is not an array:', dataaa);
      }
    }
    fetchData();
  }, [])
  return (
    <div className='RightSide'>
        <div>
            <h3>Intensity vs End date</h3>
            <Update dataa={dataa} arr={arr}/>
        </div>
        <div>
            <h3>Likelihood vs End date</h3>
            <Review arr1={arr1}/>
        </div>
    </div>
  )
}

export default RightSide