import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl, clustersSize } from "../config";
import ped from "../frontend_Reference/ped.jpg";

const RegisterAdminPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(clustersSize).fill(false)
  );
  const handleOnClusterChange = (position:any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    branch: "",
    phone: "",
    role:"admin"
  });

  const register = (e: any) => {
    e.preventDefault();
    console.log("from",form);
    
    // setForm({...form, clusters: selectedClusters})
    setShowModal(false)
    console.log(form)
    if(form.branch==="0" || form.branch===""){
      alert("Please select a branch")
      return;
    }
    axios
      .post(`${backendUrl}/api/admin/register`, form)
      .then((res) => {
        console.log(res);
        alert(
          "Mail has been sent to TPO email id. Please verify your email id to login."
        );
        navigate("/login");
      })
      .catch((err) => {
        alert("Internal Server Error");
        console.log(err);
      });
  };

  const handleOnBranchChange = (e: any) => {
    setForm({ ...form, branch: e.target.value });
  };

  return (
    <div className="flex BG h-screen w-screen bg-white min-h-screen flex items-center justify-center">
      {/* <div className="LBG h-full w-2/5 bg-our-blue flex items-center justify-center">
        <div className="IMGBG overflow-hidden h-4/5 w-4/6 bg-white rounded-3xl ">
          <img className="object-fill h-full w-full" src={ped} alt="" />
        </div>
      </div> */}
      <div className="2xl:block hidden mt-40 2xl:mt-0 w-[50%] ">
        <img className="object-fill justify-center border-8 border-our-blue rounded-2xl h-full w-full" src={ped} alt="" />
        </div>
      <div className="RBG h-screen flex-1  flex items-center ">
        <div className="flex flex-col  h-full pr-30 mx-40 flex-1">
          <div className="pt-10 pb-20  font-montserrat text-login flex">
            <div className="drop-shadow-lg pr-20 shadow-black">
              ADMIN REGISTER
              <hr className="w-1/2 mt-4 ml-2 h-[3px] bg-our-blue"></hr>
            </div>
          </div>

          <form onSubmit={register} className="w-full ">
            <div className="form">
              <div className="h-[34rem] pr-8 pb-8 scrollbar scrollbar-thumb-gray-900">
                <div className="flex items-center border-b border-black my-8">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Full Name"
                    aria-label="Full Name"
                  />
                </div>

                

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Personal Email"
                    aria-label="Personal Email"
                  />
                </div>

                {/* <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="College Email"
                    aria-label="College Email"
                  />
                </div> */}

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Password"
                    aria-label="Password"
                  />
                </div>

                <div className="flex items-center border-b border-black my-16">
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                  <select id="underline_select" 
                  required
                  onClick = {(e) => {handleOnBranchChange(e)}}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email">
                    <option className="text-lg" value="0" selected disabled>Branch</option>
                    <option className="text-lg" value="Computer Science (B.Tech)">Computer Science (B.Tech)</option>
                    <option className="text-lg" value="Computer Science (Dual)">Computer Science (Dual)</option>
                    <option className="text-lg" value="Electronics and Communication (B.Tech)">Electronics and Communication (B.Tech)</option>
                    <option className="text-lg" value="Electronics and Communication (Dual Degree)">Electronics and Communication (Dual Degree)</option>
                    <option className="text-lg" value="Mechanical">Mechanical</option>
                    <option className="text-lg" value="Civil">Civil</option>
                    <option className="text-lg" value="Chemical">Chemical</option>
                    <option className="text-lg" value="Electrical">Electrical</option>
                    <option className="text-lg" value="Material Science">Material Science</option>
                  </select>
                </div>
                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                  />
                </div>
                
              </div>
              
              <div className=" flex text-email  mt-10">
                <button
                  type="submit"
                  className="flex-shrink-0 bg-our-blue hover:bg-black border-black hover:border-black 
                                text-md border-4 text-white px-8 py-0 rounded-xl"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
          <div className="mt-2">
            Have an account?
            <Link to="/login">
              <span className="text-red-600 underline">LOGIN</span>
            </Link>
          </div>
          
        </div>
      </div>
      {/* {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Enter secret key
                  </h3>
                  
                </div>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                     
                      <input
                        // value=""
                        onChange={(e) => {
                            setForm({ ...form, key: e.target.value });
                          }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                
                
                
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={register}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} */}
    </div>
  );
};

export default RegisterAdminPage;
