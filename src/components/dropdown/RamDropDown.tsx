
import React, {useEffect, useState} from "react";
import axios from "axios";
import {RamApi, useGetAllRamsQuery} from "../../api/ramApi";
import {useAppDispatch} from "../../api/store";
import {chooseProcessor, chooseRam} from "../../api/slices/componentsSlice";

export const RamDropDown = () => {
    const {data: rams, error, isLoading} = useGetAllRamsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const [componentList, setComponentList] = useState([]);
    const [isOkay, setIsOkay] = useState(false);
    const [answer, setAnswer] = useState("Everything is okay");
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useAppDispatch();
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: Failed to fetch motherboards data</p>;
    }


    const toggleDropdown = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.value;
        console.log(selectedIndex);
        const selectedObject = rams?.find(ram => ram.name === selectedIndex);
        if (selectedObject) {
            const result = await dispatch(chooseRam(selectedObject)).unwrap();
            setIsOpen(!isOpen);
            setAnswer(result);
            setSelectedValue(selectedIndex);
        }
    };

    return (
        <div>
            <div>
                <select className="text" onChange={toggleDropdown} value={selectedValue}>
                    {!selectedValue && <option value="" disabled hidden>Choose the element</option>}
                    {rams?.map(item => (
                        <option key={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>


    );
};


