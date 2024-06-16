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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


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
        if (motherboard != null) {
            const updatedConfig = {
                ...configuration,
                motherboard: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!motherboards || motherboards.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="Motherboard"
                        component={motherboard}
                        imgPackage={"motherboards"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(motherboards.length / itemsPerPage);
    const currentItems = motherboards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
                <ChosenCard dropDownName="Motherboard" component={motherboard} imgPackage={"motherboards"}
                            showCount={true} showAddRemove={false} removeComponent={removeComponent}/>
            </article>
            {isOpen && (
                <div>
                    <ul>
                        {currentItems.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price}
                                               packageName={"motherboards"}
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


