import * as React from 'react';
import '../componentCard/ComponentCard.css'
import {PrimaryButton} from "../Buttons/PrimaryButton";
import {CountComponent} from "../Count/CountComponent";
import {AddNewComponentButton} from "../Buttons/AddNewComponentButton";
import {Motherboard} from "../../api/types/motherboard/Motherboard";
import {Processor} from "../../api/types/processor/Processor";
import {Ram} from "../../api/types/ram/Ram";
import {Videocard} from "../../api/types/videocard/Videocard";
import {Ssd} from "../../api/types/ssd/Ssd";

interface ComponentCardProps {
    image: string,
    name: string,
    price: number,
    packageName: string,
    isShowButton: boolean,
    color?: 'red' | 'green' | 'white' | 'blue' | 'grey' | 'orange';
    onClick?: () => void,
    showCount?: boolean,
    changeCount?: (newNumber: number) => void;
    number?: number;
    disabled?: boolean


}

export const ComponentCard: React.FC<ComponentCardProps> = ({
                                                                image, price, name,
                                                                packageName,
                                                                isShowButton, color,
                                                                onClick,
                                                                showCount, changeCount, number,disabled
                                                            }) => {

    const myImage = require(`../../images/${packageName}/${image}.png`) as string;


    return (
        <div className="product-card">
            <div className="image">
                <img src={myImage} alt="Product"/>
            </div>
            <div className="name">{name}</div>
            {showCount &&
                <div>
                    <div className="count" onClick={(e) => e.stopPropagation()}>
                        {changeCount !== undefined && number !== undefined &&
                            <CountComponent changeCount={changeCount} number={number}/>}
                    </div>
                    <div className="count" onClick={(e) => e.stopPropagation()}>
                        <AddNewComponentButton/>
                    </div>
                </div>

            }
            {isShowButton &&
                <div className="add-to-cart">
                    <div className="price">{price} грн</div>
                    <PrimaryButton text="Select this item" color={color} label="select this item" disabled={disabled === undefined ? false : disabled }
                                   onClick={onClick}/>
                </div>
            }

        </div>
    );
}