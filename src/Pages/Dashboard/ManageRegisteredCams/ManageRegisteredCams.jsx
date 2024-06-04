import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { MdCancel } from 'react-icons/md';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

const ManageRegisteredCams = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: manageCamps = [] } = useQuery({
        queryKey: ['regisCamp', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-camp/${user?.email}`)
            return res.data
        }
    })



    return (
        <div>
            <div>
                <h1 className='text-center text-4xl my-10'>Registered Camps</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th></th>
                            <th>Participant Name</th>
                            <th>Camp name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
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
                                    <button className='btn'>
                                        {
                                            manageCamp.payment_status === 'Pay' ? 'Unpain' : 'Paid'
                                        }

                                    </button>
                                </td>
                                <td>
                                    <button className='btn'>
                                        {manageCamp.confirmmation_status}
                                    </button>
                                </td>
                                <td>
                                    {
                                        manageCamp.confirmmation_status !== 'Pending' ? <MdCancel className='text-[26px] text-red-600' />
                                            :
                                            <FaCheckCircle className='text-2xl text-[#52bd33]' />
                                    }


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