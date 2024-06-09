import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://precision-medical-camp-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;