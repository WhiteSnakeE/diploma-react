import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {CpuCoolingApi} from "../../api/cpuCoolingApi";
import {CpuCooling} from "../../api/types/cooling/CpuCooling";
import {FrameApi} from "../../api/frameApi";
import {Frame} from "../../api/types/frame/Frame";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";

export const FrameDropDown: React.FC = () => {
    const {data: frames, error, isLoading} = FrameApi.useGetAllFramesQuery();
    const [isOpen, setIsOpen] = useState(false);
    const frame = useSelector((state: RootState) => state.configurationCompatibility.frame);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()
    const toggleDropdown = async (selectedValue: Frame) => {
        const selectedIndex = selectedValue;
        const selectedObject = frames?.find(cpuCooling => cpuCooling === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                frame: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };
    return (
        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard component={frame} imgPackage={"frame"} showCount={true} showAddRemove={false}/>
            </article>
            {isOpen && (
                <ul>
                    {frames?.map(item => (
                        <li className="dropdown" key={item._id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price}
                                           packageName={"frame"}
                                           isShowButton={true} color={"grey"} onClick={() => toggleDropdown(item)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );

};


