import * as React from 'react';
import '../componentCard/ComponentCard.css'
import {PrimaryButton} from "../Buttons/PrimaryButton";
import "./ChosenCard.css";
import {Processor} from "../../api/types/processor/Processor";
import {ComponentCard} from "../componentCard/ComponentCard";
import {CheckCompatibilityMessage} from "../checkCompatibilityMessage/CheckCompatibilityMessage";
import {QuestionIcon} from "../icons/QuestionIcon";
import {ApproveIcon} from "../icons/ApproveIcon";
import {ErrorIcon} from "../icons/ErrorIcon";
import {Motherboard} from "../../api/types/motherboard/Motherboard";
import {Ram} from "../../api/types/ram/Ram";


interface ChosenCardProps {
    component: Processor | Motherboard | Ram | null;
    imgPackage: string
}

export const ChosenCard: React.FC<ChosenCardProps> = ({component, imgPackage}) => {

    return (
        <div className="split-view">
            <div className="split-view__large">
                {component?.name == null ? "Choose the element" :
                    <ComponentCard image={component.img} name={component.name} price={component.price}
                                   packageName={imgPackage}
                                   isShowButton={false}/>}
            </div>
            <div className="split-view__small">
                {component?.status == null ?
                    <CheckCompatibilityMessage icon={<QuestionIcon/>}/> :
                    component?.status == "" ? <CheckCompatibilityMessage icon={<ApproveIcon/>}/> :
                        <CheckCompatibilityMessage icon={<ErrorIcon/>} message={component.status}/>
                }
            </div>
        </div>
    );
}