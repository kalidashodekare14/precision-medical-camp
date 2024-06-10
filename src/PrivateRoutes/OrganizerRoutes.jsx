import React from 'react';
import useOrganizer from '../Hooks/useOrganizer';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

const OrganizerRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const [isOranizer, isOranizerLoading] = useOrganizer()
    const location = useLocation()

    if (loading || isOranizerLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    if (user && isOranizer) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};


export default OrganizerRoutes;