
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ProcessorsApi, useGetAllProcessorsQuery} from "../../api/proccessorsApi";
import {
    chooseMotherboard,
    chooseProcessor,
    chooseRam,
    motherBoardCompatibilitySlice
} from "../../api/slices/componentsSlice";
import {useAppDispatch} from "../../api/store";
import {ComputerContext} from "../../context/ComputerConfigurationContext";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const motherboardContext = useContext(ComputerContext)
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
        console.log(motherboardContext?.processor)
        const selectedIndex = event.target.value;
        console.log(selectedIndex);
        const selectedObject = processors?.find(processor => processor.name === selectedIndex);
        if (selectedObject) {
            dispatch(motherBoardCompatibilitySlice.actions.addProcessorStatus(selectedObject));
            motherboardContext?.setProcessor(selectedObject)
            const updatedConfiguration = motherBoardCompatibilitySlice.reducer(
                {
                    motherboard: motherboardContext?.motherboard,
                    processor: motherboardContext?.processor,
                    ram: motherboardContext?.ram

                }, // initialState будет автоматически взято из редуктора
                motherBoardCompatibilitySlice.actions.addProcessorStatus(selectedObject)
            );

            console.log(updatedConfiguration);

            // Можно также использовать updatedConfiguration для отправки по chooseMotherboard
            const result = await dispatch(chooseProcessor(updatedConfiguration)).unwrap();

            setIsOpen(!isOpen);
            if (result.processor?.status) {
                setAnswer(result.processor.status);
            }
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
