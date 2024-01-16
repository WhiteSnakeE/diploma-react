import React, {useState} from "react";
import {useGetAllRamsQuery} from "../../api/ramApi";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import {Processor} from "../../api/types/processor/Processor";
import {Ram} from "../../api/types/ram/Ram";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";

export const RamDropDown = () => {
    const {data: rams, error, isLoading} = useGetAllRamsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const ram = useSelector((state:RootState) => state.configurationCompatibility.ram);
    const configuration = useSelector((state:RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const toggleDropdown = async (selectedValue:Ram) => {
        const selectedIndex = selectedValue;
        const selectedObject = rams?.find(ram => ram === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                ram: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {ram?.name == null ? "Choose the element" : ram.name}
                </AccordionSummary>
                <AccordionDetails>
                    {rams?.map(item => (
                        <article key={item._id} onClick={() => toggleDropdown(item)} style={{cursor:"pointer"}}>
                            <h3>{item.name}</h3>
                        </article>
                    ))}
                </AccordionDetails>
            </Accordion>
            <div>
                {ram?.status}
            </div>
        </div>
    );
};


