import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from "../config";
import { InfoContext } from "../Context/UserContext";
import { PulseLoader } from "react-spinners";
import { height, margin } from "@mui/system";

const ResumePage = () => {
    const [resume, setResume] = useState([]);
    const [file, setFile] = useState("");

    const [loading, setLoading] = useState(false);
    const context = useContext(InfoContext);

    const fetchResumes = async () => {
        if(context?.info?.email === undefined) return;
        axios
            .post(`${backendUrl}/api/resume`,{email:context?.info?.email})
            .then((res) => setResume(res.data));
    };

    useEffect(() => {
        fetchResumes();
    }, [context]);

    const handleChange = (e: any) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleUpload = (e: any) => {
        e.preventDefault();
        const config = { headers: { Accept: "application/json" } };
        const formData = new FormData();
        formData.append("file", file);
        if(context?.info?.email === undefined) return;
        formData.append("email", context?.info?.email);
        if(!loading)setLoading(true);
        axios
            .post(`${backendUrl}/api/resume/upload`, formData, config)
            .then((res) => {fetchResumes()})
            .catch((err) => console.log(err.response.data))
            .finally(() => setLoading(false));
    };

    const handleDelete = (id: any) => {
        if(!loading)setLoading(true);
        axios
            .delete(`${backendUrl}/api/resume/${id}`)
            .then((res) => {fetchResumes()})
            .catch((err) => console.log(err.response.data))
            .finally(() => setLoading(false));
    };

    return (
        <div className="BG h-screen w-screen">
            {/* <div className="Header w-screen h-[13%] grid grid-cols-10">
                <div className="flex col-span-10">
                    <div className="flex justify-between self-end bg-our-blue text-white font-robotoslab font-medium w-full h-3/4 px-20">
                        <div className="flex items-center text-navtext h-full invisible sm:visible">
                            <div className="text-navbigtext">Resume</div>
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
                            <div className="text-navbigtext">Resume</div>
                        </div>
                        <div className="flex items-center text-navtext h-full py-2">
                            <Link to="/"><div>Home</div></Link>
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
                { loading ? (
                    <div className="h-10 flex items-center justify-center">
                        <PulseLoader  color="#0f1129" />
                    </div>
                ) : null}
                <div className="flex flex-col w-full">
                    {resume?.map((resume: any) => (
                        <Resume resume={resume} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    );
};

function Resume({ resume, handleDelete }: any) {
    return (
        <div
            key={resume._id}
            className="flex justify-between h-16 border-2 flex-1 rounded-xl hover:shadow-md px-6 m-4"
        >
            <a
                href={`${backendUrl}/api/file/${resume.docId}`}
                target="blank"
                rel="noreferrer"
                className="flex items-center w-full p-4"
            >
                {resume.name}
            </a>
            <button
                className="text-white bg-black rounded-lg px-4 w-48 py-1 my-2"
                onClick={() => handleDelete(resume.docId)}
            >
                Delete Resume
            </button>
        </div>
    );
}

export default ResumePage;
