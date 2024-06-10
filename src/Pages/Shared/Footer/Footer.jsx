import React from 'react';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosTime } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import logo from '/logo.png'

const Footer = () => {
    return (
        <footer className="footer p-10 bg-[#07332f] text-white">
            <aside >
                <div className='space-y-5'>
                    <img className='w-52' src={logo} alt="" />
                    <p className='leading-[25px] font-[20px]'>Bringing healthcare closer to those in need. <br /> Join us in our mission to make a difference, <br /> one medical camp at a time.</p>
                    <div className='flex items-center text-2xl space-x-5'>
                        <FaFacebookF />
                        <FaTwitter />
                        <FaYoutube />
                        <FaInstagram />
                    </div>
                </div>
            </aside>
            <nav className='space-y-3'>
                <h6 className="my-3 text-[#d79677] font-semibold text-[25px] font-sans">Quick Links</h6>
                <a className="link link-hover">Home</a>
                <a className="link link-hover">Available Camp</a>
                <a className="link link-hover">Services</a>
                <a className="link link-hover">Contect</a>
            </nav>
            <nav className='space-y-3'>
                <h6 className="my-3 text-[#d79677] font-semibold text-[25px] font-sans">Contact Details</h6>
                <a className="link flex items-center space-x-2 link-hover">
                    <FaLocationDot />
                    <span>Healthy City, CA 78901, USA</span>
                </a>
                <a className="link flex items-center space-x-2 link-hover">
                    <MdEmail />
                    <span>precisionmedicalcamp@gmail.com</span>
                </a>
                <a className="link flex items-center space-x-2 link-hover">
                    <FaPhoneAlt />
                    <span>(123) 456-7890</span>
                </a>
                <a className="link flex items-center space-x-2 link-hover">
                    <IoIosTime />
                    <span>8 AM - 5 PM, Sunday-Monday</span>
                </a>
            </nav>
            <nav className='space-y-3'>
                <h6 className="my-3 text-[#d79677] font-semibold text-[25px] font-sans">Newsletter</h6>
                <a className="link link-hover">
                    Subscribe To Our Newsletter
                </a>
                <a className="link link-hover">
                    Stay informed and never miss out <br /> on the latest news, health tips.
                </a>
                <a className="link link-hover border rounded-xl">
                    <div>
                        <input placeholder='Enter Your Email' className='w-40 bg-opacity-0 input input-bordered' type="text" />
                        <button className='border p-5 rounded-xl'>Send</button>
                    </div>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;