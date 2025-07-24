import React from 'react'

interface ImmediateTextProps {
    intermediateText: string;
}

export const ImmediateText: React.FC<ImmediateTextProps> = ({ intermediateText }) => {
    return (
        <span className="block text-blue-300 opacity-75 italic">
            {intermediateText}
            <span className="animate-pulse ml-1">|</span>
        </span>
    )
}
