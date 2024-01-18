import {MotherboardApi} from "../../api/motherboardApi";
import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {Motherboard} from "../../api/types/motherboard/Motherboard";
import "./Dropdown.css";

export const MotherboardDropDown: React.FC = () => {
    const {data: motherboards, error, isLoading} = MotherboardApi.useGetAllMotherBoardsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const motherboard = useSelector((state: RootState) => state.configurationCompatibility.motherboard);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()
    const toggleDropdown = async (selectedValue: Motherboard) => {
        const selectedIndex = selectedValue;
        const selectedObject = motherboards?.find(motherboard => motherboard === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                motherboard: selectedObject
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
                    {motherboard?.name == null ? "Choose the element" : motherboard.name}
                </AccordionSummary>
                <AccordionDetails>
                    {motherboards?.map(item => (
                        <article  key={item._id} onClick={() => toggleDropdown(item)} style={{cursor: "pointer"}}>
                            <h3>{item.name}</h3>
                        </article>
                    ))}
                </AccordionDetails>
            </Accordion>
            <div>
                {motherboard?.status}
            </div>
        </div>
    );
};



