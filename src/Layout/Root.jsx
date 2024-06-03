import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Root = () => {

    const location = useLocation()
    console.log(location)
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('sign-up')

    return (
        <div className='relative'>
            <div>
                {
                    noHeaderFooter || <Navbar></Navbar>
                }
                
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;