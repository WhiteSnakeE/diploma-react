import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {CpuCoolingApi} from "../../api/cpuCoolingApi";
import {CpuCooling} from "../../api/types/cooling/CpuCooling";

export const CpuCoolingDropDown: React.FC = () => {
    const {data: cpuCoolings, error, isLoading} = CpuCoolingApi.useGetAllCpuCoolingQuery();
    const [isOpen, setIsOpen] = useState(false);
    const cpuCooling = useSelector((state: RootState) => state.configurationCompatibility.cpuCooling);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()
    const toggleDropdown = async (selectedValue: CpuCooling) => {
        const selectedIndex = selectedValue;
        const selectedObject = cpuCoolings?.find(cpuCooling => cpuCooling === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                cpuCooling: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    console.log(cpuCooling)
    return (
        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard component={cpuCooling} imgPackage={"cooling"} showCount={true} showAddRemove={false}/>
            </article>
            {isOpen && (
                <ul>
                    {cpuCoolings?.map(item => (
                        <li className="dropdown" key={item.id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"cooling"}
                                           isShowButton={true} color={"grey"} onClick={() => toggleDropdown(item)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};


