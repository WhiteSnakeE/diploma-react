import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import '../componentCard/ComponentCard.css'
import {PrimaryButton} from "../Buttons/PrimaryButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {CheckCompatibilityMessage} from "../checkCompatibilityMessage/CheckCompatibilityMessage";


interface ComponentCardProps {
    image: string,
    name: string,
    price: number,
    isShowButton: boolean,
}

export const ComponentCard: React.FC<ComponentCardProps> = ({image, name, price, isShowButton}) => {

    console.log(image)
    console.log(name)
    console.log(price)

    const myImage = require(`../../images/processors/${image}.webp`) as string;

    const theme = useTheme();

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