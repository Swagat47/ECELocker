import React from "react";

function ResultTable(semdata: any) {
  const data = semdata.semdata;
  // console.log(data, "result table data");
  return (
    <div className="relative overflow-x-auto mb-2">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              COURSE
            </th>
            <th scope="col" className="px-6 py-3">
              COURSE CODE
            </th>
            <th scope="col" className="px-6 py-3">
              CREDITS
            </th>
            <th scope="col" className="px-6 py-3">
              GRADE
            </th>
            <th scope="col" className="px-6 py-3">
              SUB GP
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row[0]}
                </th>
                <td className="px-6 py-4">{row[1]}</td>
                <td className="px-6 py-4">{row[2]}</td>
                <td className="px-6 py-4">{row[3]}</td>
                <td className="px-6 py-4">{row[4]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
