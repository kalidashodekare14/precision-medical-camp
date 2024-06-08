import React, { useEffect } from 'react';
import Slider from './Slider/Slider';
import PopularMedicalCamp from './PopularMedicalCamp/PopularMedicalCamp';
import { Link } from 'react-router-dom';
import Feedback from './Feedback/Feedback';



const Home = () => {

    

    return (
        <div>
            <Slider></Slider>
            <div className='lg:mx-20 text-center my-20'>
                <h1 className='text-4xl font-bold'>Popular Medical Camps</h1>
                <div className='mt-20'>
                    <PopularMedicalCamp></PopularMedicalCamp>
                </div>
                <Link to="/available-camps">
                    <button className='mt-10 btn bg-opacity-0 border-[#29c178] hover:bg-[#29c178]'>See All Camps</button>
                </Link>
            </div>
            <div>
                <h1 className='text-center text-4xl font-bold'>Participant Feedback</h1>
                <Feedback></Feedback>
            </div>
        </div>
    );
};

export default Home;