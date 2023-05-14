import { Link } from "react-router-dom";
import { InfoContext } from "../Context/UserContext";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { resultUrl } from "../config";
import ResultTable from "../Components/ResultTable";
import { PulseLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";

const StudentResultPage = () => {
  const context = useContext(InfoContext);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([] as any);
  const componentPDF = useRef(null);

  useEffect(() => {
    axios
      .get(`${resultUrl}/${context?.info?.rollnumber}.json`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `${data?.rollnumber}_result`,
    onAfterPrint: () => alert("PDF Generated"),
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center content-center justify-center border-8 ">
        <PulseLoader color="#0f1129" />
      </div>
    );
  }
  const handleSearch = (e: any) => {
    e.preventDefault();
    // setLoading(true);
    console.log(searchValue);
    // setLoading(false);
  };
  return (
    <>
      <div>
        <nav>
          <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-10">
            <div className="flex items-center text-navtext h-full overflow-y-hidden invisible sm:visible ">
              <div className="text-navbigtext ">Result Page</div>
            </div>
            <div className="flex items-center text-navtext h-full mt-2">
              <Link to="/">
                <div>Home</div>
              </Link>
            </div>
          </div>
        </nav>
        {context?.info?.role === "user" ? (
          <>
            <div className="flex place-content-end mr-20 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={generatePDF}
              >
                PRINT
              </button>
            </div>
            <div
              ref={componentPDF}
              style={{
                width: "100%",
                margin: "0",
                padding: "0",
                overflow: "hidden",
              }}
              className="flex flex-col justify-center items-center"
            >
              <div className="grid grid-cols-2 mt-4 font-montserrat text-xl font-bold w-3/6">
                <div>
                  <article className="border-2">
                    ROLL NUMBER: <span>{data._id}</span>
                  </article>
                  <article className="border-2">
                    CGPI: <span>{data.cgpi}</span>
                  </article>
                </div>
                <div>
                  <article className="border-2">
                    NAME: <span>{data.name}</span>
                  </article>
                  <article className="border-2">
                    LATEST SGPI: <span>{data.sgpi}</span>
                  </article>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                {data.result.map((sem: any) => {
                  if (sem === null) return null;
                  return <ResultTable semdata={sem} />;
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSearch}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div className=" flex justify-center mt-3">
                <div className="relative w-2/5">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 "
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
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search Roll Number"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default StudentResultPage;
