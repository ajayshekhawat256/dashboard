import React, { useState } from 'react'
import './SideBar.css';
import Logo from '../imgs/logo.png'
import { UilEstate } from "@iconscout/react-unicons";
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from "@iconscout/react-unicons";
const SideBar = () => {
    const [selected,setSelected]=useState(0);

    return (
        <div className='sideBar'>
            <div className="logo">
                <img src={Logo} alt="" />
                <span>Logo</span>
            </div>
            <div className="menu">
                <div>{SidebarData.map((icons, index) => {
                    return (
                        <div className={selected===index?"menuItem active":"menuItem"}
                        key={index}
                        onClick={()=>setSelected(index)}>
                            <icons.icon />
                            <span>{icons.heading}</span>
                        </div>
                    )
                })}
                <div className="menuItem">
                        <UilSignOutAlt />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar