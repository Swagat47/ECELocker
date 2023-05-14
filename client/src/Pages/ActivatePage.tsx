import { Link, useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../config";

const ActivatePage = () => {
  const token = useParams()?.token;

  const [message, setMessage] = useState("Waiting for activation...");

  const requestActivation = () => {
    if (token) {
      console.log("token", token);
      axios
        .post(`${backendUrl}/api/active`, { active_token: token })
        .then((res) => {
          setMessage(res.data.msg);
        })
        .catch((err) => {
          if (err?.response?.data?.msg) setMessage("Account Activated");
          else setMessage("Something went wrong");
        });
    }
  };

  useEffect(() => {
    requestActivation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="BG h-screen w-screen">
      {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
        <div className="flex col-span-10">
          <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
            <div className="flex items-center text-navtext h-full">
              <div className="text-navbigtext">Activation Page</div>
            </div>
            <div className="flex items-center text-navtext h-full">
              <Link to="/login">
                <div>Login</div>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      <nav>
        <div className="flex justify-between self-end gap-6 bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
          <div className="flex items-center text-navtext h-full invisible sm:visible">
            <div className="text-navbigtext">Activation Page</div>
          </div>
          <div className="flex items-center text-navtext h-full py-2">
            <Link to="/">
              <div>Home</div>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container my-24 px-6 mx-auto">
        <div className="text-2xl text-center">{message}</div>
      </div>
    </div>
  );
};

export default ActivatePage;
