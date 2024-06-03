import React from 'react';
import { FaHome, FaRegistered } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoMdAddCircle } from 'react-icons/io';
import { SiGooglecampaignmanager360 } from 'react-icons/si';
import { Link, NavLink, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div className='flex'>
            <div className='w-[20%] border min-h-screen'>
                <ul className='menu'>
                    <li>
                        <NavLink to="/dashboard/organizer-profile">
                            <ImProfile className='text-2xl' />
                            Organizer Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-a-camp">
                            <IoMdAddCircle className='text-2xl' />
                            Add A Camp
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-camps">
                            <SiGooglecampaignmanager360 className='text-2xl' />
                            Manage Camps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-registered-camps">
                            <FaRegistered className='text-2xl' />
                            Manage Registered Camps
                        </NavLink>
                    </li>

                    <div className="divider">OR</div>
                    <li>
                        <NavLink to="/">
                            <FaHome className='text-2xl' />
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='w-full border'>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default DashBoard;