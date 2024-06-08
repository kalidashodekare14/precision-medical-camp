import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt, FaUserCheck } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const ParticipantProfile = () => {


    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { data: profile = {}, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/profile/${user?.email}`)
            return res.data[0]
        }
    })

    console.log(user.email)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const imageFiles = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFiles, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        const updateProfile = {
            name: data.name,
            email: data.email,
            address: data.address,
            phone_number: data.phone_number,
            image: res.data.data.display_url
        }
        const resData = await axiosPublic.put(`/profile-update/${profile._id}`, updateProfile)
        console.log(resData.data)
        if(resData.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your information update successfuly",
                showConfirmButton: false,
                timer: 1500
              });
        }
        refetch()
    }



    return (
        <div className="lg:min-h-screen py-5 flex bg-base-200 justify-center items-center">
            <div className=" card lg:w-[70%]  bg-base-100 shadow-xl p-5">
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="flex justify-end items-center">
                    <CiEdit className="text-5xl" />
                </button>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                            <div className="flex  flex-col justify-center items-center">
                                <div className="w-32 flex rounded-full">
                                    <img alt="" className="w-32 h-[20vh] rounded-full" src={profile.image} />
                                </div>
                                <div className="my-10 space-y-3">
                                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex flex-col lg:flex-row items-center space-x-2">
                                            <input {...register("name")} defaultValue={profile.name} className="input w-full border-b-[#32c45e] rounded-none" type="text" />
                                            <input {...register("email")} defaultValue={profile.email} className="input w-full border-b-[#32c45e] rounded-none" type="text" />
                                        </div>
                                        <div className="flex w-full flex-col lg:flex-row items-center space-x-2">
                                            <input {...register("address")} defaultValue={profile.address} placeholder="Your Address" className="input w-full  border-b-[#32c45e] rounded-none" type="text" />
                                            <input {...register("phone_number")} defaultValue={profile.phone_number} placeholder="Your Phone Number" className="input w-full border-b-[#32c45e] rounded-none" type="text" />
                                        </div>
                                        <div className="my-3 w-full">
                                            <input {...register("image")} type="file" className="w-full file-input file-input-bordered" />
                                        </div>
                                        <div className="text-center">
                                            <input className="btn mt-5" type="submit" value="Update" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
                <form className="flex  flex-col justify-center items-center">
                    <div className="w-32 flex rounded-full">
                        <img alt="" className="w-32 h-[20vh] rounded-full" src={profile.image} />
                    </div>
                    <div className="card-body space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex items-center space-x-2 border-b border-b-[#32c45e]">
                                <FaUserCheck className="text-xl" />
                                <h1>{profile.name}</h1>
                            </div>

                            <div className="flex p-2 border-b space-x-2 border-b-[#32c45e] items-center">
                                <MdEmail className="text-xl" />
                                <h1>{profile.email}</h1>
                            </div>
                            <div className="flex p-2 border-b space-x-2 border-b-[#32c45e] items-center">
                                <IoLocation className="text-xl" />
                                <span>
                                    {
                                        profile.address ? <h1>{profile.address}</h1>
                                            : 'Update Your Address'
                                    }
                                </span>
                            </div>
                            <div className="flex p-2 border-b space-x-2 border-b-[#32c45e] items-center">
                                <FaPhoneAlt className="text-xl" />
                                <span>
                                    {
                                        profile.phone_number ? <h1>{profile.phone_number}</h1>
                                            : 'Update Your Phone Number'
                                    }
                                </span>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParticipantProfile;