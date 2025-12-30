import { format, parseISO } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_PROFILE } from '../../js/constants.js';
import { getLocalStorage } from '../../js/storage.mjs';
import { handleImageError } from '../../js/validation.js';
import { SettingsContext } from '../context/SettingsContext.js';

function ProfileCustomer() {
  const { data, isLoading, isError, fetchData } = useContext(SettingsContext);
  const [isDoneFetching, setIsDoneFetching] = useState(false);
  const { name, accessToken } = getLocalStorage('user');
  const upComingBookings = data.bookings
    ? data.bookings
        .filter(
          (booking) => new Date(new Date().setHours(0, 0, 0, 0)) <= new Date(booking.dateFrom),
        )
        .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
    : [];

  useEffect(() => {
    fetchData(`${API_PROFILE}/${name}?_bookings=true&_venues=true`, 'GET', accessToken).then(() =>
      setIsDoneFetching(true),
    );
  }, [accessToken, fetchData, name]);

  return (
    <>
      {isLoading && (
        <>
          <div className={'flex justify-center my-0 mx-auto relative'}>
            <div className={'loader absolute'}></div>
          </div>
        </>
      )}
      <div
        id={'bookings-container'}
        className={'flex flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3'}
      >
        {upComingBookings.length > 0 &&
          upComingBookings.map(({ created, dateFrom, dateTo, guests, venue }, index) => {
            const dateCreated = format(parseISO(created), 'd MMM');
            const fromDate = format(parseISO(dateFrom), 'd MMM');
            const toDate = format(parseISO(dateTo), 'd MMM');

            return (
              <div
                key={index}
                className={
                  'flex flex-col gap-2 rounded-xl p-6 border border-neutral-200 shadow-sm shadow-neutral-100'
                }
              >
                <Link to={`/venues/venue-details/${venue.id}`}>
                  <img
                    className={'rounded-xl object-cover h-72 w-full lg:h-44'}
                    src={venue.media[0]}
                    alt={venue.name}
                    onError={handleImageError}
                  />
                </Link>
                <div>
                  <h3
                    className={
                      'text-lg font-bold capitalize whitespace-nowrap overflow-hidden text-ellipsis'
                    }
                  >
                    {venue.name}
                  </h3>
                  <p className={'text-xs font-light mt-1'}>Booked on {dateCreated}</p>
                </div>
                <p className={'mt-1.5'}>
                  <span className={'font-bold'}>{guests}</span> guest{guests > 1 && 's'}
                </p>
                <h4 className={'text-base font-bold'}>
                  From {fromDate} to {toDate}
                </h4>
              </div>
            );
          })}
      </div>
      {isDoneFetching && upComingBookings.length === 0 && !isError && (
        <div
          className={
            'rounded-xl p-6 border border-neutral-200 shadow-sm shadow-neutral-100 md:w-fit'
          }
        >
          <h3 className={'text-lg font-bold mb-2'}>No upcoming bookings</h3>
          <p>
            Have a look at{' '}
            <Link
              className={'text-rose-800 font-bold underline-offset-4 decoration-2 hover:underline'}
              to={'/venues'}
            >
              Venues
            </Link>{' '}
          </p>
        </div>
      )}
      {isError && (
        <div className={'api-error md:w-fit'}>
          <p>Something went wrong..</p>
          <p>Please try again later</p>
        </div>
      )}
    </>
  );
}

export default ProfileCustomer;
