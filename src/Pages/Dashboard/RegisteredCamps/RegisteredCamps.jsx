import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

// ToDo: add publicable key
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_KEY}`)


const RegisteredCamps = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [rating, setRating] = useState(0)


    const { data: regisCamps = [], refetch } = useQuery({
        queryKey: ['regisCamp', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/register-camp/${user?.email}`)
            return res.data

        }
    })

    const handleCancel = (regiscamp) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const res = axiosSecure.delete(`/register-camp/${regiscamp._id}`)
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

    const handleRatingAdnFeedback = async (e) => {
        e.preventDefault()
        const from = e.target
        const feedback = from.feedback.value
        const feedbackInfo = {
            rating: rating,
            feedback: feedback
        }
        const res = await axiosSecure.post('/rating-feedback', feedbackInfo)
        console.log(res.data)
        if (res.data.insertedId) {
            toast.success("Your feedback and Rating Successfuly")
        }
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
                            <th className='font-semibold'>Camp name</th>
                            <th className='font-semibold'>Camp Fees</th>
                            <th className='font-semibold'>Participant Name</th>
                            <th className='font-semibold'>Payment Status</th>
                            <th className='font-semibold'>Confirmation Status</th>
                            <th className='font-semibold'>Cancel</th>
                            <th className='font-semibold'>Feedback Button</th>
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
                                    <Link to={`/dashboard/payment/${regiscamp._id}`}>
                                        <button disabled={regiscamp.payment_status !== 'Pay'} className='btn'>
                                            {regiscamp.payment_status}
                                        </button>
                                    </Link>

                                </td>
                                <td>{regiscamp.confirmmation_status}</td>
                                <td>
                                    <button onClick={() => handleCancel(regiscamp)} disabled={regiscamp.payment_status !== "Pay"} className='btn'>Cancel</button>
                                </td>
                                <td>
                                    <button onClick={() => document.getElementById('my_modal_3').showModal()} disabled={regiscamp.feedback !== 'Feedback'} className='btn'>
                                        {regiscamp.feedback}
                                    </button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div>
                                                <h1 className='text-center text-3xl my-5'>Give your feedback and rating</h1>
                                            </div>
                                            <div className=''>
                                                <form onSubmit={handleRatingAdnFeedback} className='space-y-5 my-5   w-full flex flex-col justify-center items-center'>
                                                    <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                                                    <textarea placeholder='Please Your Feedback' name='feedback' className='h-[20vh] w-full textarea textarea-bordered'></textarea>
                                                    <input className='btn' type="submit" value="Submit" />
                                                </form>
                                                <ToastContainer />
                                            </div>
                                        </div>
                                    </dialog>
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