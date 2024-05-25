import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    // const navigate = useNavigate();

    if (token === null) {
        
        return <Navigate to={'/login'}/>;
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute;
