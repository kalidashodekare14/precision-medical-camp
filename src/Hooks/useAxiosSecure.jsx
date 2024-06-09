import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'https://precision-medical-camp-server.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOutSystem} = useAuth()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('requst stoped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    // axiosSecure.interceptors.response.use(function (response) {
    //     return response
    // }, async(error) => {
    //     const status = error.response.status
    //     if (status === 401 || status === 403){
    //          await logOutSystem();
    //         navigate('/login')
    //     }
    //         console.log('status error', error)
    //     return Promise.reject(error)
    // })

    return axiosSecure
};

export default useAxiosSecure;