import campus from "../frontend_Reference/campus.png"
import Applylogo from "../frontend_Reference/apply.jpg"
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
import userlogo from "../frontend_Reference/profileuser.png"
import recruiterlogo from "../frontend_Reference/buildings.png"
import opportunitylogo from "../frontend_Reference/money.png"
import { Link, useLocation } from "react-router-dom";
// import "./styles.css";
// import { Card } from "../Components/Cards";
import styled from "styled-components";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardMedia from '@mui/material/CardMedia';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

const CompanyDetailPage = () =>{
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);

    const location = useLocation();
    const {items} = location.state;
    console.log(items);

    return  (
        <div className="BG h-screen w-screen">
            {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
                
                <div className="flex col-span-10">
                    <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full">
                                <div className="text-navbigtext">Company Details</div>
                        </div>
                        <div className="flex items-center text-navtext h-full">
                        <Link to="/"><div>Home</div></Link>
                        </div>
                    </div>
                </div>
                
            </div> */}
            <nav>
                    <div className="flex justify-between self-end gap-6 bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full overflow-y-hidden invisible sm:visible">
                            <div className="text-navbigtext">Company Details</div>
                        </div>
                        <div className="flex items-center text-navtext h-full py-2">
                            <Link to="/"><div>Home</div></Link>
                        </div>
                    </div>
                </nav>
            <div className="container mt-32 mx-auto p-4 md:p-0">
  
            {/* <!-- Card wrapper --> */}
            <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto">
                
                {/* <!-- Card image --> */}
                <div className="bg-cover bg-bottom border w-full md:w-1/3 h-66 md:h-auto relative">
                <img className="absolute inset-0 h-full w-full object-cover" src={Applylogo} alt=""></img>
                <div className="absolute text-xl">
                    <i className="fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer"></i>
                </div>
                </div>
                {/* <!-- ./Card image --> */}
                
                {/* <!-- Card body --> */}
                <div className="bg-white w-full md:w-2/3">
                {/* <!-- Card body - outer wrapper --> */}
                <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">
                    {/* <!-- Card body - inner wrapper --> */}
                    <div className="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
                    {/* <!-- Card title and subtitle --> */}
                    <div className="w-full lg:w-2/5 lg:border-right lg:border-solid text-center md:text-center">
                        <h3 className="text-navtext">{items.name}</h3>
                        <p className="mb-0 mt-3 text-grey-dark text-sm italic">CTC-{items.ctc}  </p>
                        <hr className="w-1/4 md:ml-0 mt-4  border lg:hidden"></hr>
                    </div>
                    {/* <!-- ./Card title and subtitle --> */}
          
                {/* <!-- Card description --> */}
                <div className="w-full lg:w-3/5 lg:px-3">
                    <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                        Location: {items.location}
                    </p>
                    <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                        Cluster - {items.cluster}
                    </p>
                    <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                        Eligible Branches: {items.branches}
                    </p>
                    <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                        Eligibility Criteria: {items.cgpa}
                    </p>
                    <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                        Description: {items.description}
                    </p>
                </div>
                {/* <!-- ./Card description --> */}
                
                {/* <!-- Call to action button --> */}
                {/* <div className="w-full lg:w-1/5 mt-6 lg:mt-0 lg:px-9 items-center text-center md:text-center">
                    <button className="bg-white hover:bg-grey-darker hover:text-white border border-solid border-grey w-1/3 lg:w-full py-2">Visit now</button>
                </div> */}
                    {/* <!-- ./Call to action button --> */}
                </div>
                    {/* <!-- ./Card body - inner wrapper --> */}
                </div>
                {/* <!-- ./Card body - outer wrapper --> */}
                </div>
                {/* <!-- ./Card body --> */}
                </div>
                {/* <!-- ./Card wrapper --> */}
            </div>

        </div>
    );
};

export default CompanyDetailPage;