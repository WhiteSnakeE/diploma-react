import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import {Ram} from "../../api/types/ram/Ram";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {useGetAllSsdQuery} from "../../api/SsdApi";
import {Ssd} from "../../api/types/ssd/Ssd";

interface SsdDropdownProps {
    ssd: Ssd | null,
    chosenSsd: (Ssd | null)[] | [],
    index?: number,
}

export const SsdDropDown: React.FC<SsdDropdownProps> = ({ssd, chosenSsd, index}) => {
    const {data: ssds, error, isLoading} = useGetAllSsdQuery();
    const [isOpen, setIsOpen] = useState(false);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const toggleDropdown = async (selectedValue: Ssd) => {
        // const selectedIndex = ssds?.findIndex(r => r.id === selectedValue.id)
        // console.log(selectedIndex)
        const updatedSsd = [...chosenSsd]
        console.log(updatedSsd)
        index = index === undefined ? 0 : index
        updatedSsd[index] = selectedValue
        console.log(updatedSsd)
        const updatedConfig = {
            ...configuration,
            ssd: updatedSsd
        }
        console.log(updatedConfig)
        dispatch(updateConfiguration(updatedConfig))
        setIsOpen(!isOpen);


    };

    const changeCount = (newNumber: number) => {
        if (newNumber !== 0) {
            const updatedRam = {...ssd, count: newNumber} as Ram;
            const updatedConfig = {
                ...configuration,
                ram: updatedRam
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    }

    console.log(ssds)

    return (
        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard component={ssd} imgPackage={"ssd"} showCount={true} showAddRemove={true}/>
            </article>
            {isOpen && (
                <ul>
                    {ssds?.map(item => (
                        <li className="dropdown" key={item.id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"ssd"}
                                           isShowButton={true} color={"green"} onClick={() => toggleDropdown(item)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};


