import React from 'react'

interface DisplayTextProps {
    displayText: string;
}

export const DisplayText: React.FC<DisplayTextProps> = ({ displayText }) => {
    return (
        <span className="block mb-2">
            {displayText.split(' ').map((word, index) => (
                <span
                    key={index}
                    className="inline-block mr-1 animate-fadeIn"
                    style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    {word}
                </span>
            ))}
        </span>
    )
}
