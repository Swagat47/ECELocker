import { Link } from "react-router-dom";
import { InfoContext } from "../Context/UserContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { resultUrl } from "../config";
import ResultTable from "../Components/ResultTable";

const StudentResultPage = () => {
  const context = useContext(InfoContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([] as any);
  useEffect(() => {
    axios
      .get(`${resultUrl}/${context?.info?.rollnumber}.json`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        // console.log(response.data);
      });
  }, []);

  if (isLoading) {
    return <div className="justify-center">Loading...</div>;
  }

  return (
    <div className="bg-slate-500">
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

      <div className="flex flex-col mt-1 pl-2">
        <article>
          ROLL NUMBER: <span>{data._id}</span>
        </article>
        <article>
          NAME: <span>{data.name}</span>
        </article>
        <article>
          CGPI: <span>{data.cgpi}</span>
        </article>
        <article>
          LATEST SGPI: <span>{data.sgpi}</span>
        </article>
      </div>
      {data.result.map((sem: any) => {
        if (sem === null) return null;
        return <ResultTable semdata={sem} />;
      })}
    </div>
  );
};

export default StudentResultPage;
