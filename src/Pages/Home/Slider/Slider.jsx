import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import banner from '../../../assets/banner.jpg'

import './Slider.css'

const Slider = () => {
    return (
        <Carousel showThumbs useKeyboardArrows stopOnHover swipeable dynamicHeight emulateTouch showArrows showStatus infiniteLoop showIndicators>
            <div className='flex flex-col justify-center items-start lg:px-32  banner2 bg-no-repeat bg-center bg-cover h-[80vh] lg:min-h-screen space-y-6'>
                <div className='text-white w-2/3 space-y-3'>
                    <h1 className='lg:text-7xl text-3xl text-cener lg:text-left font-bold'>Inspiring <span className='text-[#ffb703]'>Success Stories</span></h1>
                    <p className='leading-6 text-left tracking-[0.50px] text-slate-300'>Explore our inspiring success stories from past medical camps. Each slide highlights transformative moments and positive outcomes, showcasing the profound impact of our healthcare initiatives. Celebrate the dedication and achievements that have brought hope and healing to communities</p>
                    <div className='text-left'>
                        <button className='bg-opacity-0  text-white border-[#ffb703] hover:bg-[#ffb703] hover:text-black btn'>Learn More</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-start lg:px-32  banner bg-no-repeat bg-center bg-cover h-[80vh] lg:min-h-screen space-y-6'>
            <div className='text-white w-2/3 space-y-3'>
                    <h1 className='lg:text-7xl text-3xl text-cener lg:text-left font-bold'>Inspiring <span className='text-[#ffb703]'>Success Stories</span></h1>
                    <p className='leading-6 text-left tracking-[0.50px] text-slate-300'>Explore our inspiring success stories from past medical camps. Each slide highlights transformative moments and positive outcomes, showcasing the profound impact of our healthcare initiatives. Celebrate the dedication and achievements that have brought hope and healing to communities</p>
                    <div className='text-left'>
                        <button className='bg-opacity-0  text-white border-[#ffb703] hover:bg-[#ffb703] hover:text-black btn'>Learn More</button>
                    </div>
                </div>
            </div>
            <div className='banner1 bg-no-repeat bg-center bg-cover h-[80vh] lg:min-h-screen'>
            </div>
        </Carousel>
    );
};

export default Slider;