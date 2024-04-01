import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {VideocardApi} from "../../api/videocardApi";
import {Videocard} from "../../api/types/videocard/Videocard";

export const VideocardDropDown: React.FC = () => {
    const {data: videocards, error, isLoading} = VideocardApi.useGetAllVideocardsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const videocard = useSelector((state: RootState) => state.configurationCompatibility.videocard);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()
    const toggleDropdown = async (selectedValue: Videocard) => {
        const selectedIndex = selectedValue;
        const selectedObject = videocards?.find(videocard => videocard === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                videocard: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    const removeComponent = async () => {
        if (videocard!= null) {
            const updatedConfig = {
                ...configuration,
                videocard: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    return (
        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard dropDownName="GPU" component={videocard} removeComponent={removeComponent} imgPackage={"videocards"} showCount={true} showAddRemove={false}/>
            </article>
            {isOpen && (
                <ul>
                    {videocards?.map(item => (
                        <li className="dropdown" key={item._id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"videocards"}
                                           isShowButton={true} color={"orange"} onClick={() => toggleDropdown(item)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};


