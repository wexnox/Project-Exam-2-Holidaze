import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useState } from 'react';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    function handleProfileMenu() {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto py-3">
                <a className="navbar-brand text-2xl font-bold text-gray-800" href="/">
                    Holidays
                </a>

                <ul className="flex justify-between items-center md:flex-grow">
                    <li>
                        <NavLink className="inline-flex py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900" to="/venues">
                            Venues
                        </NavLink>
                    </li>

                    {isLoggedIn() && (
                        <div className="relative">
                            <button
                                className="dropdown-toggle inline-flex py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={handleProfileMenu}
                            >
                                Profile
                            </button>

                            <ul
                                className={`${isProfileMenuOpen ? 'block' : 'hidden'} absolute z-50 bottom-10 min-w-[8rem] max-w-[12rem] right-0 bg-gray-50 border border-gray-100 shadow-sm shadow-slate-200 rounded-md sm:top-8 sm:h-fit`}
                                aria-labelledby="dropdown-menu-profile"
                            >
                                <li>
                                    <NavLink className="dropdown-item" to="/profile">
                                        View Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/edit-profile">
                                        Edit Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => logout()}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                    {!isLoggedIn() && (
                        <div>
                            <NavLink className="inline-flex py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900" to="/register">
                                Register
                            </NavLink>
                            <li>
                                <NavLink className="inline-flex py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
