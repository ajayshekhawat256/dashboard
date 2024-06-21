import React, { useEffect, useState } from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import axios from 'axios'
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { UilClipboardAlt } from "@iconscout/react-unicons";
const MainDash = () => {
 
  return (
    
    <div className='mainDash'>
        <h1>Dashboard</h1>
        <Cards />
        <Table/>
    </div>
  )
}

export default MainDash