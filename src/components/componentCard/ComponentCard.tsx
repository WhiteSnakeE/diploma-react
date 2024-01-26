import * as React from 'react';
import '../componentCard/ComponentCard.css'
import {PrimaryButton} from "../Buttons/PrimaryButton";


interface ComponentCardProps {
    image: string,
    name: string,
    price: number,
    packageName: string,
    isShowButton: boolean,
    color?: 'red' | 'green' | 'white' | 'blue' | 'grey';
    onClick?: () => void,
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
                                                                image,
                                                                name,
                                                                price,
                                                                packageName,
                                                                isShowButton, color,
                                                                onClick
                                                            }) => {

    const myImage = require(`../../images/${packageName}/${image}.png`) as string;


    return (
        <div className="product-card">
            <div className="image">
                <img src={myImage} alt="Product"/>
            </div>
            <div className="name">{name}</div>

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