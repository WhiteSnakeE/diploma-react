import React, {ReactNode, useState} from 'react';
import {Ram} from "../../api/types/ram/Ram";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./ComponentCount.css"
export const ComponentCount = () => {

    const [number, setNumber] = useState(1);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();
    const ram = useSelector((state: RootState) => state.configurationCompatibility.ram);

    const changeCount = (newNumber: number) => {
        if (newNumber !== 0) {
            setNumber(newNumber);
            const updatedRam = {...ram, count: newNumber} as Ram;
            const updatedConfig = {
                ...configuration,
                ram: updatedRam
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    }

    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    changeCount(number - 1);
                }}
            >-</button>
            <input className="input-field" value={number}/>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    changeCount(number + 1);
                }}
            >+</button>
        </div>
    );
}
