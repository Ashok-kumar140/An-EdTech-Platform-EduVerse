import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ bgColor, linkTo, children }) => {
    return (
        <div>
            <Link className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${bgColor} hover:shadow-none hover:scale-95 transition-all duration-200 `} to={linkTo}>
                {children}
            </Link>

        </div>
    )
}

export default Button;
