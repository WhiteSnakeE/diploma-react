import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import "./CheckCompatibilityMessage.css";
import HelpIcon from '@mui/icons-material/Help';
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