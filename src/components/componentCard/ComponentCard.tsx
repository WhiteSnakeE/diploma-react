import * as React from 'react';
import '../componentCard/ComponentCard.css'
import {PrimaryButton} from "../Buttons/PrimaryButton";


interface ComponentCardProps {
    image: string,
    name: string,
    price: number,
    isShowButton: boolean,
}

export const ComponentCard: React.FC<ComponentCardProps> = ({image, name, price, isShowButton}) => {

    const myImage = require(`../../images/processors/${image}.webp`) as string;


    return (
        <div className="product-card">
            <div className="image">
                <img src={myImage} alt="Product"/>
            </div>
            <div className="name">{name}</div>

            {isShowButton &&
                <div className="add-to-cart">
                    <div className="price">{price} грн</div>
                    <PrimaryButton text="Select this item" color="blue" label="select this item" disabled={false}/>
                </div>
            }

        </div>
    );
}