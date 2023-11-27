import React, {useState} from "react";
import {ComputerConfiguration} from "../../api/types/ComputerConfiguration";
import {Motherboard} from "../../api/types/motherboard/Motherboard";
import {Processor} from "../../api/types/processor/Processor";
import {Ram} from "../../api/types/ram/Ram";

interface Props {
    configuration: ComputerConfiguration|undefined;

}

export const StatusComponent = (props: Props) => {

    const [answer, setAnswer] = useState("Everything is okay");
    return (
        <div>
            <div>
                {props.configuration?.motherboard?.status}
            </div>
            <div>
                {props.configuration?.processor?.status}
            </div>
            <div>
                {props.configuration?.ram?.status}
            </div>
        </div>
    )

}