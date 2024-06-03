import React from 'react';
import { FaDollarSign, FaLocationDot, FaUserDoctor } from 'react-icons/fa6';
import { MdDateRange } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';

const AvailableDetail = () => {

    const available = useLoaderData()
    console.log(available)

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className='w-[50%]'>
                    <img src={available.image} />
                </div>
                <div className='space-y-3'>
                    <h1 className="text-5xl font-bold">{available.camp_name}</h1>
                    <div className='flex items-center space-x-2'>
                        <span>
                            <FaUserDoctor className='text-3xl' />
                        </span>
                        <p>{available.healthcare_professional}</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <FaLocationDot className='text-3xl' />
                        <p>{available.location}</p>
                    </div>
                    <div className='flex space-x-20'>
                        <div className='flex items-center space-x-2'>
                            <MdDateRange className='text-3xl' />
                            <p>{new Date(available.date_and_time).toLocaleDateString()}</p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <FaDollarSign className='text-3xl' />
                            <p>{available.camp_fees}</p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-5'>
                        <p className='space-x-2 bg-blue-500 p-1'>
                            <span className='font-bold'>participant count:</span>
                            <span>{available.participant_count}</span>
                        </p>
                        <p className='space-x-2 bg-orange-500 p-1'>
                            <span className='font-bold'>Camp Fee:</span>
                            <span>{available.camp_fees}</span>
                        </p>

                    </div>
                    <p>{available.description}</p>

                    <div className=''>
                        <Link to="/available-camps">
                            <button className="btn bg-opacity-0 text-black border-[#29c178] hover:bg-[#29c178] hover:text-white">Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableDetail;