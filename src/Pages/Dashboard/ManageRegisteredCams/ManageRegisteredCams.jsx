import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { MdCancel } from 'react-icons/md';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageRegisteredCams = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: manageCamps = [], refetch } = useQuery({
        queryKey: ['regisCamp', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-register-camp`)
            return res.data

        }
    })


    const handleConfirmStatus = async (manageCamp) => {
        console.log(manageCamp._id)
        const res = await axiosSecure.patch(`/register-camp/${manageCamp._id}`)
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            const res = await axiosSecure.patch(`/payment-history/${manageCamp._id}`)
            console.log(res.data)
        }
        refetch()
    }

    

    const handleCancel = async (manageCamp) => {
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
                const res = await axiosSecure.delete(`/register-camp/${manageCamp._id}`)
                console.log(res.data)
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Registred Camp has been Deleted",
                        icon: "success"
                    });
                }
                refetch()
               
            }
        });

    }


    return (
        <div>
            <div>
                <h1 className='text-center text-4xl my-10'>Registered Camps</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#32c45e]  text-[#000000] text-[14px]">
                            <th></th>
                            <th className='font-semibold'>Participant Name</th>
                            <th className='font-semibold'>Camp name</th>
                            <th className='font-semibold'>Camp Fees</th>
                            <th className='font-semibold'>Payment Status</th>
                            <th className='font-semibold'>Confirmation Status</th>
                            <th className='font-semibold'>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageCamps.map((manageCamp, index) => <tr key={manageCamp._id}>
                                <th>{index + 1}</th>
                                <td>{manageCamp.participant_name}</td>
                                <td>{manageCamp.camp_name}</td>
                                <td>${manageCamp.camp_fees}</td>
                                <td>
                                    {
                                        manageCamp.payment_status === 'Pay' ? 'Unpain' : 'Paid'
                                    }
                                </td>
                                <td>
                                    <button disabled={manageCamp.payment_status !== 'Paid'} onClick={() => handleConfirmStatus(manageCamp)} className='btn'>
                                        {manageCamp.confirmmation_status}
                                    </button>
                                </td>
                                <td>
                                    <div>
                                        {
                                            manageCamp.confirmmation_status !== 'Pending' ? <MdCancel className='text-[26px] text-red-600' />
                                                :
                                                <div onClick={() => handleCancel(manageCamp)}>
                                                    <FaCheckCircle className='text-2xl text-[#52bd33]' />
                                                </div>
                                        }
                                    </div>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCams;