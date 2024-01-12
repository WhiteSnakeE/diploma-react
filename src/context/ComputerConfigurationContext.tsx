import React, {createContext, ReactNode} from "react";
import {useDispatch, useStore} from "react-redux";
import {Dispatch, Store} from "@reduxjs/toolkit";

type ComputerContextProps = {
    children: ReactNode;
}

type ComputerContextType = {
    store: Store;
    dispatch: Dispatch;
}
export const ComputerContext = createContext<ComputerContextType| null>(null)

export const ComputerContextProvider = ({children}: ComputerContextProps) => {
    const store = useStore()
    const dispatch = useDispatch()
    return <ComputerContext.Provider value={{store, dispatch}}>
        {children}
    </ComputerContext.Provider>
}