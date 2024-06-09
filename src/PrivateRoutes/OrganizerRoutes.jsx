import React from 'react';
import useOrganizer from '../Hooks/useOrganizer';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const OrganizerRoutes = () => {
    const { user, loading } = useAuth()
    const [isOranizer, isOranizerLoading] = useOrganizer()
    const location = useLocation()

    if (loading || isOranizerLoading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-infinity loading-lg"></span></div>
    }

    if (user && isOranizer) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default OrganizerRoutes;