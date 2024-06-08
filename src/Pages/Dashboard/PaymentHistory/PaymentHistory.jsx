import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePagination from '@mui/material/usePagination/usePagination';

const PaymentHistory = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const itemsPerPage = 10

    const { data: historyInfo = [] } = useQuery({
        queryKey: ['historyInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`)
            return res.data
        }
    })


    const {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        nextPage,
        prevPage,
        setPage
    } = usePagination(historyInfo.length, itemsPerPage)

    const currentItems = historyInfo.slice(startIndex, endIndex + 1)

    const handleChange = (event, value) => {
        setPage(value)
    }

    console.log(historyInfo)

    return (
        <div>
            <h1 className='text-center text-4xl my-10'>Payment History</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#32c45e]  text-[#000000] text-[14px]">
                            <th></th>
                            <th className='font-semibold'>Transactions</th>
                            <th className='font-semibold'>Camp Name</th>
                            <th className='font-semibold'>Camp Fees</th>
                            <th className='font-semibold'>Payment Status</th>
                            <th className='font-semibold'>Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((item, index) => (
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