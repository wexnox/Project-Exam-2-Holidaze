import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Represents a single venue item in a list.
 *
 * @param {object} VenueListItem - The props object.
 * @param {string} VenueListItem.id - The unique ID of the venue.
 * @param {string} VenueListItem.name - The name of the venue.
 * @param {string[]} VenueListItem.media - The array of media URLs for the venue.
 * @param {number} VenueListItem.maxGuests - The maximum number of guests the venue can accommodate.
 * @param {number} VenueListItem.price - The price of the venue per night.
 * @returns {ReactElement} The rendered venue item.
 */
const VenueListItem = ({ id, name, media, maxGuests, price }) => {
    const firstImage = media?.[0] ?? 'defaultImageURL';
    const altText = `${name} venue`;
    return (
        <Link key={id} to={`/venues/venue-details/${id}`}>
            <img loading={'lazy'}
                 className={'rounded-t-2xl shadow-slate-900 shadow-2xl object-cover h-80 w-full md:h-64'} alt={altText}
                 src={firstImage} />
            <div className={'flex flex-col gap-2 mt-10 text-center'}>
                <h3 className={'text-lg text-ellipsis font-bold whitespace-pre-line capitalize border-b-2 overflow-hidden '}>{name}</h3>
                <p className={'mt-5'}>Up to <span className={'font-bold'}>{maxGuests}</span> guests</p>
                <p className={'font-bold mt-2'}>{price.toLocaleString()} kr NOK <span
                    className={'font-normal'}>per night</span>
                </p>
            </div>
            <button

                className={'bg-slate-400 text-white rounded rounded-b-2xl h-10 w-full mt-4 disabled:hover:cursor-none hover:bg-slate-700 hover:scale-105 group-hover:bg-slate-700 ease-out duration-200'}>View
                details
            </button>
        </Link>
    );
};
/**
 * Props definition for the VenueListItem component.
 *
 * @typedef {Object} VenueListItemProps
 * @property {string} id - The unique identifier of the venue.
 * @property {string} name - The name of the venue.
 * @property {string} address - The address of the venue.
 * @property {string} city - The city where the venue is located.
 * @property {string} state - The state where the venue is located.
 * @property {string} country - The country where the venue is located.
 * @property {string} imageUrl - The URL of the image for the venue.
 * @property {number} rating - The rating of the venue (from 0 to 5).
 * @property {() => void} onClick - The callback function to be called when the venue is clicked.
 *
 * @example
 * // Using the VenueListItem component
 * const venue = {
 *   id: 'venue1',
 *   name: 'Example Venue',
 *   address: '123 Main St',
 *   city: 'City Example',
 *   state: 'State Example',
 *   country: 'Country Example',
 *   imageUrl: 'https://example.com/image.jpg',
 *   rating: 4,
 *   onClick: () => {
 *     console.log('Venue clicked');
 *   }
 * };
 *
 * <VenueListItem {...venue} />
 */
VenueListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.array.isRequired,
    maxGuests: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};
export default VenueListItem;
