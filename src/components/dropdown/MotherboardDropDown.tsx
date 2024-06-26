import {MotherboardApi, useGetAllMotherBoardsQuery} from "../../api/motherboardApi";
import React, {useContext, useEffect, useState} from "react";
import {useAppDispatch} from "../../api/store";
import {ComputerContext} from "../../context/ComputerConfigurationContext";
import {
    chooseMotherboard,
    chooseProcessor,
    chooseRam,
    motherBoardCompatibilitySlice
} from "../../api/slices/componentsSlice";
import {StatusComponent} from "../Status/StatusComponent";
import {ComputerConfiguration} from "../../api/types/ComputerConfiguration";




export const MotherboardDropDown: React.FC = () => {
    const {data: motherboards, error, isLoading} = MotherboardApi.useGetAllMotherBoardsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const [configuration,setConfiguration] = useState<ComputerConfiguration>()
    const motherboardContext = useContext(ComputerContext)
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
        const selectedObject = motherboards?.find(motherboard => motherboard.name === selectedIndex);
        if (selectedObject) {
            dispatch(motherBoardCompatibilitySlice.actions.addMotherboardStatus(selectedObject));
            motherboardContext?.setMotherboard(selectedObject)
            const updatedConfiguration = motherBoardCompatibilitySlice.reducer(
                {
                    motherboard: motherboardContext?.motherboard,
                    processor: motherboardContext?.processor,
                    ram: motherboardContext?.ram

                }, // initialState будет автоматически взято из редуктора
                motherBoardCompatibilitySlice.actions.addMotherboardStatus(selectedObject)
            );

            // Можно также использовать updatedConfiguration для отправки по chooseMotherboard
            const result = await dispatch(chooseMotherboard(updatedConfiguration)).unwrap();
            setConfiguration(result)
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
                <select className="text" onChange={toggleDropdown} value={selectedValue}>
                    {!selectedValue && <option value="" disabled hidden>Choose the element</option>}
                    {motherboards?.map(item => (
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



