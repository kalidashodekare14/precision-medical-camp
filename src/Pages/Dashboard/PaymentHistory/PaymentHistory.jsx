import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: historyInfo  = []} = useQuery({
        queryKey: ['historyInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`)
            return res.data
        }
    })

    console.log(historyInfo)

    return (
        <div>
            <h1 className='text-center text-4xl my-10'>Payment History</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th></th>
                            <th>Transactions</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            historyInfo.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.transactions_id}</td>
                                    <td>{item.camp_name}</td>
                                    <td>${item.camp_fees}</td>
                                    <td>{item.payment_status}</td>
                                    <td>{item.confirmation_status}</td>
                                </tr>
                            ))
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;