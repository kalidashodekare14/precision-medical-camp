import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaLocationDot, FaUserDoctor } from 'react-icons/fa6';
import { MdDateRange } from 'react-icons/md';
import { FaAngleDown, FaDollarSign } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDetail = () => {

    const { user } = useAuth()
    const details = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [gender, setGender] = useState("")
    // console.log(details)

    const handleChange = e => {
        setGender(e.target.value)
    }
    console.log(gender)

    const handleCampJoin = e => {
        e.preventDefault()
        const form = e.target
        const age = form.age.value
        const phone_number = form.phone_number.value
        const emergency_contact = form.emergency_contact.value

        const joinCamp = {
            camp_name: details.camp_name,
            camp_fees: details.camp_fees,
            location: details.location,
            healthcare_professional: details.healthcare_professional,
            participant_name: user?.displayName,
            participant_email: user?.email,
            age,
            gender,
            phone_number,
            emergency_contact
        }

       
        axiosPublic.post('/camps', joinCamp)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    toast.success("Your Join Camp Successfuly");
                    axiosSecure.patch(`/popular-medical-camp/${details._id}`)
                    .then(res =>{
                        console.log(res.data)
                    })
                    .catch(error =>{
                        console.log(error.message)
                    })
                }
            })
            .catch(error => {
                console.log(error.message)
            })



    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className='w-[50%]'>
                    <img className='w-full' src={details.image} />
                </div>
                <div className='space-y-3'>
                    <h1 className="text-5xl font-bold">{details.camp_name}</h1>
                    <div className='flex items-center space-x-2'>
                        <span>
                            <FaUserDoctor className='text-3xl' />
                        </span>
                        <p>{details.healthcare_professional}</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <FaLocationDot className='text-3xl' />
                        <p>{details.location}</p>
                    </div>
                    <div className='flex space-x-20'>
                        <div className='flex items-center space-x-2'>
                            <MdDateRange className='text-3xl' />
                            <p>{new Date(details.date_and_time).toLocaleDateString()}</p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <FaDollarSign className='text-3xl' />
                            <p>{details.camp_fees}</p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-5'>
                        <p className='space-x-2 bg-blue-500 p-1'>
                            <span className='font-bold'>participant count:</span>
                            <span>{details.participant_count}</span>
                        </p>
                        <p className='space-x-2 bg-orange-500 p-1'>
                            <span className='font-bold'>Camp Fee:</span>
                            <span>{details.camp_fees}</span>
                        </p>

                    </div>
                    <p>{details.description}</p>

                    <div className='space-x-3'>

                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn bg-opacity-0 text-black border-[#29c178] hover:bg-[#29c178] hover:text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Join Camp</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className='m-5'>
                                    <form onSubmit={handleCampJoin} className='space-y-3'>
                                        <div className='flex space-x-3'>
                                            <input className='w-full input input-bordered' disabled defaultValue={details.camp_name} type="text" />
                                            <input className='w-full input input-bordered' disabled defaultValue={details.healthcare_professional} type="text" />
                                        </div>
                                        <div className='flex space-x-3'>
                                            <input className='w-full input input-bordered' disabled defaultValue={details.location} type="location" />
                                            <input className='w-full input input-bordered' disabled defaultValue={details.camp_fees} type="fees" />
                                        </div>
                                        <div className='flex space-x-3'>
                                            <input className='w-full input input-bordered' disabled defaultValue={user?.displayName} type="name" />
                                            <input className='w-full input input-bordered' disabled defaultValue={user?.email} type="email" />
                                        </div>
                                        <div className='flex space-x-3 text-black'>
                                            <input className='w-full input input-bordered' placeholder='Input Your Age' name='age' type="age" />
                                            <select onChange={handleChange} className="text-black select select-bordered w-full max-w-xs">
                                                <option className='text-black' disabled selected>Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                        <div className='flex space-x-3'>
                                            <input className='w-full input input-bordered' placeholder='Your Phone Number' name='phone_number' type="number" />
                                            <input className='w-full input input-bordered' placeholder='Emergency Contact' name='emergency_contact' type="number" />
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <input type="submit" value="Join Us" className="w-40 btn bg-opacity-0 text-black border-[#29c178] hover:bg-[#29c178] hover:text-white" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <ToastContainer />
                        </dialog>
                        <Link to="/">
                            <button className="btn bg-opacity-0 text-black border-[#29c178] hover:bg-[#29c178] hover:text-white">Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetail;