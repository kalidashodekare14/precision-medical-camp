import React, { useState } from 'react';
import usePopularCamp from '../../../Hooks/usePopularCamp';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import usePagination from '../../../Hooks/usePagination';
import { Pagination } from '@mui/material';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const ManageCamps = () => {

    const [populars, loading, refetch] = usePopularCamp()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('')
    const itemsPerPage = 10;


    const searchSystem = populars.filter(camp => {
        const query = searchQuery.toLowerCase()
        return (
            camp.camp_name?.toLowerCase().includes(query) ||
            camp.healthcare_professional?.toLowerCase().includes(query)
        )
    })



    const {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        nextPage,
        prevPage,
        setPage
    } = usePagination(searchSystem.length, itemsPerPage)

    const currentItems = searchSystem.slice(startIndex, endIndex + 1)

    const handleChange = (event, value) => {
        setPage(value)
    }


    const handleDeleteCamp = (popular) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/popular-medical-camp/${popular._id}`)
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                }
                refetch()

            }
        });
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFiles = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFiles, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const campItem = {
                camp_name: data.camp_name,
                healthcare_professional: data.healthcare_professional,
                camp_fees: data.camp_fees,
                date_and_time: startDate,
                location: data.location,
                participant_count: '0',
                description: data.description,
                image: res.data.data.display_url

            }
            console.log(campItem)
            const menuRes = await axiosSecure.patch('/popular-medical-camp', campItem)
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Camp add successfuly",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data)
    }



    return (
        <div className='min-h-screen  space-y-10 flex flex-col my-10 items-center'>
            <div>
                <h1 className='text-center text-4xl'>Manage Camps</h1>
                <div className='text-center my-10'>
                    <input onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search' className='input input-bordered' type="text" />
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#32c45e]  text-[#000000] text-[14px]">
                            <th></th>
                            <th className='font-semibold'>Name</th>
                            <th className='font-semibold'>Healthcare Professional</th>
                            <th className='font-semibold'>Location</th>
                            <th className='font-semibold'>Date & Time</th>
                            <th className='font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((popular, index) => <tr key={popular._id}>
                                <th>{index + 1}</th>
                                <td>{popular.camp_name}</td>
                                <td>{popular.healthcare_professional}</td>
                                <td>{popular.location}</td>
                                <td>{new Date(popular.date_and_time).toLocaleDateString()}</td>
                                <td className='flex items-center space-x-3'>
                                    <div>
                                        <Link to={`/dashboard/manage-update/${popular._id}`}>
                                            <CiEdit className='text-4xl' />
                                        </Link>
                                    </div>
                                    <div onClick={() => handleDeleteCamp(popular)}>
                                        <MdOutlineDeleteForever className='text-4xl' />
                                    </div>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
                <div className='flex justify-center items-center my-10'>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChange}
                        variant="outlined"
                        siblingCount={0}
                        color="primary" />
                </div>
            </div>
        </div>
    );
};

export default ManageCamps;