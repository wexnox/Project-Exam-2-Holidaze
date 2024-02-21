import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

/**
 * Represents the layout of the application.
 *
 * @returns {JSX.Element} The layout component.
 */
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
export default Layout;
