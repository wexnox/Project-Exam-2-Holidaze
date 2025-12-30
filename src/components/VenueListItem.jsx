import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import RatingStars from './RatingStars.jsx';

const VenueListItem = ({ id, name, media, maxGuests, price, rating, description }) => {
  const [visible, setVisible] = useState(true);
  const firstImage = media?.[0];

  // Do not render the card at all if there is no image URL
  if (!firstImage) return null;

  // If image failed to load, hide the card
  if (!visible) return null;

  const altText = `${name} venue`;
  return (
    <Link key={id} to={`/venues/venue-details/${id}`}>
      <img
        loading={'lazy'}
        className={'rounded-t-2xl shadow-slate-900 shadow-2xl object-cover h-80 w-full md:h-64'}
        alt={altText}
        src={firstImage}
        onError={() => setVisible(false)}
      />
      <div className={'flex flex-col gap-2 mt-10 text-center'}>
        <h3
          className={
            'text-lg text-ellipsis font-bold whitespace-pre-line capitalize border-b-2 overflow-hidden '
          }
        >
          {name}
        </h3>
        <div className={'mt-2 flex justify-center'}>
          <RatingStars rating={rating} />
        </div>
        {description && <p className={'mt-2 text-sm text-zinc-700 line-clamp-2'}>{description}</p>}
        <p className={'mt-3'}>
          Up to <span className={'font-bold'}>{maxGuests}</span> guests
        </p>
        <p className={'font-bold mt-2'}>
          {price.toLocaleString()} kr NOK <span className={'font-normal'}>per night</span>
        </p>
      </div>
      <button
        className={
          'bg-slate-400 text-white rounded rounded-b-2xl h-10 w-full mt-4 disabled:hover:cursor-none hover:bg-slate-700 hover:scale-105 group-hover:bg-slate-700 ease-out duration-200'
        }
      >
        View details
      </button>
    </Link>
  );
};

export default VenueListItem;
