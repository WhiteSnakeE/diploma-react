import React, {ReactNode} from "react";
import './PrimaryButton.css';

interface PrimaryButtonProps {
    icon?: ReactNode;
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: 'red' | 'green' | 'white' | 'blue';
    label: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({icon, text, onClick, disabled, color, label}) => {
    return (
        <button className={`primary-button ${color} ${disabled ? 'disabled' : ''}`}
                onClick={(e) => {
                    if (onClick && !disabled) {
                        e.stopPropagation();
                        onClick();
                    }
                }}
                disabled={disabled}
                aria-label={label}
                title={label}
        >
            {icon && icon}
            <span className={"text"}>{text}</span>
        </button>
    );
};