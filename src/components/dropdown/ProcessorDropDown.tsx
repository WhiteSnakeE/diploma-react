import React, {useState} from "react";
import {ProcessorsApi} from "../../api/proccessorsApi";
import {updateConfiguration,} from "../../api/slices/componentsSlice";
import {RootState, useAppDispatch} from "../../api/store";
import {useSelector} from "react-redux";
import {Processor} from "../../api/types/processor/Processor";
import {ComponentCard} from "../componentCard/ComponentCard";
import "./Dropdown.css"
import {ChosenCard} from "../chosenCard/ChosenCard";
import "./PaginationContainer.css";

export const ProcessorDropDown = () => {
    const {data: processors, error, isLoading} = ProcessorsApi.useGetAllProcessorsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const processor = useSelector((state: RootState) => state.configurationCompatibility.processor);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const toggleDropdown = async (selectedValue: Processor) => {
        const selectedIndex = selectedValue;
        const selectedObject = processors?.find(processor => processor === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                processor: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };
    const removeComponent = async () => {
        if (processor != null) {
            const updatedConfig = {
                ...configuration,
                processor: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!processors || processors.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="Processors"
                        component={processor}
                        imgPackage={"processors"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(processors.length / itemsPerPage);
    const currentItems = processors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
                <ChosenCard dropDownName="Processor" component={processor} removeComponent={removeComponent}
                            imgPackage={"processors"} showCount={true} showAddRemove={false}/>
            </article>
            {isOpen && (
                <div>
                    <ul>
                        {currentItems.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price}
                                               packageName={"processors"}
                                               isShowButton={true} color={"blue"} onClick={() => toggleDropdown(item)}
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
