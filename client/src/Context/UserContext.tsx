
import React, { createContext, useState } from "react";

type InfoContextProviderProps = {
    children: React.ReactNode;
};

export type InfoUser = {
    name: string,
    email: string,
    rollnumber: string,
    personalemail: string,
    branch: string,
    programme: string,
    cgpa: number,
    percentage10th: number,
    percentage12th: number,
    backlogs: number,
    phone: number
    role: string,
    placed: boolean,
    clusters: number[],
}
type InfoContextType = {
    info: InfoUser | null;
    setInfo: React.Dispatch<React.SetStateAction<InfoUser | null>>
};

export const InfoContext = createContext<InfoContextType | null>(null);

export const InfoProvider = ({ children }: InfoContextProviderProps) => {
    const [info, setInfo] = useState<InfoUser | null>(null);

    return (
        <InfoContext.Provider value={{info,setInfo}}>
            {children}
        </InfoContext.Provider>
    );
};