import * as React from 'react';
import '../componentCard/ComponentCard.css'
import {PrimaryButton} from "../Buttons/PrimaryButton";
import {ComponentCount} from "../Count/ComponentCount";
import {AddNewComponentButton} from "../Buttons/AddNewComponentButton";

interface ComponentCardProps {
    image: string,
    name: string,
    price: number,
    packageName: string,
    isShowButton: boolean,
    color?: 'red' | 'green' | 'white' | 'blue' | 'grey' | 'orange';
    onClick?: () => void,
    showCount?: boolean,


}

export const ComponentCard: React.FC<ComponentCardProps> = ({
                                                                image,
                                                                name,
                                                                price,
                                                                packageName,
                                                                isShowButton, color,
                                                                onClick,
                                                                showCount
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
                        <ComponentCount />
                    </div>
                    <div className="count" onClick={(e) => e.stopPropagation()}>
                        <AddNewComponentButton/>
                    </div>
                </div>

            }
            {isShowButton &&
                <div className="add-to-cart">
                    <div className="price">{price} грн</div>
                    <PrimaryButton text="Select this item" color={color} label="select this item" disabled={false}
                                   onClick={onClick}/>
                </div>
            }

        </div>
    );
}