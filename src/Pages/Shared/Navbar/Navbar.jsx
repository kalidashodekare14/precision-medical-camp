import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import userImage from '../../../assets/userImage.png'
import logo from '/logo.png'
import useOrganizer from '../../../Hooks/useOrganizer';

const Navbar = () => {

    const { user, logOutSystem } = useAuth()
    const [isOranizer] = useOrganizer()

    const links = <>
        <li>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? " border-b-2 border-[#29c178] rounded-none" : ""
                }
                to="/">
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "border-b-2 border-[#29c178] rounded-none" : ""
                }
                to="/available-camps">
                Available Camps
            </NavLink>
        </li>
    </>

    const handleLogOut = () =>{
        logOutSystem()
        .then(res =>{
            console.log('Login User', res.user)
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    return (
        <div className="absolute top-0 z-20 navbar text-white bg-[#0000005a]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <img className='w-40' src={logo} alt="" />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    user.photoURL && <img alt={user?.displayName} src={user?.photoURL} />  
                                }
                                {
                                    user.photoURL || <img alt="Tailwind CSS Navbar component" src={userImage} />
                                }
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    <span className='text-black'>{user.displayName}</span>
                                </a>
                            </li>
                            <li><Link to={`${isOranizer ? '/dashboard/organizer-profile' : '/dashboard/participant-profile'}`} className='text-black'>Dashboard</Link></li>
                            <li><span onClick={handleLogOut} className='text-black'>Logout</span></li>
                        </ul>
                    </div>
                        : <Link to="/login">
                            <span className='btn hover:bg-[#29c178] border-[#0ba35a] bg-opacity-0  text-white'>Join US</span>
                        </Link>

                }
                
            </div>
            
        </div>
    );
};

export default Navbar;