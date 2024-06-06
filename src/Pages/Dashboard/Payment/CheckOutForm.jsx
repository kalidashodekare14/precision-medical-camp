import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckOutForm = ({ campData }) => {

    const { user } = useAuth()
    const [error, setError] = useState("")
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: campData.camp_fees })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })

    }, [axiosSecure, campData.camp_fees])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                //    save the database payment history
                const paymentHistory = {
                    user_name: user?.displayName,
                    user_email: user?.email,
                    camp_id: campData._id,
                    camp_name: campData.camp_name,
                    camp_fees: campData.camp_fees,
                    payment_status: 'Paid',
                    confirmation_status: 'Pending',
                    transactions_id: paymentIntent.id
                }

                const res = await axiosSecure.post('/payment-history', paymentHistory)
                console.log(res.data)
                if (res.data.insertedId) {
                    const res = await axiosSecure.patch(`/update-status/${campData._id}`)
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Payment Successfuly",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/registered-camps')
                    }
                }





            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='text-center text-3xl my-10'>Checkout Your Payment</h1>
            <CardElement
                className='border p-5'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',

                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='text-center'>
                <button className='btn mt-5' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <h1 className='text-red-500'>{error}</h1>
                <h1 className='text-xl mt-4 mb-2'>Your transaction id</h1>
                {
                    transactionId && <p className='text-green-500'>{transactionId}</p>
                }
            </div>
        </form>
    );
};

export default CheckOutForm;