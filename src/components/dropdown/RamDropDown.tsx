import React, {useState} from "react";
import {useGetAllRamsQuery} from "../../api/ramApi";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import {Ram} from "../../api/types/ram/Ram";
import "./Dropdown.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";

export const RamDropDown = () => {
    const {data: rams, error, isLoading} = useGetAllRamsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const ram = useSelector((state: RootState) => state.configurationCompatibility.ram);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const toggleDropdown = async (selectedValue: Ram) => {
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

    const changeCount = (newNumber: number) => {
        if (newNumber !== 0) {
            const updatedRam = {...ram, count: newNumber} as Ram;
            const updatedConfig = {
                ...configuration,
                ram: updatedRam
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    }

    console.log(rams)

    return (
        <div>
            <Accordion >
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <ChosenCard component={ram} imgPackage={"rams"} showCount={true}/>

                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                        {rams?.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"rams"}
                                               isShowButton={true} color={"green"} onClick={() => toggleDropdown(item)}
                                              />
                            </li>
                        ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};


