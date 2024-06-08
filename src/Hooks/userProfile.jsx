import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const userProfile = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: profile = [] } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/profile/${user?.email}`)
            return res.data
        }
    })

    return {profile}

};

export default userProfile;