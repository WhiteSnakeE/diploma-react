import React from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";


interface AddNewComponentButtonProps {
    component: string
}

export const AddNewComponentButton: React.FC<AddNewComponentButtonProps> = ({component}) => {
    const ssds = useSelector((state: RootState) => state.configurationCompatibility.ssd);
    const hdds = useSelector((state: RootState) => state.configurationCompatibility.hdd);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const addSSdDropdown = () => {
        const updatedSsd = [...ssds]
        updatedSsd.push(null);

        const updatedConfig = {
            ...configuration,
            ssd: updatedSsd
        }
        dispatch(updateConfiguration(updatedConfig))
    }

    const addHddDropdown = () => {
        const updatedHdd = [...hdds]
        updatedHdd.push(null);

        const updatedConfig = {
            ...configuration,
            hdd: updatedHdd
        }
        dispatch(updateConfiguration(updatedConfig))
    }

    return (
        <div>
            <button disabled={ssds.includes(null)}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        {
                            component === "ssd" ? addSSdDropdown() : addHddDropdown()
                        }

                    }}
            > Add another ssd
            </button>
        </div>
    );
}
