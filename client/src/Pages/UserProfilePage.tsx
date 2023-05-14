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

  const [companyName, setCompanyName] = useState("");
  const [companyCTC, setCompanyCTC] = useState("");
  const [placementYear, setPlacementYear] = useState("");
  const [placementCluster, setPlacementCluster] = useState("");
  const context = useContext(InfoContext); //context contains the user data

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
      const res = await axios.get(`${backendUrl}/api/company`);
      setPosts(res.data);
      setLoading(false);
    };
    getAllPosts();
    // console.log("items", items);
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
      {items.role === "user" ? (
        <div className="py-4 px-5 rounded-lg mb-4 shadow-lg bg-white mx-10 justify-between grid lg:grid-cols-4 lg:grid-rows-2 gap-1 md:grid-cols-2 md:grid-rows-4  grid-cols-1 grid-rows-8">
          <div className="">Roll No.: {items.rollnumber}</div>
          <div className="">Name: {items.name}</div>
          <div className="">Email: {items.personalemail}</div>
          <div className="">CGPA: {items.cgpa}</div>
          <div className="">Ph. No. : {items.phone}</div>
          <div className="">Backlogs : {items.backlogs}</div>
          <div className="">10th % : {items.percentage10th}</div>
          <div className="">12th % : {items.percentage12th}</div>
        </div>
      ) : null}
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
  const [searchValue, setSearchValue] = useState("");
  const [image, setImage] = useState(null as any);
  const [showAvatar, setShowAvatar] = useState(null as any);
  const [searchedUser, setSearchedUser] = useState(null as any);

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
    axios.get(`${backendUrl}/api/users`).then((response) => {
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
    console.log(searchValue, "searchedValue");
  }, [context?.info]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (context?.info?.role === undefined) {
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
      // clusters: context?.info?.clusters,
      clusters: [1],
      role: context?.info?.role,
      placed: context?.info?.placed,
    };
    axios.post(`${backendUrl}/api/updateInfo`, newInfo).then((res) => {
      context?.setInfo(newInfo);
      alert("Profile Updated Successfully");
    });
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    list.map((item: any) => {
      if (item.rollnumber === searchValue) {
        setSearchedUser(item);
      }
    });
  };
  useEffect(() => {
    console.log(searchValue);
    if (searchValue === "") {
      setSearchedUser(null);
    }
  }, [searchValue]);

  // console.log("img", showAvatar);
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-white overflow-x-hidden">
      {isUser ? (
        <>
          <div
            id="LBG"
            className="h-full w-full md:w-[30%] xl:w-1/4 bg-our-blue flex flex-col justify-between items-center"
          >
            {/* <div className=" w-52 h-52 shrink-0 grow-0 bg-red-600 rounded-full">
             
             
            </div> */}
            {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-1"> */}

            {showAvatar === null || showAvatar.length === 0 ? (
              <div className="flex flex-wrap justify-center sm:w-1/2 lg:w-1/2 mt-1 pt-1 sm:pt-5">
                <div className="w-full px-4 pb-4 my-4">
                  <img
                    src={defaultuserimg}
                    alt="..."
                    className="w-20 md:w-32 lg:w-48 shadow rounded-full max-w-full h-auto align-middle border-none justify-center "
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center md:w-1/2 lg:w-1/2 mt-1 pt-1 sm:pt-5">
                <div className="w-full px-4 pb-4  my-4">
                  <img
                    src={`${backendUrl}/api/file/${showAvatar[0].docId}`}
                    alt="..."
                    className="w-20 md:w-32 lg:w-48 aspect-square shadow rounded-full max-w-full h-auto align-middle border-none justify-center"
                  />
                </div>
              </div>
            )}

            <div className="grid-cols-1 gap-2 font-montserrat text-white text-xl">
              <div className="text-center">{name}</div>
              <div className="text-center">{email}</div>
              <div className="text-center">{programme}</div>
            </div>

            <div className="h-1/6">
              {/*this div is added to add some space */}
            </div>
            {/* {isPlaced ? (
              <div className="mt-20 bg-[#00cc00] text-lg font-montserrat text-white px-12 py-2 rounded-lg">
                Placed
              </div>
            ) : (
              <div className="mt-20 bg-[#d9d9d9] text-lg font-montserrat text-black px-12 py-2 rounded-lg">
                Placed
              </div>
            )} */}

            <div className="flex flex-col bg-our-blue text-sm lg:text-lg font-montserrat h-36 w-full rounded-lg">
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
                <button className="float-left ml-2 mt-1 sm:mt-0 bg-white md:bg-our-blue hover:bg-blue-600 text-our-blue md:text-white text-sm rounded px-4 py-2">
                  Log Out
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

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">
                        Personal Email
                      </div>
                      <div>
                        <input
                          value={personalemail}
                          onChange={(e) => setPersonalemail(e.target.value)}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="Email"
                          aria-label="Email"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">
                        College Email
                      </div>
                      <div>
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
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">Roll Number</div>
                      <div>
                        <input
                          value={rollnumber}
                          onChange={(e) => setRollnumber(e.target.value)}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="Roll Number"
                          aria-label="Roll Number"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">Branch</div>
                      <div>
                        <input
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="Branch"
                          aria-label="Branch"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">Programme</div>
                      <div>
                        <input
                          value={programme}
                          onChange={(e) => setProgramme(e.target.value)}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="Programme"
                          aria-label="Programme"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">
                        Phone Number
                      </div>
                      <div>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(Number(e.target.value))}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="Phone No."
                          aria-label="Phone No."
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">Backlogs</div>
                      <div>
                        <input
                          value={backlogs}
                          onChange={(e) => setBacklogs(Number(e.target.value))}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="Backlogs"
                          aria-label="Backlogs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">CGPA</div>
                      <div>
                        <input
                          value={cgpa}
                          onChange={(e) => setCgpa(Number(e.target.value))}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-lg font-montserrat"
                          type="text"
                          placeholder="CGPA"
                          aria-label="CGPA"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">
                        10th Percentage
                      </div>
                      <div>
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
                    </div>

                    <div className="flex flex-col items-start border-b border-black my-4">
                      <div className="px-2 text-xxs font-bold">
                        12th Percentage
                      </div>
                      <div>
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
                </div>
                <div className=" flex text-email justify-center my-5">
                  <button
                    type="submit"
                    className="flex-shrink-0 bg-our-blue hover:bg-black border-black hover:border-black 
                            text-sm border-4 text-white px-4 py-2 rounded"
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
            <form className="mt-3" onSubmit={handleSearch}>
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
                  placeholder="Search by Roll Number..."
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="container my-10 mx-4">
              {!searchedUser ? (
                list.map((items: any) => <UserTemplate items={items} />)
              ) : (
                <UserTemplate items={searchedUser} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
