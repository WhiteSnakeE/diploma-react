import {useSelector} from "react-redux";
import {RootState} from "../../api/store";
import React from "react";

export const Advices = () => {
    const configuration = useSelector((state: RootState) => state.configurationCompatibility);

    return (
        <div>
            ADVICES
            <div>
                {configuration.advices?.map(advice => (
                    <div>
                        {advice}
                    </div>
                ))}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )

}