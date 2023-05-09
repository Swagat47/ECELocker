import campus from "../frontend_Reference/campus.png"
import nithlogo from "../frontend_Reference/nit-hamirpurlogo.png"
import userlogo from "../frontend_Reference/profileuser.png"
import recruiterlogo from "../frontend_Reference/buildings.png"
import opportunitylogo from "../frontend_Reference/money.png"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import axios from "axios"
import { backendUrl } from "../config"
import { ExportToCsv } from "export-to-csv";


const StatisticsPage = () => {
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);
    const [yearList, setYearList] = useState([] as any);
    const [maxYear, setMaxYear] = useState(0);
    const [branchDict, setBranchDict] = useState({} as any);
    const [clusterDict, setClusterDict] = useState({} as any);

    const getYears = () => {
        axios.get(`${backendUrl}/api/statistics/get_year_stats`)
            .then((res) => {
                const year_data = res.data.map((item: any) => item._id.year)
                setYearList(year_data)
                yearList.sort().reverse()
                const max_year = Math.max(...year_data)
                setMaxYear(max_year)
            })
    }

    const getCurrentYearStats = () => {
        if(maxYear)
            // var branch_dict = {'Computer Science (B.Tech)': 0,
            //     'Computer Science (Dual)': 0,
            //     'Electronics and Communication (B.Tech)': 0,
            //     'Electronics and Communication (Dual Degree)': 0,
            //     'Mechanical': 0,
            //     'Civil': 0,
            //     'Chemical': 0,
            //     'Electrical': 0,
            //     'Material Science': 0
            // }
            axios.post(`${backendUrl}/api/statistics/filter`, { year: maxYear })
                // .then((res) => {
                //     branch_dict = res.data.reduce((acc: any, item: any) => {
                //         acc[item.branch] += 1
                //         return acc
                //     }, branch_dict)
                //     console.log("var",branch_dict)
                // })
                // .finally(() => {
                //     setBranchDict(branch_dict)
                //     //console.log("state",branchDict)
                // })
                .then((res) => {
                    setBranchDict(res.data.reduce((acc: any, item: any) => {
                        acc[item.branch] += 1
                        return acc
                    }, {'Computer Science (B.Tech)': 0,
                        'Computer Science (Dual)': 0,
                        'Electronics and Communication (B.Tech)': 0,
                        'Electronics and Communication (Dual Degree)': 0,
                        'Mechanical': 0,
                        'Civil': 0,
                        'Chemical': 0,
                        'Electrical': 0,
                        'Material Science': 0
                    }))

                    setClusterDict(res.data.reduce((acc: any, item: any) => {
                        acc[item.cluster] += 1
                        return acc
                    } , {'1': 0,
                        '2': 0,
                        '3': 0,
                        '4': 0,
                        '5': 0,
                        '6': 0,
                    }))

                })

    }


    useEffect(() => {
        getYears();
    }, [])

    useEffect(() => {
        getCurrentYearStats();
    }, [maxYear])


    return (
        <div className="BG h-screen w-screen">
            {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
                <div className="flex col-span-10">
                    <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full">
                            <div className="text-navbigtext">Statistics</div>
                        </div>
                        <div className="flex items-center text-navtext h-full">
                            <Link to="/"><div>Home</div></Link>
                        </div>
                    </div>
                </div>

            </div> */}
            <nav>
                    <div className="flex justify-between self-end gap-6 bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full overflow-y-hidden invisible sm:visible">
                        <div className="text-navbigtext">Statistics</div>
                        </div>
                        <div className="flex items-center text-navtext h-full py-2">
                            <Link to="/"><div>Home</div></Link>
                        </div>
                    </div>
                </nav>
            <React.Fragment>
                <div className="container-fluid mb-3">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap mx-2">
                            {/* <h3 className="mt-3">Placed Students </h3> */}
                            <div className="w-full  xl:w-1/2 p-2">
                                <Chart
                                    type="pie"
                                    // width={450}
                                    height={350}
                                    margin={
                                        15
                                    }

                                    series={[branchDict['Computer Science (B.Tech)'], branchDict['Computer Science (Dual)'], branchDict['Electronics and Communication (B.Tech)'], branchDict['Electronics and Communication (Dual Degree)'], branchDict['Mechanical'], branchDict['Civil'], branchDict['Chemical'], branchDict['Electrical'], branchDict['Material Science']]}
                                    //series={[5, 30, 90, 160, 60, 12, 5, 30, 90]}
                                    options={{
                                        plotOptions: {
                                            pie: {
                                              customScale: 0.8
                                            }
                                          },
                                        legend: {
                                            position: "right",
                                            containerMargin: {
                                                left: 30,
                                                top: 30,
                                                
                                              }
                                          },
                                        responsive: [
                                            {
                                              breakpoint: 500,
                                              options: {
                                                
                                                legend: {
                                                  position: "bottom"
                                                }
                                              }
                                            }
                                          ],
                                        title: {
                                            text: "Placed students percent on the basis of branches"
                                        },
                                        noData: { text: "Empty Data" },
                                        // colors:["#f90000","#f0f"],
                                        
                                        labels: ['Computer Science (B.Tech)', 'Computer Science (Dual)', 'Electronics and Communication (B.Tech)', 'Electronics and Communication (Dual Degree)', 'Mechanical', 'Civil', 'Chemical', 'Electrical', 'Material Science']

                                    }}
                                >
                                </Chart>
                            </div>
                            <div className="w-full  xl:w-1/2 p-2">
                                <Chart
                                    type="bar"
                                    // width={450}
                                    height={350}

                                    series={[
                                        {
                                            name: "students placed",
                                            data: [clusterDict['1'], clusterDict['2'], clusterDict['3'], clusterDict['4'], clusterDict['5'], clusterDict['6']]
                                        },
                                    ]}

                                    options={{
                                        title: {
                                            text: "Placed students on the basis of clusters"
                                        },
                                        noData: { text: "Empty Data" },
                                        // colors:["#f90000","#f0f"],
                                        labels: ['cluster 1', 'cluster 2', 'cluster 3', 'cluster 4', 'cluster 5', 'cluster 6']

                                    }}
                                >
                                </Chart></div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
            <div className="grid grid-cols-none">
                {yearList.map((items: any) => (
                    <StatisticBlock
                        year={items}
                    />
                ))}
            </div>
        </div>

    );
};

const StatisticBlock = ({ year }: { year: any }) => {

    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: `NITH Placement Statictics Year ${year}`,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename:`NITH Placement Statictics Year ${year}` ,
      }
    const csvExporter = new ExportToCsv(options);

    const makeStatisticExcel = () => {
        axios.post(`${backendUrl}/api/statistics/filter`,{year:year})
            .then((res) => {
                csvExporter.generateCsv(res.data);
            })
    }

    return (
        <div className=" bg-gray-50 p-4 rounded-lg  rounded mb-4 shadow-lg bg-white hover:bg-blue-500 active:bg-blue-700">
            <div onClick={makeStatisticExcel} className="text-black transition duration-300 ease-in-out select-none ">Batch {year} Placements Statistics</div>
        </div>
    );
};


export default StatisticsPage;