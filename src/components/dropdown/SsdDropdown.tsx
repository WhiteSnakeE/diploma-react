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
    const [number, setNumber] = useState(1);

    const toggleDropdown = async (selectedValue: Ssd) => {
        const updatedSsd = [...chosenSsd]
        index = index === undefined ? 0 : index
        updatedSsd[index] = selectedValue
        const updatedConfig = {
            ...configuration,
            ssd: updatedSsd
        }
        dispatch(updateConfiguration(updatedConfig))
        setIsOpen(!isOpen);
    };

    const changeCount = (newNumber: number) => {
        if (newNumber !== 0) {
            setNumber(newNumber);
            const updatedSsd = {...ssd, count: newNumber} as Ssd;
            const updatedSsdList = [...chosenSsd]
            index = index === undefined ? 0 : index
            updatedSsdList[index] = updatedSsd
            const updatedConfig = {
                ...configuration,
                ssd: updatedSsdList
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    }

    const removeComponent = async () => {
        if (ssd != null) {
            const updated = chosenSsd.filter((i) => i?.name !== ssd.name)
            const updatedConfig = {
                ...configuration,
                ssd: updated
            }
            
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    return (

        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard dropDownName="SSD" component={ssd} imgPackage={"ssd"} showCount={true} showAddRemove={true}
                            changeCount={changeCount} number={ssd?.count} removeComponent={removeComponent}/>
            </article>

            {isOpen && (
                <ul>
                    {ssds?.map(item => (
                        <li className="dropdown" key={item.id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"ssd"}
                                           isShowButton={true} color={"green"} onClick={() => toggleDropdown(item)}
                                           disabled={chosenSsd.some(ssd => ssd === null ? false : ssd.id === item.id)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};


