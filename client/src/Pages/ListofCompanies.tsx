import campus from "../frontend_Reference/campus.png";
import campus2 from "../frontend_Reference/campus3.jpg";
import addicon from "../frontend_Reference/add.png";
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png";
import userlogo from "../frontend_Reference/profileuser.png";
import recruiterlogo from "../frontend_Reference/buildings.png";
import opportunitylogo from "../frontend_Reference/money.png";
import { Link } from "react-router-dom";
import { InfoContext } from "../Context/UserContext";
import styled from "styled-components";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { backendUrl } from "../config";
import { userInfo } from "os";
import { ExportToCsv } from "export-to-csv";
import { MultiSelect } from "react-multi-select-component";

const ListOfCompaniesPage = () => {
  const context = useContext(InfoContext);
  const [isUser, setIsUser] = useState(true);
  const [companyName, setcompanyName] = useState("");
  const [companyCTC, setcompanyCTC] = useState("");
  const [companyLocation, setcompanyLocation] = useState("");
  const [companyCluster, setcompanyCluster] = useState(0);
  const [companyBranches, setcompanyBranches] = useState([] as any);
  const [companyCgpa, setcompanyCgpa] = useState(0);
  const [companyPercentage10th, setcompanyPercentage10th] = useState(0);
  const [companyPercentage12th, setcompanyPercentage12th] = useState(0);
  const [companyDescription, setcompanyDescription] = useState("");
  const [companyJobDescription, setcompanyJobDescription] = useState("");
  const [companyDeadline, setcompanyDeadline] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([] as any);
  React.useEffect(() => {
    axios.get("http://localhost:4000/api/company").then((response) => {
      setList(response.data);
    });
    if (!context?.info) return;
    setIsUser(context.info.role === "user" ? true : false);
  }, [refresh]);

  const updateListOnDelete = (id: any) => {
    setList((prev: any) => prev.filter((item: any) => item._id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newInfo = {
      name: companyName,
      ctc: companyCTC,
      location: companyLocation,
      cluster: companyCluster,
      branches: companyBranches,
      cgpa: companyCgpa,
      percentage10: companyPercentage10th,
      percentage12: companyPercentage12th,
      description: companyDescription,
      role: companyJobDescription,
      deadline: companyDeadline,
    };
    console.log("help", newInfo);
    axios.post(`${backendUrl}/api/company/upload`, newInfo).then(() => {
      setRefresh(!refresh);
    });
    setShowModal(false);
  };

  const branchSelectOptions = [
    { value: "Computer Science (B.Tech)", label: "Computer Science (B.Tech)" },
    { value: "Computer Science (Dual)", label: "Computer Science (Dual)" },
    { value: "Electronics and Communication (B.Tech)", label: "Electronics and Communication (B.Tech)" },
    { value: "Electronics and Communication (Dual Degree)", label: "Electronics and Communication (Dual Degree)" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Civil", label: "Civil" },
    { value: "Chemical", label: "Chemical" },
    { value: "Electrical", label: "Electrical" },
    { value: "Material Science", label: "Material Science" },
  ];


  return (
    <div className="BG h-screen w-screen">
      {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
        <div className="flex col-span-10">
          <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20"> */}
          <nav>
        
        <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-10">
            <div className="flex items-center text-navtext h-full overflow-y-hidden invisible sm:visible ">
              <div className="text-navbigtext ">Recruiters</div>
            </div>
            <div className="flex items-center text-navtext h-full mt-2">
              <Link to="/">
                <div>Home</div>
              </Link>
            </div>
          {/* </div> */}
        </div>
      {/* </div> */}
      </nav>
      <div className="container mx-auto">
        <div>
          <div className="w-full h- sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
            {/* <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"> */}
            <div>
              {isUser ? null : (
                <button
                  // className="bg-pink-500 w-full text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  className="bg-gray-200  text-white active:bg-gray-300 font-bold uppercase text-sm mx-2 px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  <img
                    className=" h-10 w-10 object-cover"
                    src={addicon}
                    alt=""
                  ></img>
                </button>
              )}
              {showModal ? (
                <>
                  {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
                  <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> 
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Add Company
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto ">
                          <form
                            onSubmit={handleSubmit}
                            // className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-3 gap-4"
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 md:grid-cols-3 gap-4"
                          >
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company Name
                              </label>
                              <input
                                value={companyName}
                                required
                                onChange={(e) => setcompanyName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Company Name"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company CTC (in LPA)
                              </label>
                              <input
                                required
                                value={companyCTC}
                                onChange={(e) => setcompanyCTC(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Company CTC"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company Location
                              </label>
                              <input
                                required
                                value={companyLocation}
                                onChange={(e) =>
                                  setcompanyLocation(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Company Location"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company Cluster
                              </label>
                              <input
                                required
                                value={companyCluster}
                                onChange={(e) =>
                                  setcompanyCluster(
                                    Math.max(Number(e.target.value), 0)
                                  )
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="Company Cluster"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Eligible Branches(,)
                              </label>
                              <MultiSelect
                                options={branchSelectOptions}
                                value={companyBranches}
                                onChange={setcompanyBranches}
                                labelledBy={"Select Branches"}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Eligibility CGPA
                              </label>
                              <input
                                required
                                value={companyCgpa}
                                onChange={(e) =>
                                  setcompanyCgpa(Number(e.target.value))
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=" Eligibility CGPA"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Eligibility 10th Percentage
                              </label>
                              <input
                                required
                                value={companyPercentage10th}
                                onChange={(e) =>
                                  setcompanyPercentage10th(
                                    Number(e.target.value)
                                  )
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=" Eligibility 10th Percentage"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Eligibility 12th Percentage
                              </label>
                              <input
                                required
                                value={companyPercentage12th}
                                onChange={(e) =>
                                  setcompanyPercentage12th(
                                    Number(e.target.value)
                                  )
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=" Eligibility 12th Percentage"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company Description
                              </label>
                              <input
                                required
                                value={companyDescription}
                                onChange={(e) =>
                                  setcompanyDescription(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=" Company Description"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Job Profile
                              </label>
                              <input
                                required
                                value={companyJobDescription}
                                onChange={(e) =>
                                  setcompanyJobDescription(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Job Profile"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Deadline 
                              </label>
                              <input
                                required
                                value={companyDeadline}
                                onChange={(e) =>
                                  setcompanyDeadline(e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="YYYY-MM-DDTHH:MM:SSZ"
                              />
                            </div>
                            {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"> */}
                            <div className="flex flex-col sm:flex-row items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                        {/*footer*/}
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          {list.map((items: any) => (
            <React.Fragment key={items._id}>
            <CardTemplate
              items={items}
              updateListOnDelete={updateListOnDelete}
            />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const CardTemplate = ({
  items,
  updateListOnDelete,
}: {
  items: any;
  updateListOnDelete: any;
}) => {

  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: items.name,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    filename: items.name + ' UserList',
  }
  const csvExporter = new ExportToCsv(options);



  var list = [] as any;

  const context = useContext(InfoContext);
  const [isUser, setIsUser] = useState(true);
  const [showName, setShowName] = useState(items.name);
  const [showBranches, setShowBranches] = useState(items.branches);
  const [showLocation, setShowLocation] = useState(items.location);
  const [showCluster, setShowCluster] = useState(items.cluster);
  const [showCtc, setShowCtc] = useState(items.ctc);

  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [companyName, setcompanyName] = useState(items.name);
  const [companyCTC, setcompanyCTC] = useState(items.ctc);
  const [companyLocation, setcompanyLocation] = useState(items.location);
  const [companyCluster, setcompanyCluster] = useState(items.cluster);
  const [companyBranches, setcompanyBranches] = useState([]);
  const [companyCgpa, setcompanyCgpa] = useState(items.cgpa);
  const [companyPercentage10th, setcompanyPercentage10th] = useState(
    items.percentage10
  );
  const [companyPercentage12th, setcompanyPercentage12th] = useState(
    items.percentage12
  );
  const [companyDescription, setcompanyDescription] = useState(
    items.description
  );
  const [companyJobDescription, setcompanyJobDescription] = useState(
    items.role
  );
  const [companyDeadline, setcompanyDeadline] = useState(items.deadline);
  useEffect(() => {
    if (!context?.info) return;
    setIsUser(context.info.role === "user" ? true : false);
  }, []);

  
  const delSubmit = (id: any) => {
    axios
      .delete(`${backendUrl}/api/company/${id}`)
      .then((res) => updateListOnDelete(id));
    setShowDelModal(false);
  };

  const getAllUserSubmit = (_id: any) => {
    const company_id = _id;
    axios
      .post(`${backendUrl}/api/company/get_company_users`, { company_id })
      .then((res) => {
        const data = res.data.map((item: any) => item.user_email);
        
        axios.post(`${backendUrl}/api/company/get_user_info`, { email_list: data })
          .then((res) => {
            csvExporter.generateCsv(res.data);
          })
      });

  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newInfo = {
      name: companyName,
      ctc: companyCTC,
      location: companyLocation,
      cluster: companyCluster,
      branches: companyBranches,
      cgpa: companyCgpa,
      percentage10: companyPercentage10th,
      percentage12: companyPercentage12th,
      description: companyDescription,
      role: companyJobDescription,
      deadline: companyDeadline,
    };
    axios
      .post(`${backendUrl}/api/company/edit/${items._id}`, newInfo)
      .then((res) => {
        items = res.data.data;
        setShowName(items.name);
        setShowBranches(items.branches);
        setShowLocation(items.location);
        setShowCluster(items.cluster);
        setShowCtc(items.ctc);
      });
    setShowModal(false);
  };


  const editbranchSelectOptions = [
    { value: "Computer Science (B.Tech)", label: "Computer Science (B.Tech)" },
    { value: "Computer Science (Dual)", label: "Computer Science (Dual)" },
    { value: "Electronics and Communication (B.Tech)", label: "Electronics and Communication (B.Tech)" },
    { value: "Electronics and Communication (Dual Degree)", label: "Electronics and Communication (Dual Degree)" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Civil", label: "Civil" },
    { value: "Chemical", label: "Chemical" },
    { value: "Electrical", label: "Electrical" },
    { value: "Material Science", label: "Material Science" },
  ];

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <Link
        to={"/companydetail"}
        state={{ items }}
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="relative pb-48 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={campus2}
            alt=""
          ></img>
        </div>
        <div className="p-4">
          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
            {showName}
          </span>
          {/* <h2 className="mt-2 mb-2  font-bold">Branches: {showBranches.join("/")}</h2> */}
          <p className="text-sm">Location: {showLocation}</p>
          <div className="mt-3 flex items-center">
            <span className="text-sm font-semibold">
              Cluster: {showCluster}{" "}
            </span>
          </div>
        </div>
        <div className="p-4 border-t border-b text-xs text-gray-700">
          <span className="flex items-center">
            <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
            CTC: {showCtc} LPA
          </span>
        </div>
      </Link>
      {isUser ? null : (
        // <div className="inline-flex rounded-md shadow-sm" role="group">
        <div className="flex flex-row  rounded-md shadow-sm bg-gray-200 justify-between pt-1" role="group">
           <div className="flex"> 
        
          <button
            className="bg-gray-400 text-white active:bg-gray-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
            onClick={() => setShowModal(true)}
          >
            Edit Company
          </button>
          </div>
          <div className="flex">
          
          <button
            className="bg-gray-400 text-white active:bg-gray-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
            type="button"
            onClick={() => {
              getAllUserSubmit(items._id);
            }}
          >
            Get User List
          </button>
          </div>
          <div className="flex">
          
          <button
            // className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150 "
            className=" bg-gray-400 text-white active:bg-gray-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150 "
            type="button"
            onClick={() => setShowDelModal(true)}
          >
            X
          </button>
          </div>
        </div>
      )}
      {showModal ? (
        <>
          {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Company Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none "
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={handleSubmit}
                    // className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-3 gap-4"
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid sm:grid-cols-3 gap-4"
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company Name
                      </label>
                      <input
                        value={companyName}
                        onChange={(e) => setcompanyName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company CTC (in LPA)
                      </label>
                      <input
                        required
                        value={companyCTC}
                        onChange={(e) => setcompanyCTC(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company Location
                      </label>
                      <input
                        value={companyLocation}
                        onChange={(e) => setcompanyLocation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company Cluster
                      </label>
                      <input
                        required
                        value={companyCluster}
                        onChange={(e) =>
                          setcompanyCluster(Math.max(Number(e.target.value), 0))
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Eligible Branches(,)
                      </label>
                      <MultiSelect
                        options={editbranchSelectOptions}
                        value={companyBranches}
                        onChange={setcompanyBranches}
                        labelledBy={"Select New Branches"}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Eligibility CGPA
                      </label>
                      <input
                        required
                        value={companyCgpa}
                        onChange={(e) => setcompanyCgpa(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Eligibility 10th Percentage
                      </label>
                      <input
                        required
                        value={companyPercentage10th}
                        onChange={(e) =>
                          setcompanyPercentage10th(Number(e.target.value))
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Eligibility 12th Percentage
                      </label>
                      <input
                        required
                        value={companyPercentage12th}
                        onChange={(e) =>
                          setcompanyPercentage12th(Number(e.target.value))
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Company Description
                      </label>
                      <input
                        value={companyDescription}
                        onChange={(e) => setcompanyDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Job Profile
                      </label>
                      <input
                        value={companyJobDescription}
                        onChange={(e) =>
                          setcompanyJobDescription(e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Deadline
                      </label>
                      <input
                        value={companyDeadline}
                        onChange={(e) => setcompanyDeadline(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                    </div>
                    {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"> */}
                    <div className="flex flex-col md:flex-row items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showDelModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Do you want to remove this company?
                  </h3>
                  {/* <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none "
                                        onClick={() => setShowDelModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-3 gap-4"> */}

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowDelModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => delSubmit(items._id)}
                    >
                      Delete
                    </button>
                  </div>
                  {/* </form> */}
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ListOfCompaniesPage;
