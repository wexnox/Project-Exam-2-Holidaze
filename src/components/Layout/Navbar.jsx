import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const [isNavVisible, setIsNavVisible] = useState(false);

    // search
    function handleSearch() {
        const trimmedSearchValue = searchValue.trim();
        if (trimmedSearchValue) {
            navigate(`/search/${trimmedSearchValue.replace(/  +/g, ' ')}`);
            return true;    // Navigation has occurred
        }
        return false;   // No navigation
    }

    function handleSearchEnterPress(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // profile menu
    const handleProfileMenu = useCallback(
        () => setIsProfileMenuOpen((prevState) => !prevState),
        [],
    );


    useEffect(() => {
        const handleClickOutside = event => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth(null);
        setIsProfileMenuOpen(false);
        navigate('/');
    }, [setAuth, setIsProfileMenuOpen, navigate]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setAuth(JSON.parse(user));
        }
    }, [setAuth]);

    const renderNavLink = (to, text) => (
        <div className={`lg:inline ${isNavVisible ? 'inline' : 'hidden'}`}>
            <li>
                <NavLink
                    className="inline-flex py-2 px-4 text-sm font-bold text-slate-600 hover:text-slate-900"
                    to={to}
                >
                    {text}
                </NavLink>
            </li>
        </div>
    );

    return (
        <nav className="bg-white">
            <div className="container mx-auto py-3">
                <div className="md:hidden lg:hidden absolute right-0 m-4">
                    <button onClick={() => setIsNavVisible(!isNavVisible)}>
                        <RxHamburgerMenu size={30} />
                    </button>
                </div>

                <Link to="/" className="navbar-brand text-2xl font-bold text-slate-600">Holidays</Link>
                <div id={'search'}
                     className={'w-full bg-white h-[72px] flex items-center mx-auto sm:static sm:max-w-[600px] lg:ml-[70px]'}>
                    <div className={'container mx-auto px-4 lg:p-0 '}>
                        <div className={'flex gap-2 max-w-[600px]'}>
                            <label className={'w-full relative'}>
                                <input aria-label={'Search for venues'}
                                       className={'border-gray-200 border rounded h-10 indent-4 w-full font-light placeholder:text-zinc-400 placeholder:font-normal'}
                                       type={'text'} placeholder={'Search your venues'} value={searchValue}
                                       onChange={(e) => setSearchValue(e.target.value)}
                                       onKeyUp={handleSearchEnterPress} />

                                <button aria-label={'Clear search value'} onClick={() => setSearchValue('')}
                                        className={`${searchValue.trim() ? 'absolute' : 'hidden'} right-3 top-2`}>
                                    <svg
                                        className={'pointer-events-none'}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                    >
                                        <path fill="#f87171"
                                              d="M24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12Z"
                                              opacity=".8"
                                        />
                                        <path fill="#fff"
                                              d="M8.365 8.364a.9.9 0 0 1 1.272 0L12 10.728l2.364-2.364a.9.9 0 1 1 1.271 1.272L13.274 12l2.364 2.364a.9.9 0 0 1-1.273 1.272L12 13.272l-2.363 2.364a.9.9 0 0 1-1.272-1.272L10.729 12 8.364 9.636a.9.9 0 0 1 0-1.272Z"
                                        />
                                    </svg>
                                </button>
                            </label>
                            <button onClick={handleSearch} aria-label={'Submit search'}
                                    className={'px-3 rounded hover:bg-blue-200 hover:text-white ease-out duration-200'}>Search
                            </button>
                        </div>
                    </div>
                </div>

                <ul className={`flex justify-between items-center ${isNavVisible ? 'block' : 'hidden'} md:flex`}>
                    {renderNavLink('/venues', 'Venues')}
                    {/*{renderNavLink('/about', 'About')}*/}
                    {/*{renderNavLink('/contact', 'Contact')}*/}
                    {auth && <button
                        className="dropdown-toggle inline-flex py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={handleProfileMenu}>
                        Profile
                    </button>}
                    {auth && isProfileMenuOpen && <ul
                        ref={profileMenuRef}
                        className="block z-50 bottom-10 min-w-[8rem] max-w-[12rem] right-0 bg-gray-50 border border-gray-100 shadow-sm shadow-slate-200 rounded-md sm:top-8 sm:h-fit"
                        aria-labelledby="dropdown-menu-profile">
                        <li><NavLink className="dropdown-item" to="/profile">View Profile</NavLink></li>
                        <li>
                            <button className="dropdown-item" onClick={logout}>Logout</button>
                        </li>
                    </ul>}
                    {!auth && renderNavLink('/register', 'Register')}
                    {!auth && renderNavLink('/login', 'Login')}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
