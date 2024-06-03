import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const AddACamp = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());
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
                camp_fees: data.camp_fees,
                participant_count: '0',
                description: data.description,
                image: res.data.data.display_url

            }
            console.log(campItem)
            const menuRes = await axiosSecure.post('/popular-medical-camp', campItem)
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
        <div className='flex  justify-center items-center min-h-screen'>

            <div className='border p-20 space-y-5 w-2/3'>
                <h1 className='text-center font-bold text-4xl'>Add a Camp</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center space-x-3'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="">Camp Name</label>
                            <input {...register("camp_name")} className=' input input-bordered' type="text" />
                        </div>
                        <div className='w-full flex flex-col'>
                            <label htmlFor=""> Healthcare Professional Name</label>
                            <input {...register("healthcare_professional")} className='input input-bordered' type="text" />
                        </div>
                    </div>
                    <div className='mt-3 w-full space-x-3 flex items-center'>
                        <div className='w-full flex flex-col'>
                            <label htmlFor="">Add Image</label>
                            <input {...register("image")} type="file" className="w-full file-input file-input-bordered " />
                        </div>
                        <div className='mt-3 w-full flex flex-col'>
                            <label htmlFor="">Date &Time</label>
                            <DatePicker className='w-full input input-bordered' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <div className='mt-3 w-full flex flex-col'>
                            <label htmlFor="">Location</label>
                            <input {...register("location")} className=' input input-bordered' type="text" />
                        </div>
                        <div className='mt-3 w-full flex flex-col'>
                            <label htmlFor="">Camp Fees</label>
                            <input {...register("camp_fees")} className=' input input-bordered' type="text" />
                        </div>
                    </div>
                    <div className='w-full mt-3'>
                        <textarea {...register("description")} placeholder='Description' className='w-full textarea textarea-bordered' id=""></textarea>
                    </div>
                    <div className='text-center'>
                        <input className='btn w-52' type="submit" value="Add Camp" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddACamp;