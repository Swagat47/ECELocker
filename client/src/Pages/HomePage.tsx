// import campus from "../frontend_Reference/campus.png"
// import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
// import userlogo from "../frontend_Reference/profileuser.png"
// import recruiterlogo from "../frontend_Reference/buildings.png"
// import opportunitylogo from "../frontend_Reference/money.png"
// import { Link } from "react-router-dom";

// import React, { useState, useEffect } from 'react';


// const HomePage = () =>{
//     const [click, setClick] = useState(false);
//     const closeMobileMenu = () => setClick(false);
//     return  (
//         <div className="BG h-screen w-screen">
//             <div className="Header w-screen h-[13%] grid grid-cols-10">
//                 <div className="flex col-span-2">
//                     <div className="px-24 py-2">
//                         <img className="object-contain h-20 w-20" src={nithlogo} alt="" />
//                     </div>
//                 </div>
//                 <div className="flex col-span-6">
//                     <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-10">
//                         <div className="flex items-center gap-10 text-navtext">
                            
//                             <Link to="/about"><div>About</div></Link>
//                             <Link to="/notices"><div>Notices</div></Link>
//                             <Link to="/contactus"><div>Contact Info</div></Link>
//                         </div>
//                         <div className=" flex items-center" >
//                             <input placeholder="Search" className="bg-our-blue text-white border rounded-3xl px-5 py-1 placeholder:text-white"/>
//                         </div>
//                     </div>
//                 </div>
                
//                     <div className="col-span-2">
//                         <Link to="/userProfile">
//                             <div className="px-28 py-2">
//                                 <img className="object-contain h-20 w-20" src={userlogo} alt="" />
//                             </div>
//                         </Link>
//                     </div>
                
//             </div>
//             <div className="IMG relative w-screen h-3/5 bg-black ">
//                 <img className="object-fill h-full w-full" src={campus} alt="" />
//                 <div className="absolute top-0 left-0 right-0 bottom-0 opacity-25 bg-gradient-to-r from-orange-300 to-orange-600"></div>
//                 <div className="flex items-center absolute w-1/2 top-0 h-full text-white font-robotoslab text-hometext">
//                     <div className="px-20">Welcome to NITH Placement Hub</div>
//                 </div>
//             </div>

//             <div className="w-screen h-[27%] grid grid-cols-4">
//                 <div className="flex  justify-center bg-black"><Link to='/companies'>
//                 <div className="flex flex-col justify-center h-full items-center px-10 bg-our-orange text-white gap-2">
                
//                     <div className="h-10 w-10 border-2">
//                         <img className="object-contain mx-auto" src={recruiterlogo} alt="" />
//                     </div>
//                     <div>
                    
//                     RECRUITERS
//                         </div>
//                     <div className="text-center">Detailed information of all recruiters coming for placements.</div>
//                 </div></Link>
//                 </div>
//                 <div className="flex  justify-center bg-black"><Link to='/opportunities'>
//                 <div className="flex flex-col justify-center h-full items-center px-10 bg-our-blue text-white gap-2">
//                     <div className="h-10 w-10 border-2">
//                         <img className="object-contain mx-auto" src={opportunitylogo} alt="" />
//                     </div>
//                     <div>OPPORTUNITIES</div>
//                     <div className="text-center">Detailed information of all recruiters coming for placements.</div>
//                 </div>
//                 </Link></div>
//                 <div className="flex  justify-center bg-black"><Link to='/resume'>
//                 <div className="flex flex-col justify-center h-full items-center px-10 bg-our-orange text-white gap-2">
//                     <div className="h-10 w-10 border-2">
//                         <img className="object-contain mx-auto" src={recruiterlogo} alt="" />
//                     </div>
//                     <div>RESUME</div>
//                     <div className="text-center">Upload/Download your latest resume for the recruiters</div>
//                 </div></Link></div>
//                 <div className="flex  justify-center bg-black"><Link to='/statistics'>
//                 <div className="flex flex-col justify-center h-full items-center px-10 bg-our-blue text-white gap-2">
//                     <div className="h-10 w-10 border-2">
//                         <img className="object-contain mx-auto" src={recruiterlogo} alt="" />
//                     </div>
//                     <div>STATISTICS</div>
//                     <div className="text-center">Detailed information of all the placements in current and previous years.</div>
//                 </div>  
//                 </Link></div>  
//             </div>

//         </div>
//     );
// };

// export default HomePage;

import campus from "../frontend_Reference/campus.png"
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
import userlogo from "../frontend_Reference/profileuser.png"
import recruiterlogo from "../frontend_Reference/buildings.png"
import opportunitylogo from "../frontend_Reference/money.png"
import usericon from "../frontend_Reference/usericon.png"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Nav from './newnavbar';

const HomePage = () =>{
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);
    return  (
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
          <Nav></Nav>
      

           
            <div className="IMG flex-row relative w-screen h-[60%] bg-black ">
            
                <img className="object-cover flex-row h-full w-full" src={campus} alt="" />
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-25 bg-gradient-to-r from-orange-300 to-orange-600">
                
                </div>
                <div className="absolute top-10 lg:w-3/5 lg:top-20 md:top-5 text-white font-robotoslab text-[300%] sm:text-[300%] md:text-[500%]">
                    Welcome to NITH Placement Hub
                </div>
                
            </div>
            

            <div className="w-screen h-[25%] flex absolute botttom-0 justify-between grid sm:grid-cols-4 xs:grid-cols-2">
                <div className="flex   bg-black"><Link className="w-screen" to='/companies'>
                <div className="flex flex-col  h-full items-center px-10 bg-our-orange text-white gap-2">
                
                    <div className="h-10 w-10 mt-4 border-2">
                        <img className="object-contain mx-auto" src={recruiterlogo} alt="" />
                    </div>
                    <div>
                    
                    RECRUITERS
                        </div>
                    <div className="text-center">Detailed information of all recruiters coming for placements.</div>
                </div></Link>
                </div>
                <div className="flex bg-black"><Link className="w-screen" to='/opportunities'>
                <div className="flex flex-col h-full items-center px-10 bg-our-blue text-white gap-2">
                    <div className="h-10 w-10 mt-4 border-2">
                        <img className="object-contain mx-auto" src={opportunitylogo} alt="" />
                    </div>
                    <div >OPPORTUNITIES</div>
                    <div className="text-center ">Detailed information of all recruiters coming for placements.</div>
                </div>
                </Link></div>
                <div className="flex  bg-black"><Link className="w-screen" to='/resume'>
                <div className="flex flex-col h-full items-center px-10 bg-our-orange text-white gap-2">
                    <div className="h-10 w-10 mt-4 border-2">
                        <img className="object-contain mx-auto" src={recruiterlogo} alt="" />
                    </div>
                    <div>RESUME</div>
                    <div className="text-center ">Upload or Download your latest resume for the recruiters</div>
                </div></Link></div>
                <div className="flex  bg-black"><Link className="w-screen" to='/statistics'>
                <div className="flex flex-col h-full items-center px-10 bg-our-blue text-white gap-1">
                    <div className="h-10 w-10 mt-4 border-2">
                        <img className="object-contain mx-auto" src={recruiterlogo} alt="" />
                    </div>
                    <div>STATISTICS</div>
                    <div className="text-center ">Detailed information of all the placements in current and previous years.</div>
                </div>  
                </Link></div>  
            </div>
        {/* </div> */}
        </div>
    );
};

export default HomePage;