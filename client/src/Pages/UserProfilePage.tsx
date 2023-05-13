import { ClassNames } from "@emotion/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl, clustersSize } from "../config";
import { InfoContext } from "../Context/UserContext";
import ped from "../frontend_Reference/ped.jpg";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import defaultuserimg from "../frontend_Reference/4.webp";
//import "flowbite";

const UserTemplate = ({ items }: { items: any }) => {
  const [isGreen, setIsGreen] = useState(false);
  const [placedShowModal, setPlacedShowModal] = useState(false);
  const [clusterShowModal, setClusterShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userBranch, setUserBranch] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCTC, setCompanyCTC] = useState("");
  const [placementYear, setPlacementYear] = useState("");
  const [placementCluster, setPlacementCluster] = useState("");

  const [selectedClusters, setSelectedClusters] = useState(
    new Array(clustersSize).fill(false)
  );

  const handleOnClusterChange = (position: any) => {
    const updatedCheckedState = selectedClusters.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedClusters(updatedCheckedState);
  };

  const openClusterModal = () => {
    setSelectedClusters((prev) =>
      prev.map((item, index) =>
        items.clusters.includes(index + 1) ? true : false
      )
    );
    setClusterShowModal(true);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/company");
      setPosts(res.data);
      setLoading(false);
    };
    getAllPosts();
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    const newInfo = {
      name: items.name,
      email: items.email,
      branch: items.branch,
      company: companyName,
      ctc: companyCTC,
      year: placementYear,
      cluster: placementCluster,
    };
    axios.post(`${backendUrl}/api/statistics/upload`, newInfo).then(() => {
      setIsGreen(!isGreen);
    });
  };

  const handleClusterSubmit = (e: any) => {
    e.preventDefault();
    const checked = [] as any;
    selectedClusters.forEach((item, index) => {
      if (item) checked.push(index + 1);
    });
    if (checked.length !== 3) {
      alert("You can select exactly 3 clusters");
      return;
    }
    items.clusters = checked;
    const items_to_post = { email: items.email, clusters: checked };
    setClusterShowModal(false);
    axios
      .post(`${backendUrl}/api/users/update_cluster`, items_to_post)
      .then((res) => {
        console.log(res);
        alert("Cluster Updated Successfully!");
      })
      .catch((err) => {
        alert("Internal Server Error");
        console.log(err);
      });
  };

  const handleNameChange = (e: any) => {
    setCompanyName(e.target.value);
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="flex py-4 rounded-lg mb-4 shadow-lg bg-white mx-10 justify-between">
        <div className="ml-5  w-1/5 px-3 py-0">{items.rollnumber}</div>
        <div className="mx-10 w-2/5 px-3 py-0">{items.name}</div>

        <div className="mx-10  px-3 py-0">
          <button
            className={`bg-gray-500 hover:bg-green-500 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 
            ${isGreen ? "bg-green-500" : "bg-gray-500"}`}
            onClick={() => setPlacedShowModal(true)}
            // onClick={handleClick}
          >
            {isGreen ? "Placed" : "Unplaced"}
          </button>
          {placedShowModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Company Details
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setPlacedShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto ">
                      <form
                        onSubmit={handleClick}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4"
                      >
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Placement Year
                          </label>
                          <input
                            required
                            value={placementYear}
                            onChange={(e) => setPlacementYear(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Placement Cluster
                          </label>
                          <input
                            required
                            value={placementCluster}
                            onChange={(e) =>
                              setPlacementCluster(e.target.value)
                            }
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
                            onChange={(e) => setCompanyCTC(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Company CTC"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Company Name
                          </label>
                          {/* <input
                                // value={companyName}
                                // required
                                // onChange={(e) => setcompanyName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Company Name"
                              /> */}
                          <input
                            required
                            // value={companyName}
                            value={companyName}
                            // onChange={(e) => setCompanyName(e.target.value)}
                            type="search"
                            className="
                                  form-control
                                  block
                                  w-full
                                  px-3
                                  py-1.5
                                  text-base
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid border-gray-300
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                            id="exampleSearch"
                            placeholder="Company Name"
                            // placeholder={companyName}
                            // onChange={(e) => setSearchText(e.target.value)}
                            onChange={handleNameChange}
                          />
                          {loading ? (
                            <h2>Loading...</h2>
                          ) : (
                            posts
                              .filter((value: any) => {
                                if (searchText == "") {
                                  return value;
                                } else if (
                                  value.name
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                                ) {
                                  return value;
                                }
                              })
                              .map((item: any) => {
                                return (
                                  <h2>
                                    <button
                                      type="button"
                                      onClick={() => setCompanyName(item.name)}
                                      className="inline-block px-6 py-2 border-1 border-gray-100 text-100 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    >
                                      {item.name}
                                    </button>
                                  </h2>
                                );
                              })
                          )}
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setPlacedShowModal(false)}
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
        <div className="mr-5">
          <button
            type="submit"
            className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={openClusterModal}
          >
            Clusters
          </button>
          {clusterShowModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Clusters</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto ">
                      <form
                        onSubmit={handleClusterSubmit}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-3 gap-4"
                      >
                        {Array(clustersSize)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="flex items-center mr-4">
                              <input
                                id="inline-checkbox"
                                type="checkbox"
                                value=""
                                onChange={() => handleOnClusterChange(i)}
                                checked={selectedClusters[i]}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="inline-checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {i + 1}
                              </label>
                            </div>
                          ))}

                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setClusterShowModal(false)}
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
    </>
  );
};

const UserProfilePage = () => {
  const context = useContext(InfoContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollnumber, setRollnumber] = useState("");
  const [personalemail, setPersonalemail] = useState("");
  const [branch, setBranch] = useState("");
  const [programme, setProgramme] = useState("");
  const [cgpa, setCgpa] = useState(0);
  const [percentage10th, setPercentage10th] = useState(0);
  const [percentage12th, setPercentage12th] = useState(0);
  const [backlogs, setBacklogs] = useState(0);
  const [phone, setPhone] = useState(0);
  const [isUser, setIsUser] = useState(true);
  const [isPlaced, setIsPlaced] = useState(false);
  const [list, setList] = useState([] as any);
  const [refresh, setRefresh] = useState(false);

  const [image, setImage] = useState(null as any);
  const [showAvatar, setShowAvatar] = useState(null as any);

  //@ts-ignore
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const fetchAvatar = () => {
    if (context?.info?.email === undefined) return;
    axios
      .post(`${backendUrl}/api/users/avatar_get`, {
        email: context?.info?.email,
      })
      .then((res) => {
        setShowAvatar(res.data);
      });
  };

  const handleAvatarUpload = (e: any) => {
    e.preventDefault();
    const config = { headers: { Accept: "application/json" } };
    const formData = new FormData();
    if (context?.info?.email === undefined) return;
    formData.append("image", image);
    formData.append("email", context?.info?.email);
    axios
      .post(`${backendUrl}/api/users/avatar_upload`, formData, config)
      .then((res) => {
        fetchAvatar();
      })
      .catch((err) => console.log(err.response.data));
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:4000/api/users").then((response) => {
      setList(response.data);
    });
    console.log(list);
  }, [refresh]);

  useEffect(() => {
    if (!context?.info) return;
    setName(context?.info.name);
    setEmail(context?.info.email);
    setRollnumber(context?.info.rollnumber);
    setPersonalemail(context?.info.personalemail);
    setBranch(context?.info.branch);
    setProgramme(context?.info.programme);
    setCgpa(context?.info.cgpa);
    setPercentage10th(context?.info.percentage10th);
    setPercentage12th(context?.info.percentage12th);
    setBacklogs(context?.info.backlogs);
    setPhone(context?.info.phone);
    setIsUser(context?.info.role === "user" ? true : false);
    setIsPlaced(context?.info.placed);
  }, [context?.info]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      context?.info?.clusters?.length === 0 ||
      context?.info?.role === undefined
    ) {
      alert("Please select atleast 1 cluster");
      return;
    }
    const newInfo = {
      name,
      email,
      rollnumber,
      personalemail,
      branch,
      programme,
      cgpa,
      percentage10th,
      percentage12th,
      backlogs,
      phone,
      clusters: context?.info?.clusters,
      role: context?.info?.role,
      placed: context?.info?.placed,
    };
    axios.post(`${backendUrl}/api/updateInfo`, newInfo).then((res) => {
      context?.setInfo(newInfo);
    });
  };

  console.log("img", showAvatar);
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-white">
      {isUser ? (
        <>
          <div
            id="LBG"
            className="h-full w-full md:w-[30%] xl:w-1/4 bg-our-blue  flex flex-col items-center justify-center"
          >
            {/* <div className=" w-52 h-52 shrink-0 grow-0 bg-red-600 rounded-full">
             
             
            </div> */}
            {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-1"> */}

            {showAvatar === null || showAvatar.length === 0 ? (
              <div className="flex flex-wrap justify-center sm:w-1/2 lg:w-1/2 mt-1  pt-1 sm:pt-5">
                <div className="w-full px-4 pb-4  my-4">
                  <img
                    src={defaultuserimg}
                    alt="..."
                    className="w-20 md:w-32 lg:w-48 shadow rounded-full max-w-full h-auto align-middle border-none justify-center "
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center md:w-1/2 lg:w-1/2 mt-1  pt-1 sm:pt-5">
                <div className="w-full px-4 pb-4  my-4">
                  <img
                    src={`${backendUrl}/api/file/${showAvatar[0].docId}`}
                    alt="..."
                    className="w-20 md:w-32 lg:w-48 aspect-square shadow rounded-full max-w-full h-auto align-middle border-none justify-center"
                  />
                </div>
              </div>
            )}

            <div className="mt-5 grid-cols-1 gap-2 font-montserrat text-white text-xl    ">
              <div className="text-center">{name}</div>
              <div className="text-center">{email}</div>
              <div className="text-center">
                {branch}/{programme}
              </div>
            </div>
            {isPlaced ? (
              <div className="mt-20 bg-[#00cc00] text-lg font-montserrat text-white px-12 py-2 rounded-lg">
                Placed
              </div>
            ) : (
              <div className="mt-20 bg-[#d9d9d9] text-lg font-montserrat text-black px-12 py-2 rounded-lg">
                Placed
              </div>
            )}

            <div className="flex flex-row md:flex-row mt-2 sm:mt-10  bg-our-blue text-sm lg:text-lg font-montserrat h-36 w-fit  rounded-lg leading-1 ">
              <div
                className="bg-white border-2 h-full px-12 py-2"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {image ? <p>{image.name}</p> : <p>Click to select files</p>}
              </div>
              <button
                className="text-white bg-black rounded-lg px-4 py-2"
                onClick={handleAvatarUpload}
              >
                Upload
              </button>
              {/* </div> */}
            </div>
            {/* <div className="mt-36 bg-white text-black px-24 py-8 rounded-xl">
              <div className=" bg-[#46dab5] w-24 h-24 rounded-xl"></div>
              <div className=" text-lg text-our-blue font-montserrat">
                Change Profile Picture
              </div>
              <div className="text-red-500 text-lg font-montserrat">
                Upload Image
              </div>
              <div className=" text-base text-our-blue font-montserrat">
                .jpg/ .png/ .jpeg
              </div>
            </div> */}
          </div>

          <div className="RBG h-screen flex-1 flex items-center">
            <div className="absolute top-4 right-4 flex flex-col sm:flex-row justify-end">
              <a href="/login">
                <button className="float-left ml-2 mt-1 sm:mt-0 bg-white md:bg-our-blue hover:bg-blue-600 text-our-blue md:text-white text-sm font-bold rounded px-2 py-1">
                  LogOut
                </button>
              </a>
            </div>

            <div className="flex flex-col h-full  pr-0 xl:pr-40 mx-10 sm:mx-20 flex-1 ">
              <div className="pt-10 pb-10 font-montserrat text-3xl flex">
                <div className="text-our-bluedrop-shadow-lg shadow-black">
                  General Information
                  <hr className="w-1/2 mt-4 ml-2 h-[3px] bg-our-orange"></hr>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="w-full ">
                <div className="form ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">Name</div>
                      <div>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="First Name"
                          aria-label="First Name"
                        />
                      </div>
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={personalemail}
                        onChange={(e) => setPersonalemail(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        disabled
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="College Email"
                        aria-label="College Email"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={rollnumber}
                        onChange={(e) => setRollnumber(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="Roll Number"
                        aria-label="Roll Number"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="Branch"
                        aria-label="Branch"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={programme}
                        onChange={(e) => setProgramme(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="Programme"
                        aria-label="Programme"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(Number(e.target.value))}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="Phone No."
                        aria-label="Phone No."
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={backlogs}
                        onChange={(e) => setBacklogs(Number(e.target.value))}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="Backlogs"
                        aria-label="Backlogs"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={cgpa}
                        onChange={(e) => setCgpa(Number(e.target.value))}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="CGPA"
                        aria-label="CGPA"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={percentage10th}
                        onChange={(e) =>
                          setPercentage10th(Number(e.target.value))
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="10th Percentage"
                        aria-label="10th Percentage"
                      />
                    </div>

                    <div className="flex items-center border-b border-black my-4">
                      <input
                        value={percentage12th}
                        onChange={(e) =>
                          setPercentage12th(Number(e.target.value))
                        }
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                        type="text"
                        placeholder="12th Percentage"
                        aria-label="12th Percentage"
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex text-email justify-center my-5">
                  <button
                    type="submit"
                    className="flex-shrink-0 bg-our-blue hover:bg-black border-black hover:border-black 
                            text-sm border-4 text-white px-4 rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <div
            id="LBG"
            className="h-full w-1/4 bg-our-blue flex items-center justify-center relative"
          ></div> */}
          <div
            id="RBG"
            className="flex flex-col w-full h-screen my-auto items-center"
          >
            <form className="mt-3">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="py-4 pl-10 pr-48 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search by Name, Roll Number..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>

            <div className="container my-10 mx-4">
              {list.map((items: any) => (
                <UserTemplate items={items} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
