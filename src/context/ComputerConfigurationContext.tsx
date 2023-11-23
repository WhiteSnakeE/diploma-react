import React, {createContext, useState} from "react";
import {Motherboard} from "../api/types/motherboard/Motherboard";
import {ComputerConfiguration} from "../api/types/ComputerConfiguration";
import {Processor} from "../api/types/processor/Processor";
import {Ram} from "../api/types/ram/Ram";

type ComputerContextProps = {
    children: React.ReactNode;
}

type MotherBoardContextType = {
    motherboard: Motherboard | null;
    setMotherboard: React.Dispatch<React.SetStateAction<Motherboard|null>>
    processor:Processor | null;
    setProcessor: React.Dispatch<React.SetStateAction<Processor|null>>
    ram:Ram|null;
    setRam: React.Dispatch<React.SetStateAction<Ram|null>>
}
export const ComputerContext = createContext<MotherBoardContextType| null>(null)

export const ComputerContextProvider = ({children}: ComputerContextProps) => {
    const [motherboard, setMotherboard] = useState<Motherboard | null>(null)
    const [processor, setProcessor] = useState<Processor | null>(null)
    const [ram, setRam] = useState<Ram | null>(null)
    return <ComputerContext.Provider value={{motherboard, setMotherboard, processor, setProcessor, ram, setRam}}>
        {children}
    </ComputerContext.Provider>
}