import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useOrganizer = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: isOranizer, isPending: isOranizerLoading } = useQuery({
        queryKey: [user?.email, 'isOranizer'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/organizer/${user?.email}`)
            console.log(res.data)
            return res.data?.organizer
        }
    })
    return [isOranizer, isOranizerLoading]
};

export default useOrganizer;