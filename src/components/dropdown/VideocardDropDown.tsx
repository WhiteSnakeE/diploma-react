import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../api/store";
import {updateConfiguration} from "../../api/slices/componentsSlice";
import {useSelector} from "react-redux";
import "./Dropdown.css";
import {ChosenCard} from "../chosenCard/ChosenCard";
import {ComponentCard} from "../componentCard/ComponentCard";
import {VideocardApi} from "../../api/videocardApi";
import {Videocard} from "../../api/types/videocard/Videocard";

import "./PaginationContainer.css";

export const VideocardDropDown: React.FC = () => {
    const {data: videocards, error, isLoading} = VideocardApi.useGetAllVideocardsQuery();
    const [isOpen, setIsOpen] = useState(false);
    const videocard = useSelector((state: RootState) => state.configurationCompatibility.videocard);
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);
    const dispatch = useAppDispatch()


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const toggleDropdown = async (selectedValue: Videocard) => {
        const selectedIndex = selectedValue;
        const selectedObject = videocards?.find(videocard => videocard === selectedIndex);
        if (selectedObject) {
            const updatedConfig = {
                ...configuration,
                videocard: selectedObject
            }
            dispatch(updateConfiguration(updatedConfig))
            setIsOpen(!isOpen);
        }
    };


    const removeComponent = async () => {
        if (videocard != null) {
            const updatedConfig = {
                ...configuration,
                videocard: null
            }
            dispatch(updateConfiguration(updatedConfig))
        }
    };

    if (!videocards || videocards.length === 0) {
        return (
            <div className="dropdown">
                <article className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                    <ChosenCard
                        dropDownName="Videocard"
                        component={videocard}
                        imgPackage={"videocards"}
                        showCount={true}
                        showAddRemove={false}
                        removeComponent={removeComponent}
                    />
                </article>
                {isOpen && <p>No items to display.</p>}
            </div>
        );
    }

    const totalPages = Math.ceil(videocards.length / itemsPerPage);
    const currentItems = videocards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
                <ChosenCard dropDownName="GPU" component={videocard} removeComponent={removeComponent}
                            imgPackage={"videocards"} showCount={true} showAddRemove={false}/>
            </article>
            {isOpen && (
                <div>
                    <ul>
                        {currentItems.map(item => (
                            <li className="dropdown" key={item._id}>
                                <ComponentCard image={item.img} name={item.name} price={item.price}
                                               packageName={"videocards"}
                                               isShowButton={true} color={"orange"} onClick={() => toggleDropdown(item)}
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
