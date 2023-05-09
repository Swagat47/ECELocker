import campus from "../frontend_Reference/campus.png"
import campus3 from "../frontend_Reference/campus3.jpg"
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
import userlogo from "../frontend_Reference/profileuser.png"
import recruiterlogo from "../frontend_Reference/buildings.png"
import opportunitylogo from "../frontend_Reference/money.png"
import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';


const AboutusPage = () =>{
//     const [click, setClick] = useState(false);
//     const closeMobileMenu = () => setClick(false);
//     return  (
//         <div className="h-screen   w-screen">
//              <div className="Header w-screen h-[13%] grid grid-cols-10">
                
//                 <div className="flex col-span-10">
//                     <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
//                         <div className="flex items-center text-navtext h-full">
//                                 <div className="text-navbigtext">About</div>
//                         </div>
//                         <div className="flex items-center text-navtext h-full">
//                         <Link to="/"><div>Home</div></Link>
//                         </div>
//                     </div>
//                 </div>
                
//             </div>
            

// {/*     
// <div className="IMG relative w-screen h-5/5 bg-gradient-to-r from-cyan-500 to-blue-500  "> */}

//                 <img className="object-fill h-4/5 w-full opacity-40" src={campus} alt=""/>
//                 <h1 className="absolute text-6xl backdrop-blur-sm bg-white/40 text-black top-1/3 left-5 w-1/2 h-3/7 px-5">
                
//                 <h1 className="text-7xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 color: hsl(218, 81%, 95%) py-4 px-5 text-login">
//                             NITH <br /><span className="color: hsl(218, 81%, 75%)">Placement Hub</span>
//                         </h1>
//                         <p className="text-lg color: hsl(218, 81%, 95%) py-1 px-5 ">
//                         We provide easy access to all your placement issues whether it be accessing new notices, receiving test updates & interview updates, viewing the list of companies or accessing the previous year’s placement record. The process of placement is made easier for students with easy access to all their requirements. Admins will have the ease to manage student and company data all in one place. The workload on the TPR’s will be reduced significantly and the process of placement will be in a more organized manner.
//                         </p>
//                        </h1>
//                 <h2 className="absolute text-3xl text-black-400 bottom-4 left-1/2 -translate-x-1/2">NIT HAMIRPUR</h2>
//                 {/* <div className="absolute  bottom-20 right-9 h-1/2 w-1/3">
//                 <img className="" src={campus3} alt=""/>
//                 </div> */}
                    
            

//         </div>

//         // </div>
//     );
const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);
    return  (
        <div className="h-screen w-screen ">
                <nav>
                    <div className="flex justify-between self-end gap-6 bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full invisible sm:visible">
                            <div className="text-navbigtext">About</div>
                        </div>
                        <div className="flex items-center text-navtext h-full py-2">
                            <Link to="/"><div>Home</div></Link>
                        </div>
                    </div>
                </nav>
           
            <img className="object-cover h-full w-full opacity-40 " src={campus} alt="" />

            <div className="absolute text-6xl backdrop-blur-sm bg-white/40 text-black top-14 md:top-1/4 left-0 md:left-5 h-3/7 px-5 lg:w-[50%] md:w-1/2 sm:w-3/4 xs:w-full ">
                <h1 className="text-7xl font-bold tracking-tight mb-12 color: hsl(218, 81%, 95%) py-4 px-5 text-login">
                    NITH <br /><span className="color: hsl(218, 81%, 75%) ">Placement Hub</span>
                </h1>
                <p className="color: hsl(218, 81%, 95%) pb-8 px-5 text-md ">
                    We provide easy access to all your placement issues whether it be accessing new notices, receiving test updates & interview updates, viewing the list of companies or accessing the previous year’s placement record. The process of placement is made easier for students with easy access to all their requirements. Admins will have the ease to manage student and company data all in one place. The workload on the TPR’s will be reduced significantly and the process of placement will be in a more organized manner.
                </p>
            </div>

            {/* <footer className="bg-white opacity-40 text-xl text-our-blue text-right py-1 p-4">
               
            </footer> */}
        </div>

        // </div>
    );
};

export default AboutusPage;