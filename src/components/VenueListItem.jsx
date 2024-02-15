import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const VenueListItem = ({ id, name, media, maxGuests, price }) => {
    const firstImage = media?.[0] ?? 'defaultImageURL';
    const altText = `${name} venue`;
    return (
        <Link key={id} to={`/venues/venue-details/${id}`}>
            <img loading={'lazy'}
                 className={'rounded-t-2xl object-cover h-80 w-full shadow-slate-900 shadow-2xl md:h-64'} alt={altText}
                 src={firstImage} />
            <div className={'flex flex-col gap-2 mt-10 text-center'}>
                <h3 className={'text-lg text-ellipsis font-bold whitespace-pre-line capitalize border-b-2 overflow-hidden '}>{name}</h3>
                <p className={'mt-5'}>Up to <span className={'font-bold'}>{maxGuests}</span> guests</p>
                <p className={'font-bold mt-2'}>{price.toLocaleString()} kr NOK <span
                    className={'font-normal'}>per night</span>
                </p>
            </div>
            <button
                className={'bg-slate-300 text-white rounded-b-2xl h-10 w-full mt-4 group-hover:bg-slate-800 ease-out duration-200'}>View
                details
            </button>
        </Link>
    );
};
VenueListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.array.isRequired,
    maxGuests: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};
export default VenueListItem;
