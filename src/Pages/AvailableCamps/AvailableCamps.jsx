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

    // const [populars] = usePopularCamp()
    const axiosPublic = useAxiosPublic()
    const [available, setAvailable] = useState([])
    const [search, setSearch] = useState([])
    const [towCollumn, setTowCollumn] = useState(true)

    const { } = useQuery({
        queryKey: ['popular'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-medical-camp')
            setAvailable(res.data)
            setSearch(res.data)
        }
    })


    const handleSearch = e => {
        const searchValue = e.target.value.toLowerCase()
        setSearch(available.filter(search => search.camp_name.toLowerCase().includes(searchValue)))
    }

    const handleSortCampFees = () => {
        const sort = available.sort((a, b) => a.camp_fees - b.camp_fees)
        setSearch([...sort])
        setAvailable([...sort])
    }

    const handleCollumn = () => {
        setTowCollumn(prevState => !prevState)
    }


    return (
        <div>
            <div className='space-y-6 bg-fixed flex flex-col justify-center items-center available bg-no-repeat bg-center bg-cover h-[70vh]'>
                <h1 className='text-5xl text-white'>Available Camp</h1>
                <input onChange={handleSearch} type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
                <details className="dropdown">
                    <summary className="m-1 btn">Sort By</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li onClick={handleSortCampFees}><a>Camp Fees</a></li>
                        <li><a>Item 2</a></li>
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
            <div className={`my-20 mx-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${towCollumn ? '3' : '2'} gap-5`}>
                {
                    search.map(popular => <div className="card bg-base-100 shadow-xl">
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