import { Link } from 'react-router-dom';
import React from 'react';

const CONSTANTS = {
    PAGE_NOT_FOUND: 'Page Not Found',
    PAGE_DOES_NOT_EXIST: 'Sorry, the page you are looking for does not exist.',
    PAGE_DESCRIPTION: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aspernatur atque autem cumque dignissimos earum esse explicabo hic ipsam itaque maxime necessitatibus, perferendis porro qui quos soluta unde voluptatibus?',
    REDIRECTION_TEXT: 'Go to the',
    HOME_LINK: 'Homepage',
};

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-800">
            <h1 className="font-bold text-4xl mb-2">{CONSTANTS.PAGE_NOT_FOUND}</h1>
            <p className="mb-6 text-lg">{CONSTANTS.PAGE_DOES_NOT_EXIST}</p>
            <p className="mb-6 text-sm px-10 text-center">{CONSTANTS.PAGE_DESCRIPTION}</p>
            <p className="text-base">{CONSTANTS.REDIRECTION_TEXT}
                <Link className="text-blue-500 hover:text-blue-700" to="/">{CONSTANTS.HOME_LINK}</Link></p>
        </div>
    );
}