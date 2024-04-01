import {MotherboardApi} from "../../api/motherboardApi";
import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import {Motherboard} from "../../api/types/motherboard/Motherboard";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";

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
    const removeComponent = async () => {
        if (motherboard!= null) {
            const updatedConfig = {
                ...configuration,
                motherboard: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };


    return (
        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard dropDownName="Motherboard" component={motherboard} imgPackage={"motherboards"}
                            showCount={true} showAddRemove={false} removeComponent = {removeComponent}/>
            </article>
            {isOpen && (
                <ul>
                    {motherboards?.map(item => (
                        <li className="dropdown" key={item._id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price}
                                           packageName={"motherboards"}
                                           isShowButton={true} color={"grey"} onClick={() => toggleDropdown(item)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};


