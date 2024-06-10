import React, { useState } from 'react';
import usePopularCamp from '../../Hooks/usePopularCamp';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaUserDoctor } from 'react-icons/fa6';

import './AvailableCamps.css'
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { RiLayoutVerticalFill } from 'react-icons/ri';
import { LuLayoutGrid } from 'react-icons/lu';
import { FaUserCheck } from 'react-icons/fa';

const AvailableCamps = () => {

    const axiosPublic = useAxiosPublic()
    const [towCollumn, setTowCollumn] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [sorted, setSorted] = useState([])

    const { data: populars = [] } = useQuery({
        queryKey: ['populars'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-medical-camp')
            setSorted(res.data)
            return res.data
        }
    })

    console.log(populars)


    console.log(sorted)


    const searchSystem = populars.filter(camp => {
        const query = searchQuery.toLowerCase()
        const date = new Date(camp.date_and_time).toLocaleDateString().toLocaleLowerCase();
        return (
            camp.camp_name.toLowerCase().includes(query) ||
            camp.camp_fees.toString().toLowerCase().includes(query) ||
            date.includes(query)
        )
    })

    const handleCampFees = () => {
        const check = sorted.sort((a, b) => b.camp_fees - a.camp_fees)
        setSorted([...check])
    }

    const handleCampName = () =>{
        const sortedCopy = [...sorted]
        sortedCopy.sort((a, b) => b.camp_name.localeCompare(a.camp_name))
        setSorted(sortedCopy)
    }


    const handleCollumn = () => {
        setTowCollumn(prevState => !prevState)
    }


    return (
        <div>
            <div className='space-y-6 bg-fixed flex flex-col justify-center items-center available bg-no-repeat bg-center bg-cover h-[70vh]'>
                <h1 className='lg:text-5xl text-[40px] text-white text-center'>Available Camp</h1>
                <div className='text-center my-10'>
                    <input onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search' className='input input-bordered' type="text" />
                </div>
                <details className="dropdown">
                    <summary className="m-1 btn">Sort By</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li onClick={handleCampFees}><a>Camp Fees</a></li>
                        <li onCanPlay={handleCampName}><a>Item 2</a></li>
                    </ul>
                </details>

            </div>
            <div className='flex justify-end mx-40 mt-10'>
                <div onClick={handleCollumn}>
                    {
                        towCollumn ? <RiLayoutVerticalFill className='text-4xl' />
                            :
                            <LuLayoutGrid className='text-4xl' />
                    }


                </div>
            </div>
            <div className={`my-20 lg:mx-32 mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${towCollumn ? '3' : '2'} gap-5`}>
                {
                    searchSystem.map(popular => <div className="card bg-base-100 shadow-xl">
                        <figure><img className='h-[40vh] w-full' src={popular.image} alt="Shoes" /></figure>
                        <div className="space-y-2 text-left p-5">
                            <div className='flex justify-between'>
                                <p className='text-slate-400'>{new Date(popular.date_and_time).toLocaleDateString()}</p>
                                <p className='text-slate-400'>${popular.camp_fees}</p>
                            </div>

                            <h2 className="text-2xl">{popular.camp_name}</h2>
                            <div className='flex items-center space-x-3'>
                                <FaUserDoctor className='text-[#0a4b46]' />
                                <p className='text-slate-400'>{popular.healthcare_professional}</p>
                            </div>

                            <p className='flex items-center space-x-3'>
                                <FaLocationArrow className='text-[#0a4b46]' />
                                <span className='text-slate-400'>{popular.location}</span>
                            </p>
                            <p className='space-x-3 text-slate-400 flex items-center'>
                                <FaUserCheck className='text-[#0a4b46]' />
                                <span>participant count:</span>
                                <span className='text-slate-400'>{popular.participant_count}</span>
                            </p>
                            <p className='text-slate-400'>{popular.description}</p>
                            <Link to={`/available-detail/${popular._id}`}>
                                <button className='btn bg-opacity-0 border-[#29c178] hover:bg-[#29c178]'>View Detail</button>
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AvailableCamps;