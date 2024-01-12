import React, {useState} from "react";
import {useGetAllRamsQuery} from "../../api/ramApi";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";

export const RamDropDown = () => {
    const {data: rams, error, isLoading} = useGetAllRamsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const ram = useSelector((state:RootState) => state.configurationCompatibility.ram);
    const configuration = useSelector((state:RootState) => state.configurationCompatibility);
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useAppDispatch();
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: Failed to fetch motherboards data</p>;
    }


    const toggleDropdown = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.value;
        const selectedObject = rams?.find(ram => ram.name === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                ram: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
            setSelectedValue(selectedIndex);
        }
    };

    return (
        <div>
            <div>
                <select className="text" onChange={toggleDropdown} value={selectedValue}>
                    {!selectedValue && <option value="" disabled hidden>Choose the element</option>}
                    {rams?.map(item => (
                        <option key={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <div>
                    {ram?.status}
                </div>
            </div>
        </div>


    );
};


