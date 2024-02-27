import React from 'react';
import "./CountComponent.css"

interface RamCountProps {
    number: number;
    changeCount: (newNumber: number) => void;
}

export const CountComponent: React.FC<RamCountProps> = ({ number, changeCount }) => {
    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    changeCount(number - 1);
                }}
            >-</button>
            <input className="input-field" value={number} readOnly />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    changeCount(number + 1);
                }}
            >+</button>
        </div>
    );
}