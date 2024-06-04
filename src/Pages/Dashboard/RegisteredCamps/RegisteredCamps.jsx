import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RegisteredCamps = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: regisCamps = [] } = useQuery({
        queryKey: ['regisCamp', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-camp/${user?.email}`)
            return res.data
            
        }
    })


    console.log(regisCamps)

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
                            <th>Camp name</th>
                            <th>Camp Fees</th>
                            <th>Participant Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                            <th>Feedback Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            regisCamps.map((regiscamp, index) => <tr key={regiscamp._id}>
                                <th>{index + 1}</th>
                                <td>{regiscamp.camp_name}</td>
                                <td>${regiscamp.camp_fees}</td>
                                <td>{regiscamp.participant_name}</td>
                                <td>
                                    <button className='btn'>
                                        {regiscamp.payment_status}
                                    </button>
                                </td>
                                <td>{regiscamp.confirmmation_status}</td>
                                <td>
                                    <button disabled={regiscamp.payment_status !== "Pay"} className='btn'>Cancel</button>
                                </td>
                                <td>
                                    <button disabled={regiscamp.feedback !== 'Feedback'}  className='btn'>
                                        {regiscamp.feedback}
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamps;