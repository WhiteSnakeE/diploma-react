import {MotherboardApi, useGetAllMotherBoardsQuery} from "../../api/motherboardApi";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../api/store";
import {chooseMotherboard, chooseRam, motherBoardCompatibilitySlice} from "../../api/slices/componentsSlice";


export const MotherboardDropDown = () => {
    const {data: motherboards, error, isLoading} = MotherboardApi.useGetAllMotherBoardsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const [componentList, setComponentList] = useState([]);
    const [answer, setAnswer] = useState("Everything is okay");
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
        console.log(selectedIndex);
        const selectedObject = motherboards?.find(motherboard => motherboard.name === selectedIndex);
        if (selectedObject) {
            // Вызываем Redux action, чтобы обновить состояние
            dispatch(motherBoardCompatibilitySlice.actions.addMotherboardStatus(selectedObject));

            // Получаем обновленный ComputerConfiguration из состояния
            const updatedConfiguration = motherBoardCompatibilitySlice.reducer(
                undefined, // initialState будет автоматически взято из редуктора
                motherBoardCompatibilitySlice.actions.addMotherboardStatus(selectedObject)
            );

            // updatedConfiguration теперь содержит новый объект ComputerConfiguration с обновленной материнской платой
            console.log(updatedConfiguration);
            // Можно также использовать updatedConfiguration для отправки по chooseMotherboard
            const result = await dispatch(chooseMotherboard(updatedConfiguration)).unwrap();

            console.log(result);

            setIsOpen(!isOpen);
            if (result.motherboard?.status) {
                setAnswer(result.motherboard.status);
            }

            setSelectedValue(selectedIndex);
        }
    };


    return (
        <div>
            <div>
                <select className="text" onChange={toggleDropdown} value={selectedValue}>
                    {!selectedValue && <option value="" disabled hidden>Choose the element</option>}
                    {motherboards?.map(item => (
                        <option key={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <div>
                    {answer}
                </div>
            </div>

        </div>
    );
};



