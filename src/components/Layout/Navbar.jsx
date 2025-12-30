import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import profileImg from '../../assets/placeholder-image.svg';
import { handleImageError } from '../../js/validation.js';
import { AuthContext } from '../context/AuthContext.js';

function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const searchWrapRef = useRef(null);
  const [isNavVisible, setIsNavVisible] = useState(false);

  function handleSearch() {
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue) {
      navigate(`/search/${trimmedSearchValue.replace(/  +/g, ' ')}`);
      setIsSuggestOpen(false);
      return true;
    }
    return false;
  }

  function handleSearchEnterPress(e) {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsSuggestOpen(false);
    }
  }

  const handleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (isProfileMenuOpen) {
      const firstElement = profileMenuRef.current?.querySelector('a, button');
      firstElement && firstElement.focus();
    }
  }, [isProfileMenuOpen]);

  // Static helper suggestions (fields you can search by)
  const STATIC_SUGGESTIONS = [
    { label: 'Name' },
    { label: 'Address' },
    { label: 'City' },
    { label: 'Country' },
    { label: 'Continent' },
  ];

  // Close suggestions on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setIsSuggestOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(null);
    setIsProfileMenuOpen(false);
    navigate('/');
    // Focus back to the menu button after logout
    document.getElementById('menu-button').focus();
  }, [setAuth, setIsProfileMenuOpen, navigate]);

  // Check for auth on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(JSON.parse(user));
    }
  }, [setAuth]);

  // Render NavLink helper function
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
    <nav className="bg-white shadow-md z-50">
      <div className="container mx-auto py-3 flex items-center justify-between">
        {/* Holidays Link and Hamburger Menu */}
        <div className="flex items-center">
          {' '}
          {/* New flex container for left-aligned items */}
          <Link to="/" className="navbar-brand text-2xl font-bold text-slate-600 mr-4">
            Holidays
          </Link>
          <div className="md:hidden lg:hidden">
            <button onClick={() => setIsNavVisible(!isNavVisible)}>
              <RxHamburgerMenu size={30} />
            </button>
          </div>
        </div>
        {/* Search Input */}
        <div className="flex-grow px-4">
          <div className={'mx-auto px-4 lg:p-0 '}>
            <div className="flex gap-2 max-w-[600px]" ref={searchWrapRef}>
              <label className={'w-full relative'}>
                <input
                  aria-label={'Search for venues'}
                  className={
                    'border-gray-200 border rounded h-10 indent-4 w-full font-light placeholder:text-zinc-400 placeholder:font-normal'
                  }
                  type={'text'}
                  placeholder={'Search your venues'}
                  value={searchValue}
                  onFocus={() => setIsSuggestOpen(true)}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setIsSuggestOpen(true);
                  }}
                  onKeyDown={handleSearchEnterPress}
                />

                <button
                  aria-label={'Clear search value'}
                  onClick={() => {
                    setSearchValue('');
                    setIsSuggestOpen(false);
                  }}
                  className={`${searchValue.trim() ? 'absolute' : 'hidden'} right-3 top-2`}
                >
                  <svg
                    className={'pointer-events-none'}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      fill="#f87171"
                      d="M24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12Z"
                      opacity=".8"
                    />
                    <path
                      fill="#fff"
                      d="M8.365 8.364a.9.9 0 0 1 1.272 0L12 10.728l2.364-2.364a.9.9 0 1 1 1.271 1.272L13.274 12l2.364 2.364a.9.9 0 0 1-1.273 1.272L12 13.272l-2.363 2.364a.9.9 0 0 1-1.272-1.272L10.729 12 8.364 9.636a.9.9 0 0 1 0-1.272Z"
                    />
                  </svg>
                </button>

                {isSuggestOpen && (
                  <div
                    className={
                      'absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-sm p-2'
                    }
                  >
                    <p className={'text-xs text-gray-500 px-1 pb-2'}>You can search by:</p>
                    <div className={'flex flex-wrap gap-2 px-1'}>
                      {STATIC_SUGGESTIONS.map((s, idx) => (
                        <button
                          key={idx}
                          type={'button'}
                          className={
                            'text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                          onClick={() => {
                            setIsSuggestOpen(false);
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </label>
              <button
                onClick={handleSearch}
                aria-label={'Submit search'}
                className={'px-3 rounded hover:bg-blue-200 hover:text-white ease-out duration-200'}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Profile and Navigation Links */}
        <ul className={`flex items-center ${isNavVisible ? 'block' : 'hidden'} md:flex`}>
          {renderNavLink('/venues', 'Venues')}

          {auth && (
            <div className="relative inline-block text-left">
              <button
                id="menu-button"
                aria-expanded={isProfileMenuOpen ? 'true' : 'false'}
                aria-haspopup="true"
                onClick={handleProfileMenu}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <img
                  src={auth?.avatar || profileImg}
                  alt="Profile avatar"
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-gray-200"
                  onError={handleImageError}
                />
                <span className="hidden md:inline">Profile</span>
                {auth?.venueManager && (
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Manager
                  </span>
                )}
                <FaChevronDown
                  className={`ml-1 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* This conditional rendering will show the dropdown if isProfileMenuOpen is true */}
              {isProfileMenuOpen && (
                <div
                  ref={profileMenuRef}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    {/* Role indicator */}
                    <div className="px-4 py-2 text-xs text-gray-500" role="presentation">
                      Role: {auth?.venueManager ? 'Venue Manager' : 'Customer'}
                    </div>
                    <div className="border-t border-gray-100 my-1" role="presentation" />
                    {/* Dropdown menu items */}
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      View Profile
                    </NavLink>
                    {auth?.venueManager && (
                      <Link
                        to="/create-venue"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Create Venue
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {!auth && renderNavLink('/register', 'Register')}
          {!auth && renderNavLink('/login', 'Login')}
        </ul>
      </div>
      {/*<Breadcrumbs />*/}
    </nav>
  );
}

export default Navbar;
