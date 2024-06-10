import React, { useState } from 'react';
import login from '../../assets/login.jpg'
import google from '../../assets/google.png'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Login = () => {

    const { loginSystem, googleLoginSystem } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')
    const from = location.state?.from?.pathname || "/"
    console.log('kaj hocce', from)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        loginSystem(data.email, data.password)
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Loggin Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate(from, { replace: true })
                })
                setError('')

            })
            .catch(error => {
                console.log(error.message)
                console.log('kaj hocce na')
                setError("Something is rong", error.message)
            })
    }

    const handleGoogle = () => {
        googleLoginSystem()
        .then(res =>{
            console.log(res.user)
            navigate(from, { replace: true })
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    return (
        <div className='loginBackground bg-no-repeat bg-cover bg-center ps-6 flex flex-row-reverse  justify-end pe-3 items-center min-h-screen'>
            <div className='lg:w-[40%] lg:mx-20 border-2 text-white bg-[#00000076] border-yellow-500 p-10 '>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <input {...register("email", { required: true })} type="email" placeholder='Enter Your Email' className="text-black w-full input input-bordered" />
                        {errors.email && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Password</label>
                        <input {...register("password", { required: true })} placeholder='Enter Your Password' type="password" className="text-black w-full input input-bordered" />
                        {errors.email && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='text-center'>
                        <input className='btn w-52' type="submit" value="Login" />
                    </div>
                </form>
                <div className='text-center my-5'>
                    <button onClick={handleGoogle} className='btn w-32'>
                        <img className='w-10' src={google} alt="" />
                    </button>
                </div>
                <div className='flex flex-col'>
                    <span className='text-red-500'>{error}</span>
                    <span>Don’t have an account yet? <Link to="/sign-up" className='text-green-500'>Sign up</Link></span>
                </div>
            </div>

        </div>
    );
};

export default Login;