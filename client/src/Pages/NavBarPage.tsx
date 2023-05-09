import campus from "../frontend_Reference/campus.png"
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
import userlogo from "../frontend_Reference/user.png"
import recruiterlogo from "../frontend_Reference/buildings.png"
import opportunitylogo from "../frontend_Reference/money.png"
import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';


const NavBarPage = () =>{
    return  (

<div className="Header w-screen h-[13%] grid grid-cols-10">
                <div className="flex col-span-2 bg-our-blue">
                    <div className="px-24 py-2">
                        <img className="object-contain h-20 w-20" src={nithlogo} alt="" />
                    </div>
                </div>
                <div className="flex col-span-6">
                    <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-full px-10">
                        <div className="flex items-center gap-10 text-navtext">
                            <div>About</div>
                            <div>Notices</div>
                            <div>Contact Info</div>
                        </div>
                        <div className=" flex items-center" >
                            <input placeholder="Search" className="bg-our-blue text-white border rounded-3xl px-5 py-1 placeholder:text-white"/>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="px-28 py-2 bg-our-blue">
                        <img className="object-contain h-20 w-20" src={userlogo} alt="" />
                    </div>
                </div>
            </div>
        
    );
};

export default NavBarPage;