import {useSelector} from "react-redux";
import {RootState} from "../../api/store";
import React from "react";
import "./Advices.css"

export const Advices = () => {
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);

    return (
        <div>
            <div className="advices">
                {configuration.advices?.map((advice, index) => (
                    <div key={index} className="advice">
                        {advice}
                    </div>
                ))}
            </div>
        </div>
    )

}