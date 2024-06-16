import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {CpuCoolingApi} from "../../api/cpuCoolingApi";
import {CpuCooling} from "../../api/types/cooling/CpuCooling";
import './PaginationContainer.css';

export const CpuCoolingDropDown: React.FC = () => {
    const {data: cpuCoolings, error, isLoading} = CpuCoolingApi.useGetAllCpuCoolingQuery();
    const [isOpen, setIsOpen] = useState(false);
    const cpuCooling = useSelector((state: RootState) => state.configurationCompatibility.cpuCooling);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


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

    const removeComponent = async () => {
        if (cpuCooling!= null) {
            const updatedConfig = {
                ...configuration,
                cpuCooling: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!cpuCoolings || cpuCoolings.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="CPU cooler"
                        component={cpuCooling}
                        imgPackage={"cooling"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(cpuCoolings.length / itemsPerPage);
    const currentItems = cpuCoolings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
                <ChosenCard
                    dropDownName="CPU cooler"
                    component={cpuCooling}
                    imgPackage={"cooling"}
                    showCount={true}
                    showAddRemove={false}
                    removeComponent={removeComponent}
                />
            </article>
            {isOpen && (
                <div>
                    <ul>
                        {currentItems.map((item) => (
                            <li className="dropdown" key={item.id}>
                                <ComponentCard
                                    image={item.img}
                                    name={item.name}
                                    price={item.price}
                                    packageName={"cooling"}
                                    isShowButton={true}
                                    color={"grey"}
                                    onClick={() => toggleDropdown(item)}
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





