import { useState } from "react";
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
import usericon from "../frontend_Reference/usericon.png"
import userlogo from "../frontend_Reference/profileuser.png"
import userlogo1 from "../frontend_Reference/userlogo1.png"
import { Link } from "react-router-dom";
function Nav() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full h-[15%] bg-our-blue">
            <div className="justify-between px-2 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-4 md:block ">
                    <img className="object-contain h-full w-16 mt-2 left-0" src={nithlogo} alt="" />
                    
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className="flex col-span-6">
                    <div
                        className={`flex-1 justify-self-center pb-2 mt-2 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <div className="mt-0 space-y-0 md:hidden sm:inline-block">
                        <Link to="/userProfile">
                            <div className="px-0 py-1 border-spacing-1">
                                <img className="object-contain h-10 w-10 float-right bg-our-blue" src={userlogo1} alt="" />
                            </div>
                        </Link>
                    
                        </div>
                        <ul className="items-center mt-10  px-0 justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-navtext font-robotoslab  text-2xl">
                            <li className="text-white  hover:text-indigo-200">
                            <Link to="/about"><div>About</div></Link>
                            </li>
                            <li className="text-white px-5 hover:text-indigo-200">
                            <Link to="/notices"><div>Notices</div></Link>
                            </li>
                            <li className="text-white  hover:text-indigo-200">
                            <Link to="/contactus"><div>Contact Info</div></Link>
                            </li>
                            
                        </ul>

                        
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                <Link to="/userProfile">
                            <div className="px-14 py-2 border-spacing-1">
                                <img className="object-contain h-16 w-16 mt-2 bg-our-blue" src={userlogo1} alt="" />
                            </div>
                        </Link>
                    
                </div>
            </div>
        </nav>
    );
}

export default Nav;