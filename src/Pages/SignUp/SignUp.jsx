import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const { signUpSystem, userUpdateSystem } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        signUpSystem(data.email, data.password)
            .then(res => {
                console.log(res.user)
                userUpdateSystem(data.name)
                    .then(res => {
                        console.log(res.user)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
                navigate('/')
                toast("Your Register Successfuly")
            })
            .catch(error => {
                console.log(error.message)
            })
    }


    return (
        <div className='signUpBackground bg-no-repeat bg-cover bg-center flex flex-row-reverse  justify-start items-center min-h-screen'>
            <div className='text-white w-[40%] mx-20 border-2 border-yellow-500 p-10 '>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Name</label>
                        <input {...register("name", { required: true })} type="name" placeholder='Enter Your Full Name' className="text-black w-full input input-bordered" />
                        {errors.name && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Email</label>
                        <input {...register("email", { required: true })} type="email" placeholder='Enter Your Email' className="text-black w-full input input-bordered" />
                        {errors.email && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="">Password</label>
                        <input {...register("password", { required: true })} placeholder='Enter Your Password' type="password" className="text-black w-full input input-bordered" />
                        {errors.password && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <input className='btn w-32' type="submit" value="Login" />
                </form>
                <span>Have an account yet? <Link to="/login" className='text-green-500'>Login</Link></span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;