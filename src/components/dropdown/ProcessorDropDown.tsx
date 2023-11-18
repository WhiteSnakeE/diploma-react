
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ProcessorsApi, useGetAllProcessorsQuery} from "../../api/proccessorsApi";
import {chooseMotherboard, chooseProcessor} from "../../api/slices/componentsSlice";
import {useAppDispatch} from "../../api/store";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const [componentList, setComponentList] = useState([]);
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
        const selectedObject = processors?.find(processor => processor.name === selectedIndex);
        if (selectedObject) {
            const result = await dispatch(chooseProcessor(selectedObject)).unwrap();
            setIsOpen(!isOpen);
            setAnswer(result);
            setSelectedValue(selectedIndex);
        }
    };

    return (
        <div>
            <div>
                <select  className="text"  onChange={toggleDropdown} value={selectedValue}>
                    {!selectedValue && <option value="" disabled hidden>Choose the element</option>}
                    {processors?.map(item => (
                        <option key={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <div>
                    {answer}
                </div>
            </div>
        </div>


    );
};
