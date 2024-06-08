import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

import { FaLocationArrow, FaUserCheck } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import usePopularCamp from '../../../Hooks/usePopularCamp';

const PopularMedicalCamp = () => {

    const [populars] = usePopularCamp()

    // const axiosPublic = useAxiosPublic()

    // const { data: populars = [] } = useQuery({
    //     queryKey: ['popular'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/popular-medical-camp')
    //         return res.data
    //     }
    // })



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {
                populars.map(popular => <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img className='h-[40vh]' src={popular.image} alt="Shoes" /></figure>
                    <div className="space-y-2 text-left p-5">
                        <div className='flex justify-between'>
                            <p className=''>{new Date(popular.date_and_time).toLocaleDateString()}</p>
                            <p>${popular.camp_fees}</p>
                        </div>

                        <h2 className="text-2xl">{popular.camp_name}</h2>
                        <div className='flex items-center space-x-3'>
                            <FaUserDoctor />
                            <p className=''>{popular.healthcare_professional}</p>
                        </div>

                        <p className='flex items-center space-x-3'>
                            <FaLocationArrow />
                            <span>{popular.location}</span>
                        </p>
                        <div className='flex items-center space-x-3'>
                            <FaUserCheck />
                            <p className='space-x-2'>
                                <span>participant count:</span>
                                <span>{popular.participant_count}</span>
                            </p>
                        </div>
                        <Link to={`/view-detail/${popular._id}`}>
                            <button className='btn mt-3 bg-opacity-0 border-[#29c178] hover:bg-[#29c178]'>View Detail</button>
                        </Link>
                    </div>
                </div>)
            }

        </div>
    );
};

export default PopularMedicalCamp;