import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import ped from "../frontend_Reference/ped.jpg";
import { Link } from "react-router-dom";

import { InfoContext } from "../Context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const context = useContext(InfoContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = (e: any) => {
    e.preventDefault();
    axios.post(`${backendUrl}/api/login`, form).then((res) => {
      if (context) context.setInfo(res.data.user);
      navigate("/");
    });
  };

  return (
    <div className="flex BG h-screen w-screen bg-white min-h-screen flex  items-center  grid-col-1 ml-0">
      {/* <div className="LBG h-full w-full bg-our-blue md:block hidden w-1/2 flex items-center justify-center">
        <div className="IMGBG overflow-hidden h-4/5  w-4/5 bg-white rounded-3xl ">  */}
      <div className="md:block md:visible hidden  h-screen w-1/2">
        {/* <div className="md:block md:visible hidden  w-1/2"> */}
        <img
          className="object-fill justify-center border-8 border-our-blue rounded-2xl h-full w-full"
          src={ped}
          alt=""
        />
        {/* </div> */}
      </div>
      {/* </div>
      </div> */}
      <div className="RBG h-screen flex-col items-center w-full h-screen">
        <div className="flex flex-col h-full pr-0 mx-10 flex-1 justify-center items-center ">
          <div className="pt-20 pb-20 my-auto font-montserrat text-login flex justify-center">
            <div className="drop-shadow-lg shadow-black">
              LOGIN
              <hr className="w-1/2 mt-4 ml-2 h-[3px] bg-our-blue"></hr>
            </div>
          </div>

          <form onSubmit={HandleLogin} className="w-full ">
            <div className="form ">
              <div className="flex items-center border-b border-black my-">
                <input
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                  type="text"
                  placeholder="email"
                  aria-label="College Email"
                />
              </div>

              <div className="flex items-center border-b border-black my-16">
                <input
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                  type="password"
                  placeholder="password"
                  aria-label="Password"
                />
              </div>

              <div className=" flex text-email justify-center mt-40">
                <button
                  className="flex-shrink-0 bg-our-blue hover:bg-black border-black hover:border-black 
                  text-md border-4 text-white px-8 py-0 rounded-xl"
                  type="submit"
                >
                  login
                </button>
              </div>
            </div>
          </form>
          <div className="mt-auto text-center">
            Don't have an account?
            <Link to="/register">
              <span className="text-red-600 underline">REGISTER</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
