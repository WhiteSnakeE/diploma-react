import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {PowerUnitApi} from "../../api/powerUnitApi";
import {PowerUnit} from "../../api/types/powerUnit/PowerUnit";
import "./PaginationContainer.css";

export const PowerUnitDropdown: React.FC = () => {
    const {data: powerUnits, error, isLoading} = PowerUnitApi.useGetAllPowerUnitsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const powerUnit = useSelector((state: RootState) => state.configurationCompatibility.powerUnit);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const toggleDropdown = async (selectedValue: PowerUnit) => {
        const selectedIndex = selectedValue;
        const selectedObject = powerUnits?.find(powerUnit => powerUnit === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                powerUnit: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    const removeComponent = async () => {
        if (powerUnit!= null) {
            const updatedConfig = {
                ...configuration,
                powerUnit: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!powerUnits || powerUnits.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="Power Units"
                        component={powerUnit}
                        imgPackage={"powerUnits"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(powerUnits.length / itemsPerPage);
    const currentItems = powerUnits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
                <ChosenCard dropDownName="Power Unit" component={powerUnit} removeComponent={removeComponent} imgPackage={"powerUnits"} showCount={true} showAddRemove={false}/>
            </article>
            {isOpen && (
                <div>
                <ul>
                    {currentItems.map(item => (
                        <li className="dropdown" key={item._id}>
                            <ComponentCard image={item.img} name={item.name} price={item.price} packageName={"powerUnits"}
                                           isShowButton={true} color={"grey"} onClick={() => toggleDropdown(item)}
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


