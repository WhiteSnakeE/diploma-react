import React, {useState} from "react";
import "./Dropdown.css"

interface Props {
    buttonText?: string;
    buttonIcon?: string;
}

const Dropdown: React.FC<Props> = ({
                                       buttonText,
                                       buttonIcon
                                   }) => {


    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={() => setIsOpen(!isOpen)} >
                <span>Я ненавижу Css</span>

                <button>
                    <span>Я ненавижу Css</span>
                    <img src={buttonIcon} />
                </button>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <a href="#">Ссылка 1</a>
                    <a href="#">Ссылка 2</a>
                    <a href="#">Ссылка 3</a>
                </div>
            )}
        </div>
    );
};

export default Dropdown;