
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ProcessorsApi, useGetAllProcessorsQuery} from "../../api/proccessorsApi";
import {
    chooseConfiguration, configurationCompatibilitySlice,

} from "../../api/slices/componentsSlice";
import {useAppDispatch} from "../../api/store";
import {ComputerContext} from "../../context/ComputerConfigurationContext";
import {StatusComponent} from "../Status/StatusComponent";
import {ComputerConfiguration} from "../../api/types/ComputerConfiguration";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const motherboardContext = useContext(ComputerContext)
    const [configuration, setConfiguration] = useState<ComputerConfiguration>()
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
            dispatch(configurationCompatibilitySlice.actions.addProcessorStatus(selectedObject));
            motherboardContext?.setProcessor(selectedObject)
            const updatedConfiguration = configurationCompatibilitySlice.reducer(
                {
                    motherboard: motherboardContext?.motherboard,
                    processor: motherboardContext?.processor,
                    ram: motherboardContext?.ram

                }, // initialState будет автоматически взято из редуктора
                configurationCompatibilitySlice.actions.addProcessorStatus(selectedObject)
            );

            const result = await dispatch(chooseConfiguration(updatedConfiguration)).unwrap();
            setConfiguration(result)
            motherboardContext?.setProcessor(result.processor)
            motherboardContext?.setMotherboard(result.motherboard)
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
                    {motherboardContext?.processor?.status}
                </div>
            </div>
        </div>
    );
};
