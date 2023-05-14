import campus from "../frontend_Reference/campus.png";
import recruiterlogo from "../frontend_Reference/buildings.png";
import opportunitylogo from "../frontend_Reference/money.png";
import usericon from "../frontend_Reference/usericon.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Nav from "./newnavbar";

const HomePage = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className="BG h-screen w-screen ">
      {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
<div className="flex col-span-2">
    <div className="px-24 py-2">
        <img className="object-contain h-20 w-20" src={nithlogo} alt="" />
    </div>
</div>
<div className="flex col-span-6">
    <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-10">
        <div className="flex items-center gap-10 text-navtext">
            
            <Link to="/about"><div>About</div></Link>
            <Link to="/notices"><div>Notices</div></Link>
            <Link to="/contactus"><div>Contact Info</div></Link>
        </div>
        <div className=" flex items-center" >
            <input placeholder="Search" className="bg-our-blue text-white border rounded-3xl px-5 py-1 placeholder:text-white"/>
        </div>
    </div>
</div>

    <div className="col-span-2">
        <Link to="/userProfile">
            <div className="px-28 py-2">
                <img className="object-contain h-20 w-20" src={userlogo} alt="" />
            </div>
        </Link>
    </div>

</div>  */}
      <Nav/>

      <div className="IMG flex-row relative w-screen h-[60%] bg-black ">
        <img
          className="object-cover flex-row h-full w-full"
          src={campus}
          alt=""
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-25 bg-gradient-to-r from-orange-300 to-orange-600"></div>
        <div className="absolute top-10 lg:w-2/5 lg:top-20 md:top-5 text-white font-robotoslab text-[300%] sm:text-[300%] md:text-[500%]">
          Welcome to ECE Locker, NITH
        </div>
      </div>

      <div className="w-screen h-1/4 flex absolute botttom-0 justify-between grid fgrid-cols-3 sm:grid-cols-3 xs:grid-cols-2">
        <div className="flexbg-black">
          <Link className="w-screen" to="/companies">
            <div className="flex flex-col h-full items-center px-10 bg-our-orange text-white gap-2">
              <div className="h-10 w-10 mt-4 border-2">
                <img
                  className="object-contain mx-auto"
                  src={recruiterlogo}
                  alt=""
                />
              </div>
              <div>RESULT</div>
              <div className="text-center w-4/5 ">
                Detailed information of all semester result of the student.
              </div>
            </div>
          </Link>
        </div>
        <div className="flex bg-black">
          <Link className="w-screen" to="/opportunities">
            <div className="flex flex-col h-full items-center px-10 bg-our-blue text-white gap-2">
              <div className="h-10 w-10 mt-4 border-2">
                <img
                  className="object-contain mx-auto"
                  src={opportunitylogo}
                  alt=""
                />
              </div>
              <div>STUDY MATERIAL</div>
              <div className="text-center  w-4/5 ">
                Upload or Download latest notes from your batchmates.
              </div>
            </div>
          </Link>
        </div>
        <div className="flex  bg-black">
          <Link className="w-screen" to="/resume">
            <div className="flex flex-col h-full items-center px-10 bg-our-orange text-white gap-2">
              <div className="h-10 w-10 mt-4 border-2">
                <img
                  className="object-contain mx-auto"
                  src={recruiterlogo}
                  alt=""
                />
              </div>
              <div>PERSONAL DOCUMENTS</div>
              <div className="text-center  w-4/5">
                Upload or Download your personal documents here.
              </div>
            </div>
          </Link>
        </div>
        {/* <div className="flex  bg-black">
          <Link className="w-screen" to="/notices">
            <div className="flex flex-col h-full items-center px-10 bg-our-blue text-white gap-1">
              <div className="h-10 w-10 mt-4 border-2">
                <img
                  className="object-contain mx-auto"
                  src={recruiterlogo}
                  alt=""
                />
              </div>
              <div>NOTICES</div>
              <div className="text-center ">
                Detailed information of all the placements in current and
                previous years.
              </div>
            </div>
          </Link>
        </div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default HomePage;
