import React from 'react'

const HighlightedText = ({ children,gradient }) => {
    return (
        <span className={`${gradient} text-transparent bg-clip-text font-bold`}>
            {children}
        </span>
    )
}

export default HighlightedText;
