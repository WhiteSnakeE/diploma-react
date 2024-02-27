import React from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../api/store";
import {configurationCompatibilitySlice, updateConfiguration} from "../../api/slices/componentsSlice";

export const AddNewComponentButton = () => {
    const ssds = useSelector((state: RootState) => state.configurationCompatibility.ssd);
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

    return (
        <div>
            <button disabled={ssds.includes(null)}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    addSSdDropdown();
                }}
            > Add another ssd
            </button>
        </div>
    );
}
