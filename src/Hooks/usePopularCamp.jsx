import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePopularCamp = () => {

    const axiosSecure = useAxiosSecure()
    const { data: populars = [], refetch } = useQuery({
        queryKey: ['popular'],
        queryFn: async () => {
            const res = await axiosSecure.get('/popular-medical-camp')
            return res.data
        }
    })
    return [populars, refetch]
};

export default usePopularCamp;