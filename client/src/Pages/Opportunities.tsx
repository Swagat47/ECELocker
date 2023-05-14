import campus from "../frontend_Reference/campus.webp";
import { backendUrl } from "../config";
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png";
import userlogo from "../frontend_Reference/profileuser.png";
import recruiterlogo from "../frontend_Reference/buildings.png";
import opportunitylogo from "../frontend_Reference/money.png";
import { Link } from "react-router-dom";
import { InfoContext } from "../Context/UserContext";
import React, { useContext, useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
// const OpportunitiesPage = () => {
//   const context = useContext(InfoContext);
//   const [click, setClick] = useState(false);
//   const closeMobileMenu = () => setClick(false);
//   const [data, setData] = React.useState([]);
//   const [error, setError] = React.useState(null);
//   const [errorText, setErrorText] = React.useState(false);
//   const [selectedCategory, setSelectedCategory] = useState();
//   const [list, setList] = useState([] as any);
//   const [companyList, setCompanyList] = useState([] as any);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [rollnumber, setRollnumber] = useState("");
//   const [personalemail, setPersonalemail] = useState("");
//   const [branch, setBranch] = useState("");
//   const [programme, setProgramme] = useState("");
//   const [cgpa, setCgpa] = useState(0);
//   const [percentage10th, setPercentage10th] = useState(0);
//   const [percentage12th, setPercentage12th] = useState(0);
//   const [backlogs, setBacklogs] = useState(0);
//   const [phone, setPhone] = useState(0);
//   const [userClusters, setUserClusters] = useState([] as any);

//   const [appliedCompanies, setAppliedCompanies] = useState([] as any);

//   useEffect(() => {
//     if (!context?.info) return;
//     axios
//       .post(`${backendUrl}/api/company/get_user_companys`, {
//         user_email: context?.info.email,
//       })
//       .then((res) =>
//         setAppliedCompanies(res.data.map((item: any) => item.company_id))
//       );
//     setName(context?.info.name);
//     setEmail(context?.info.email);
//     setRollnumber(context?.info.rollnumber);
//     setPersonalemail(context?.info.personalemail);
//     setBranch(context?.info.branch);
//     setProgramme(context?.info.programme);
//     setCgpa(context?.info.cgpa);
//     setPercentage10th(context?.info.percentage10th);
//     setPercentage12th(context?.info.percentage12th);
//     setBacklogs(context?.info.backlogs);
//     setPhone(context?.info.phone);
//     setUserClusters(context?.info.clusters);
//   }, [context?.info]);
//   // const list = [
//   //     {name:"Google",branches:"ECE/EE",location:"Bangalore",cluster:"6",ctc:"45 lpa",link:"/companydetail"},
//   //     {name:"EXL",branches:"Civil",location:"Delhi",cluster:"2",ctc:"5 lpa",link:"/companydetailexl"},
//   //     {name:"Amazon",branches:"CSE/ECE/EE",location:"Bangalore",cluster:"4",ctc:"12 lpa",link:"/companydetailamazon"},
//   //     {name:"Yellow.AI",branches:"ECE/EE",location:"Bangalore",cluster:"4",ctc:"16 lpa",link:"/companydetailyellow"},
//   //     {name:"Wells Fargo",branches:"CSE/ECE/EE",location:"Bangalore",cluster:"4",ctc:"24 lpa",link:"/companydetailwells"},
//   //     {name:"Samsung",branches:"ECE/EE",location:"Bangalore",cluster:"5",ctc:"20 lpa",link:"/companydetailsam"},
//   //     {name:"Reliance",branches:"All",location:"Bangalore",cluster:"2",ctc:"6 lpa",link:"/companydetailrel"},
//   //     {name:"Media.NET",branches:"ECE/EE",location:"Bangalore",cluster:"5",ctc:"20 lpa",link:"/companydetailmed"},
//   // ];

//   // React.useEffect(() => {
//   //     axios
//   //         .get("http://localhost:4000/api/company")
//   //         .then((response) => {
//   //             setData(response.data);
//   //             console.log(response.data);
//   //         });
//   // }, []);
//   useEffect(() => {
//     axios.get(`${backendUrl}/api/company`).then((response) => {
//       const data = response.data;
//       data.forEach((item: any) => {
//         item.branches = item.branches.join("/");
//       });
//       setList(response.data);
//     });
//   }, []);
//   const filterCompanies = list.filter(function (company: {
//     name: String;
//     cgpa: Number;
//     percentage10: Number;
//     percentage12: Number;
//     branches: String[];
//     cluster: Number;
//   }): boolean {
//     return (
//       company.cgpa <= cgpa &&
//       company.percentage10 <= percentage10th &&
//       company.percentage12 <= percentage12th &&
//       backlogs < 1 &&
//       company.branches.includes(branch) &&
//       userClusters.includes(company.cluster)
//     );
//   });
//   return (
//     <div className="BG h-screen w-screen">
//       {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
//                 <div className="flex col-span-10">
//                     <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
//                         <div className="flex items-center text-navtext h-full invisible sm:visible">
//                             <div className="text-navbigtext">Opportunities</div>
//                         </div>
//                         <div className="flex items-center text-navtext h-full">
//                             <Link to="/">
//                                 <div>Home</div>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//       <nav>
//         <div className="flex justify-between self-end gap-4 bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
//           <div className="flex items-center text-navtext h-full overflow-y-hidden invisible sm:visible">
//             <div className="text-navbigtext">Opportunities</div>
//           </div>
//           <div className="flex items-center text-navtext h-full py-2">
//             <Link to="/">
//               <div>Home</div>
//             </Link>
//           </div>
//         </div>
//       </nav>
//       <div className="container mx-auto">
//         <div className="flex flex-wrap -mx-4">
//           {filterCompanies.map((items: any) => (
//             <CardTemplate items={items} appliedCompanies={appliedCompanies} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CardTemplate = ({
//   items,
//   appliedCompanies,
// }: {
//   items: any;
//   appliedCompanies: any;
// }) => {
//   const context = useContext(InfoContext);
//   const [applied, setApplied] = useState(false);

//   const [user_email, setUser_email] = useState("");

//   useEffect(() => {
//     if (!context?.info) return;
//     setUser_email(context?.info.email);
//   }, [context?.info]);

//   const handleApply = (e: any) => {
//     e.preventDefault();
//     if (appliedCompanies.includes(items._id)) {
//       alert("You have already applied to this company");
//       return;
//     }
//     const data = {
//       user_email: user_email,
//       company_id: items._id,
//     };
//     axios.post(`${backendUrl}/api/company/register_user_company`, data);
//     setApplied(true);
//     alert("Resume has been sent !");
//   };
//   return (
//     <div key={items} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
//       <Link
//         to={"/companydetail"}
//         state={{ items }}
//         className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
//       >
//         <div className="relative pb-48 overflow-hidden">
//           <img
//             className="absolute inset-0 h-full w-full object-cover"
//             src={campus}
//             alt=""
//           ></img>
//         </div>
//         <div className="p-4">
//           <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
//             {items.name}
//           </span>
//           <h2 className="mt-2 mb-2  font-bold">Branches: {items.branches}</h2>
//           <p className="text-sm">Location: {items.location}</p>
//           <div className="mt-3 flex items-center">
//             <span className="text-sm font-semibold">
//               Cluster: {items.cluster}{" "}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t border-b text-xs text-gray-700">
//           <span className="flex items-center">
//             <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
//             CTC: {items.ctc} LPA
//           </span>
//         </div>
//         <button
//           onClick={handleApply}
//           className={`p-1.5 border-t border-b text-lg justify-center ${
//             applied || appliedCompanies.includes(items._id)
//               ? "bg-green-400 text-white"
//               : "bg-orange-200 text-gray-900"
//           }  hover:opacity-70 w-full`}
//         >
//           <span className="flex items-center justify-center">
//             <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
//             APPLY
//           </span>
//         </button>
//       </Link>
//     </div>
//   );
// };

const OpportunitiesPage = () => {
  const context = useContext(InfoContext);
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState("");
  const [isUser, setIsUser] = useState(true);

  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    axios.get(`${backendUrl}/api/notes`).then((res) => setNotes(res.data));
  };

  useEffect(() => {
    fetchNotes();
    if (!context?.info) return;
    setIsUser(context.info.role === "user" ? true : false);
  }, []);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = (e: any) => {
    e.preventDefault();
    const config = { headers: { Accept: "application/json" } };
    const formData = new FormData();
    formData.append("file", file);
    if (!loading) setLoading(true);
    axios
      .post(`${backendUrl}/api/notes/upload`, formData, config)
      .then((res) => fetchNotes())
      .catch((err) => console.log(err.response.data))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id: any) => {
    if (!loading) setLoading(true);
    axios
      .delete(`${backendUrl}/api/notes/${id}`)
      .then((res) => fetchNotes())
      .catch((err) => console.log(err.response.data))
      .finally(() => setLoading(false));
  };

  return (
    <div className="BG h-screen w-screen">
      {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
                <div className="flex col-span-10">
                    <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full">
                            <div className="text-navbigtext">Notices</div>
                        </div>
                        <div className="flex items-center text-navtext h-full">
                            <Link to="/">
                                <div>Home</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
      <nav>
        <div className="flex justify-between self-end gap-6 bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
          <div className="flex items-center text-navtext h-full overflow-y-hidden invisible sm:visible">
            <div className="text-navbigtext">Study Material</div>
          </div>
          <div className="flex items-center text-navtext h-full py-2">
            <Link to="/">
              <div>Home</div>
            </Link>
          </div>
        </div>
      </nav>
      <div className=" flex-col items-center justify-center py-4">
        <div className="flex flex-col gap-4">
          <input
            className="border text-white bg-black rounded-lg px-4 py-2"
            type="file"
            accept="pdf/*"
            id="file"
            onChange={handleChange}
          />
          <button
            className="text-white bg-black rounded-lg px-4 py-2"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>

        {loading ? (
          <div className="h-10 flex items-center justify-center">
            <PulseLoader color="#0f1129" />
          </div>
        ) : null}

        <div className="flex flex-col w-full">
          {notes?.map((notes: any) => (
            <Notes notes={notes} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

function Notes({ notes, handleDelete }: any) {
  const context = useContext(InfoContext);
  const [isUser, setIsUser] = useState(true);
  useEffect(() => {
    if (!context?.info) return;
    setIsUser(context.info.role === "user" ? true : false);
  }, []);
  return (
    <div
      key={notes._id}
      className="flex justify-between h-16 border-2 flex-1 rounded-xl hover:shadow-md px-6 m-4"
    >
      <a
        href={`${backendUrl}/api/file/${notes.docId}`}
        target="blank"
        rel="noreferrer"
        className="flex items-center w-full p-4"
      >
        {notes.name}
      </a>
      {isUser ? null : (
        <button
          className="text-white bg-black rounded-lg px-4 w-48 py-1 my-2"
          onClick={() => handleDelete(notes.docId)}
        >
          Delete Notes
        </button>
      )}
    </div>
  );
}

export default OpportunitiesPage;
