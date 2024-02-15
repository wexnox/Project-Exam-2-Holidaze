import React from 'react';

const ArrowIcon = () => (
    <svg
        className={'pointer-events-none'}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
    >
        <rect x="0" y="0" width="24" height="24" fill="none"
              stroke="none" />
        <path fill="currentColor"
              d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z" />
    </svg>
);
export default ArrowIcon;