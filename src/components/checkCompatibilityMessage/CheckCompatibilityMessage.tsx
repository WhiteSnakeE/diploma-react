import * as React from "react";

import "./CheckCompatibilityMessage.css";
import {ReactNode} from "react";

interface CheckCompatibilityMessageProps {
    icon: ReactNode,
    message?: string,
}

export const CheckCompatibilityMessage: React.FC<CheckCompatibilityMessageProps> = ({icon, message}) => {

    return (
        <div className="message">
            {icon}
            <div>{message}</div>
        </div>
    )

}