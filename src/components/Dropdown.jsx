import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Dropdown.css';

const Dropdown = ({url, name}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [componentList, setComponentList] = useState([]);
    const [isOkay, setIsOkay] = useState(false);
    const toggleDropdown = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedObject = componentList[selectedIndex];

        axios.post("test/" + url, selectedObject)
            .then(response => setIsOkay(response.data))
        console.log(isOkay)
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setComponentList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [url]);

    return (
        <div>
            <div>
                <select className="text" onChange={toggleDropdown}>
                    {componentList.map(item => (
                        <option key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <p>Значение isOkay: {isOkay ? 'Да' : 'Нет'}</p>
            </div>
        </div>


    );
};


export default Dropdown;