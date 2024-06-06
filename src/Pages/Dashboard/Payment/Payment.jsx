import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_KEY}`)

const Payment = () => {

    const campData = useLoaderData()

    return (
        <div className='w-3/4'>
            <Elements stripe={stripePromise}>
                <CheckOutForm
                    campData={campData}
                ></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;