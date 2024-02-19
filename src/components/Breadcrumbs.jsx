import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export default function Breadcrumbs() {

    const location = useLocation();
    let currentLink = '';

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink = +`/${crumb}`;

            return (
                <div key={crumb}>
                    <Link to={currentLink}>{crumb}</Link>
                </div>
            );
        });


    return (
        <div>{crumbs}</div>
    );
}
