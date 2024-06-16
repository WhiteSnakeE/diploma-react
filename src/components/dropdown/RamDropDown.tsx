import React, {useState} from "react";
import {useGetAllRamsQuery} from "../../api/ramApi";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import {Ram} from "../../api/types/ram/Ram";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import "./PaginationContainer.css";

export const RamDropDown = () => {
    const {data: rams, error, isLoading} = useGetAllRamsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const ram = useSelector((state: RootState) => state.configurationCompatibility.ram);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();
    const [number, setNumber] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const toggleDropdown = async (selectedValue: Ram) => {
        const selectedIndex = selectedValue;
        const selectedObject = rams?.find(ram => ram === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                ram: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    const changeCount = (newNumber: number) => {
        if (newNumber !== 0) {
            setNumber(newNumber);
            const updatedRam = {...ram, count: newNumber} as Ram;
            const updatedConfig = {
                ...configuration,
                ram: updatedRam
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    }

    const removeComponent = async () => {
        if (ram != null) {
            const updatedConfig = {
                ...configuration,
                ram: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!rams || rams.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="RAM"
                        component={ram}
                        imgPackage={"rams"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(rams.length / itemsPerPage);
    const currentItems = rams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="pagination-container">
                {pageNumbers}
            </div>
        );
    };

    return (
        <div className="dropdown">
            <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                <ChosenCard dropDownName="RAM" component={ram} imgPackage={"rams"} removeComponent={removeComponent}
                            showCount={true} showAddRemove={false} changeCount={changeCount} number={number}/>
            </article>
            {isOpen && (
                <div>
                    <ul>
                        {currentItems.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"rams"}
                                               isShowButton={true} color={"green"} onClick={() => toggleDropdown(item)}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="pagination">
                        {renderPageNumbers()}
                    </div>
                </div>
            )}

        </div>
    );
};


