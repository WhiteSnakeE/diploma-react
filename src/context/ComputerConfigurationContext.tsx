import React, {createContext, useState} from "react";
import {MotherBoard} from "../api/types/motherboard/MotherBoard";
import {ComputerConfiguration} from "../api/types/ComputerConfiguration";

type ComputerContextProps = {
    children: React.ReactNode;
}

type MotherBoardContextType = {
    motherboard: MotherBoard | null;
    setMotherboard: React.Dispatch<React.SetStateAction<MotherBoard|null>>
}
export const ComputerContext = createContext<MotherBoardContextType| null>(null)

export const ComputerContextProvider = ({children}: ComputerContextProps) => {
    const [motherboard, setMotherboard] = useState<MotherBoard | null>(null)
    return <ComputerContext.Provider value={{motherboard, setMotherboard}}>
        {children}
    </ComputerContext.Provider>
}