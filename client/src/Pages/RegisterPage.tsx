import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl, clustersSize } from "../config";
import ped from "../frontend_Reference/ped.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(clustersSize).fill(false)
  );
  const handleOnClusterChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rollnumber: "",
    personalemail: "",
    branch: "",
    programme: "",
    cgpa: "",
    percentage10th: "",
    percentage12th: "",
    backlogs: "",
    phone: "",
    clusters: [] as any
  });

  const register = (e: any) => {
    const selectedClusters = [] as any
    checkedState.forEach((item, index) => { if (item) selectedClusters.push(index + 1) })
    if (selectedClusters.length !== 3) {
      alert("You can select exactly 3 clusters")
      return;
    }
    form.clusters = selectedClusters
    // setForm({...form, clusters: selectedClusters})
    setShowModal(false)
    console.log(form)
    if(form.branch==="0" || form.branch===""){
      alert("Please select a branch")
      return;
    }
    axios
      .post(`${backendUrl}/api/register`, form)
      .then((res) => {
        console.log(res);
        alert(
          "Mail has been sent to your email id. Please verify your email id to login."
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
      <div className="lg:block hidden h-screen w-1/2 ">
        <img className="object-fill justify-center border-8 border-our-blue rounded-2xl h-full w-full" src={ped} alt="" />
        </div>
      <div className="RBG h-screen flex-1 flex items-center justify-center">
        <div className="flex flex-col h-full pr-0 mx-20 flex-1">
          <div className="pt-10 pb-10  font-montserrat text-login flex justify-center">
            <div className="drop-shadow-lg shadow-black ">
              REGISTER
              <hr className="w-1/2 mt-4 ml-2 h-[3px] bg-our-blue"></hr>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setShowModal(true) }} className="w-full ">
            <div className="form">
              <div className="h-[30rem] pr-8 pb-8 scrollbar scrollbar-thumb-gray-900">
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
                      setForm({ ...form, rollnumber: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Roll Number"
                    aria-label="Roll Number"
                  />
                </div>

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, personalemail: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Personal Email"
                    aria-label="Personal Email"
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
                    placeholder="College Email"
                    aria-label="College Email"
                  />
                </div>

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
                      setForm({ ...form, programme: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Programme"
                    aria-label="Programme"
                  />
                </div>

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, cgpa: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="CGPA"
                    aria-label="CGPA"
                  />
                </div>

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, percentage10th: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="10th Percentage"
                    aria-label="10th Percentage"
                  />
                </div>

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, percentage12th: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="12th Percentage"
                    aria-label="12th Percentage"
                  />
                </div>

                <div className="flex items-center border-b border-black my-16">
                  <input
                    required
                    onChange={(e) => {
                      setForm({ ...form, backlogs: e.target.value });
                    }}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-email"
                    type="text"
                    placeholder="Backlogs"
                    aria-label="Backlogs"
                  />
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

              <div className=" flex text-email justify-center mt-10">
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
          <div className="mt-2 text-center">
            Have an account?
            <Link to="/login">
              <span className="text-red-600 underline">LOGIN</span>
            </Link>
          </div>
          <div className="mt-2 text-center">
            Register as ADMIN?
            <Link to="/registeradmin">
              <span className="text-red-600 underline">ADMIN</span>
            </Link>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Choose Clusters
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto grid grid-cols-2">
                  {
                    Array(clustersSize).fill(0).map((_, i) => {
                      return (
                        <div className="flex items-center mr-4">
                          <input
                            id="inline-checkbox"
                            type="checkbox"
                            value=""
                            onChange={() => handleOnClusterChange(i)}
                            checked={checkedState[i]}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="inline-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {i + 1}
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default RegisterPage;
