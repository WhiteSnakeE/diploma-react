import * as React from 'react';

import "./ChosenCard.css";
import {Processor} from "../../api/types/processor/Processor";
import {ComponentCard} from "../componentCard/ComponentCard";
import {CheckCompatibilityMessage} from "../checkCompatibilityMessage/CheckCompatibilityMessage";
import {QuestionIcon} from "../icons/QuestionIcon";
import {ApproveIcon} from "../icons/ApproveIcon";
import {ErrorIcon} from "../icons/ErrorIcon";
import {Motherboard} from "../../api/types/motherboard/Motherboard";
import {Ram} from "../../api/types/ram/Ram";
import {Videocard} from "../../api/types/videocard/Videocard";
import {Ssd} from "../../api/types/ssd/Ssd";


interface ChosenCardProps {
    component: Processor | Motherboard | Ram | Videocard | Ssd | null;
    imgPackage: string,
    showCount: boolean
    showAddRemove: boolean
}

export const ChosenCard: React.FC<ChosenCardProps> = ({component, imgPackage, showCount}) => {

    // console.log(component)
    return (
        <div className="split-view">
            <div className="split-view__large">
                {
                    component?.name == null ?
                        <div>Choose the element</div> :
                        <>
                            <ComponentCard
                                image={component.img}
                                name={component.name}
                                price={component.price}
                                packageName={imgPackage}
                                isShowButton={false}
                                showCount={showCount}
                            />
                        </>
                }


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
