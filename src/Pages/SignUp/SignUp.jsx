import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import google from '../../assets/google.png'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { signUpSystem, userUpdateSystem, googleLoginSystem } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        signUpSystem(data.email, data.password)
            .then(res => {
                console.log(res.user)
                userUpdateSystem(data.name, data.PhotoURL)
                    .then(res => {
                        const userInfo = {
                            name: data?.name,
                            email: data?.email,
                            image: data?.PhotoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user add for database')
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Your Register Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        navigate('/')
                                    })
                                }
                            })
                        console.log(res.user)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })

            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const handleGoogle = () => {
        googleLoginSystem()
            .then(res => {
                console.log(res.user)
                const userInfo = {
                    name: res?.user?.displayName,
                    email: res?.user?.email,
                    image: res?.user?.photoURL
                }
                console.log(userInfo)
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }


    return (
        <div className='signUpBackground bg-no-repeat bg-cover bg-center flex flex-row-reverse  justify-start items-center min-h-screen'>
            <div className='text-white bg-[#00000076] lg:w-[40%] lg:mx-20 border-2 border-yellow-500 w-full mx-3 p-2'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 lg:p-5'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Name</label>
                        <input {...register("name", { required: true })} type="name" placeholder='Enter Your Full Name' className="text-black w-full input input-bordered" />
                        {errors.name && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">PhotoUrl</label>
                        <input {...register("PhotoURL", { required: true })} type="photo" placeholder='Enter Your Photo Url' className="text-black w-full input input-bordered" />
                        {errors.name && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <input {...register("email", { required: true })} type="email" placeholder='Enter Your Email' className="text-black w-full input input-bordered" />
                        {errors.email && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Password</label>
                        <input {...register("password", { required: true, minLength: 6, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/ })} placeholder='Enter Your Password' type="password" className="text-black w-full input input-bordered" />
                        {errors.password && <span className='text-red-500'>Password must  uppercase, lowercase and any number</span>}
                    </div>
                    <div className='text-center'>
                        <input className='btn w-52' type="submit" value="Sign Up" />
                    </div>
                </form>
                <div className='text-center my-5'>
                    <button onClick={handleGoogle} className='btn w-32'>
                        <img className='w-10' src={google} alt="" />
                    </button>
                </div>
                <span>Have an account yet? <Link to="/login" className='text-green-500'>Login</Link></span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;