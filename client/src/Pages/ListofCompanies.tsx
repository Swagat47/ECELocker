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
    documentTitle: `${data.rollnumber}_result`,
    onAfterPrint: () => alert("PDF Generated"),
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center content-center justify-center border-8 ">
        <PulseLoader color="#0f1129" />
      </div>
    );
  }

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
        ) : null}
      </div>
    </>
  );
};

export default StudentResultPage;
