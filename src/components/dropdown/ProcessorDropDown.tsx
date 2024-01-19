import React, {useState} from "react";
import {ProcessorsApi} from "../../api/proccessorsApi";
import {updateConfiguration,} from "../../api/slices/componentsSlice";
import {RootState, useAppDispatch} from "../../api/store";
import {useSelector} from "react-redux";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {Processor} from "../../api/types/processor/Processor";
import {ComponentCard} from "../componentCard/ComponentCard";
import "./Dropdown.css"
import {ChosenCard} from "../chosenCard/ChosenCard";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const processor = useSelector((state: RootState) => state.configurationCompatibility.processor);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const toggleDropdown = async (selectedValue: Processor) => {
        const selectedIndex = selectedValue;
        const selectedObject = processors?.find(processor => processor === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                processor: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <Accordion >
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <ChosenCard component={processor} imgPackage={"processors"}/>

                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                        {processors?.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"processors"}
                                               isShowButton={true} color={"blue"} onClick={() => toggleDropdown(item)}/>
                            </li>
                        ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
