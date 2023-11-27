
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
import {StatusComponent} from "../Status/StatusComponent";
import {ComputerConfiguration} from "../../api/types/ComputerConfiguration";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const motherboardContext = useContext(ComputerContext)
    const [configuration,setConfiguration] = useState<ComputerConfiguration>()

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

            const result = await dispatch(chooseProcessor(updatedConfiguration)).unwrap();
            setConfiguration(result)
            motherboardContext?.setProcessor(result.processor)
            console.log(result.motherboard?.status)
            console.log(result.processor?.status)
            console.log(result)
            setIsOpen(!isOpen);
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
                    <StatusComponent configuration={configuration}/>
                </div>
            </div>
        </div>
    );
};
