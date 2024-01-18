import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import "./CheckCompatibilityMessage.css";

interface CheckCompatibilityMessageProps {
    isApprove: boolean,
    message: string,
}

export const CheckCompatibilityMessage: React.FC<CheckCompatibilityMessageProps> = ({isApprove, message}) => {

    return (
        <div className="message">
            {isApprove ? <CheckCircleIcon sx={{color: "green", fontSize: 40}}/> :
                <CancelIcon sx={{color: "green", fontSize: 40}}/>}
            <div>{message}</div>
        </div>
    )

}