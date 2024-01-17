import React, {useState} from "react";
import {ProcessorsApi} from "../../api/proccessorsApi";
import {updateConfiguration,} from "../../api/slices/componentsSlice";
import {RootState, useAppDispatch} from "../../api/store";
import {useSelector} from "react-redux";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {Processor} from "../../api/types/processor/Processor";
import {ComponentCard} from "../componentCard/ComponentCard";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const processor = useSelector((state: RootState) => state.configurationCompatibility.processor);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const toggleDropdown = async (selectedValue:Processor) => {
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
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {processor?.name == null ? "Choose the element" :
                        <ComponentCard image={processor.img} name={processor.name} price={processor.price} /> }
                </AccordionSummary>
                <AccordionDetails>
                    {processors?.map(item => (
                        <article key={item._id} onClick={() => toggleDropdown(item)} style={{cursor:"pointer"}}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} />
                        </article>
                    ))}
                </AccordionDetails>
            </Accordion>
            <div>
                {processor?.status}
            </div>
        </div>
    );
};
