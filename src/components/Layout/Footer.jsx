import React from 'react';
import { Link } from 'react-router-dom';
import About from '../../pages/About.jsx';

const Footer = () => {
    return (
        <footer className="bg-teal-500 text-white py-8">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="w-full md:w-1/4 text-center md:text-left">
                    <span className="title-font font-medium text-gray-200">Holidaze Inc.</span>
                    <p className="text-gray-500">Copyright © {new Date().getFullYear()} Holidaze Inc. All rights
                        reserved.</p>
                </div>
                <div className="w-full md:w-1/4 text-center md:text-left">
                    <h2 className="title-font font-medium text-gray-200 tracking-widest">CATEGORIES</h2>
                    <nav className="list-none mb-10">
                        <li>
                            <a className="text-gray-500 hover:text-white">First Link</a>
                        </li>
                        <li>
                            <a className="text-gray-500 hover:text-white">Second Link</a>
                        </li>
                        <li>
                            <a className="text-gray-500 hover:text-white">Third Link</a>
                        </li>
                        <li>
                            <a className="text-gray-500 hover:text-white">Fourth Link</a>
                        </li>
                    </nav>
                </div>
                <div className="w-full md:w-1/4 text-center md:text-left">
                    <h2 className="title-font font-medium text-gray-200 tracking-widest">FOLLOW US</h2>
                    <nav className="list-none mb-10">
                        <li>
                            <a className="text-gray-500 hover:text-white">Facebook</a>
                        </li>
                        <li>
                            <a className="text-gray-500 hover:text-white">Twitter</a>
                        </li>
                        <li>
                            <a className="text-gray-500 hover:text-white">Instagram</a>
                        </li>
                    </nav>
                </div>
                <div className="w-full md:w-1/4 text-center md:text-left">
                    <h2 className="title-font font-medium text-gray-200 tracking-widest">HAVE QUESTIONS?</h2>
                    <nav className="list-none mb-10">
                        <li>
                            <Link to="about" className="text-gray-500 hover:text-white">About</Link>
                        </li>
                        <li>
                            <Link to="contact" className="text-gray-500 hover:text-white">Contact</Link>
                        </li>
                    </nav>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
