import React from 'react';
import { FaHome, FaRegistered } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoMdAddCircle, IoMdAnalytics } from 'react-icons/io';
import { MdPayments } from 'react-icons/md';
import { SiGooglecampaignmanager360 } from 'react-icons/si';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useOrganizer from '../../Hooks/useOrganizer';

const DashBoard = () => {

    //  DOTO: get isAdmin value from the database
    const [isOranizer] = useOrganizer()

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-[20%] w-full border lg:min-h-screen'>
                <ul className='menu'>
                    {
                        isOranizer ? <>
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

                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/analytics">
                                        <IoMdAnalytics className='text-2xl' />
                                        Analytics
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/participant-profile">
                                    <ImProfile className='text-2xl' />
                                        Participant Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/registered-camps">
                                        <FaRegistered className='text-2xl' />
                                        Registered Camps
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">
                                        <MdPayments className='text-2xl' />
                                        PaymentHistory
                                    </NavLink>
                                </li>
                            </>
                    }
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