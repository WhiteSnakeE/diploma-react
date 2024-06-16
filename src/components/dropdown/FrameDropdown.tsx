import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {FrameApi} from "../../api/frameApi";
import {Frame} from "../../api/types/frame/Frame";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import "./PaginationContainer.css";

export const FrameDropDown: React.FC = () => {
    const {data: frames, error, isLoading} = FrameApi.useGetAllFramesQuery();
    const [isOpen, setIsOpen] = useState(false);
    const frame = useSelector((state: RootState) => state.configurationCompatibility.frame);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const toggleDropdown = async (selectedValue: Frame) => {
        const selectedIndex = selectedValue;
        const selectedObject = frames?.find(cpuCooling => cpuCooling === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                frame: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };

    const removeComponent = async () => {
        if (frame != null) {
            const updatedConfig = {
                ...configuration,
                frame: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!frames || frames.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="Frame"
                        component={frame}
                        imgPackage={"frames"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(frames.length / itemsPerPage);
    const currentItems = frames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
                <ChosenCard dropDownName="Frame" component={frame} imgPackage={"frame"} showCount={true}
                            showAddRemove={false} removeComponent={removeComponent}/>
            </article>
            {isOpen && (
                <div>
                    <ul>
                        {currentItems.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price}
                                               packageName={"frame"}
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


