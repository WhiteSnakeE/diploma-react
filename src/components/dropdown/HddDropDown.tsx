import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {Hdd} from "../../api/types/hdd/Hdd";
import {useGetAllHddQuery} from "../../api/hddApi";

interface HddDropdownProps {
    hdd: Hdd | null,
    chosenHdd: (Hdd | null)[] | [],
    index?: number,
}

export const HddDropDown: React.FC<HddDropdownProps> = ({hdd, chosenHdd, index}) => {
    const {data: hdds, error, isLoading} = useGetAllHddQuery();
    const [isOpen, setIsOpen] = useState(false);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();
    const [number, setNumber] = useState(1);

    const toggleDropdown = async (selectedValue: Hdd) => {
        const updatedHdd = [...chosenHdd]
        index = index === undefined ? 0 : index
        updatedHdd[index] = selectedValue
        const updatedConfig = {
            ...configuration,
            hdd: updatedHdd
        }
        dispatch(updateConfiguration(updatedConfig))
        setIsOpen(!isOpen);


    };

    const changeCount = (newNumber: number) => {
        if (newNumber !== 0) {
            setNumber(newNumber);
            const updatedHdd = {...hdd, count: newNumber} as Hdd;
            const updatedHddList = [...chosenHdd]
            index = index === undefined ? 0 : index
            updatedHddList[index] = updatedHdd
            const updatedConfig = {
                ...configuration,
                hdd: updatedHddList
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    }
    const removeComponent = async () => {
        if (hdd!= null) {
            const updatedConfig = {
                ...configuration,
                hdd: []
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    return (

        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard dropDownName="HDD" component={hdd} imgPackage={"hdd"} showCount={true} showAddRemove={true}
                            changeCount={changeCount} number={hdd?.count} removeComponent={removeComponent}/>
            </article>

            {isOpen && (
                <ul>
                    {hdds?.map(item => (
                        <li className="dropdown" key={item.id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"hdd"}
                                           isShowButton={true} color={"green"} onClick={() => toggleDropdown(item)}
                                           disabled={chosenHdd.some(hdd => hdd === null ? false : hdd.id === item.id)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};


