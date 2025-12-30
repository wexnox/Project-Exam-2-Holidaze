import en_gb from 'date-fns/locale/en-GB';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useApi } from '../../js/api.js';
import { API_BOOKING, API_VENUES } from '../../js/constants.js';
import { filterBookings } from '../../js/filterBookings.js';
import { smoothScrollToElement } from '../../js/validation.js';
import {
  handleGuests,
  onChange,
  handleSubmit as submitBookingHelper,
} from '../../js/venueDetailsHelper.js';
import { AuthContext } from '../context/AuthContext.js';
import { SettingsContext } from '../context/SettingsContext.js';
import DateRangePicker from '../DateRangePicker.jsx';
import RatingStars from '../RatingStars.jsx';
import Slideshow from '../SlideShow.jsx';

registerLocale('en-GB', en_gb);

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function VenueDetails() {
  const { id } = useParams();
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const { data, isLoading, created: venueLoaded, isError, fetchData } = useApi();

  const {
    data: postBooking,
    created,
    isLoading: isLoadingBooking,
    isError: isErrorBooking,
    errorMsg,
    fetchData: fetchBooking,
  } = useApi();

  const {
    id: venueId,
    name,
    description,
    media,
    location,
    owner,
    maxGuests,
    meta,
    price,
    bookings,
  } = data;
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [hasVenueCoordinates, setHasVenueCoordinates] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const bookingsArray = filterBookings(bookings) || [];
  const [isFormError, setIsFormError] = useState(false);
  const { setIsVenueSectionActive } = useContext(SettingsContext);
  const submitBookingRef = useRef(null);
  const bookingErrorRef = useRef(null);
  const [isVenueOwnedByUser, setIsVenueOwnedByUSer] = useState(false);
  const [venueAddress, setVenueAddress] = useState('');
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const venueAddressPopUp = useRef(null);
  const routerLocation = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const onReserveSubmit = (e) => {
    e.preventDefault();
    if (!auth) {
      setShowAuthModal(true);
      return;
    }
    // Delegate to existing booking helper for authenticated users
    submitBookingHelper(
      e,
      auth,
      owner,
      startDate,
      endDate,
      guests,
      venueId,
      fetchBooking,
      setIsVenueOwnedByUSer,
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('Form submitted');
    // console.log('e:', e);
    // console.log('auth:', auth);
    // console.log('owner:', owner);
    // console.log('startDate:', startDate);
    // console.log('endDate:', endDate);
    // console.log('guests:', guests);
    // console.log('venueId:', venueId);
    // console.log('fetchBooking:', fetchBooking);
    // console.log('setIsVenueOwnedByUSer:', setIsVenueOwnedByUSer);

    // Check if owner exists and if its name matches the name in auth
    const isUserOwner = owner && auth.name === owner.name;

    // if (auth.name !== owner.name) {
    if (!isUserOwner) {
      console.log('Trying to book a venue not owned by the user');

      if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error('startDate and endDate must be instances of Date');
      }

      console.log('Trying to book a venue not owned by the user');
      let startDateISOString, endDateISOString;

      if (startDate instanceof Date) {
        startDateISOString = startDate.toISOString();
      }
      if (endDate instanceof Date) {
        endDateISOString = endDate.toISOString();
      }
      if (!startDateISOString || !endDateISOString) {
        console.error('Invalid date(s).');
        // handle this case as per your requirement and return the control
        return;
      }

      const body = {
        dateFrom: startDateISOString,
        dateTo: endDateISOString,
        guests: guests,
        venueId: venueId,
      };

      fetchBooking(API_BOOKING, 'POST', auth.accessToken, body).catch((error) =>
        console.error('Error:', error),
      );
    } else {
      setIsVenueOwnedByUSer(true);
    }
  }

  useEffect(() => {
    // Fetch venue details once when the id changes. Include owner and bookings for booking logic and calendar.
    fetchData(`${API_VENUES}/${id}?_owner=true&_bookings=true`, 'GET', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isErrorBooking) {
      submitBookingRef.current.focus();
      setIsFormError(true);
      smoothScrollToElement(bookingErrorRef);
    }
  }, [isErrorBooking]);

  useEffect(() => {
    if (created) {
      const promise = new Promise((resolve) => {
        resolve(setIsVenueSectionActive(false));
      });
      promise.then(() => navigate('/profile'));
    }
  }, [created, navigate, setIsVenueSectionActive]);

  useEffect(() => {
    let venueAddressString;

    if (
      location &&
      location.address !== 'Unknown' &&
      location.address.length &&
      location.city !== 'Unknown' &&
      location.city.length &&
      location.country !== 'Unknown' &&
      location.country.length
    ) {
      venueAddressString = `${location.address}, ${location.city}, ${location.country}`;
    } else if (venueLoaded) {
      venueAddressString = 'Placeholder for venues with no address';
    }
    setVenueAddress(venueAddressString);
  }, [location, venueLoaded]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14,
    });
    venueAddressPopUp.current = new mapboxgl.Popup({
      closeButton: false,
      maxWidth: 'none',
    });
    marker.current = new mapboxgl.Marker({ color: '#9f1239' });
  });

  useEffect(() => {
    if (location && validateCoordinates(location.lat) && validateCoordinates(location.lng)) {
      setHasVenueCoordinates(true);
      setLng(location.lng);
      setLat(location.lat);

      venueAddressPopUp.current.setText(venueAddress).addTo(map.current);
      marker.current
        .setLngLat([location.lng, location.lat])
        .addTo(map.current)
        .setPopup(venueAddressPopUp.current)
        .togglePopup();

      map.current.jumpTo({
        center: [lng, lat],
      });
    }
  }, [lat, lng, location, venueAddress]);

  function validateCoordinates(num) {
    if (Math.floor(num) === num) return false;
    return num.toString().split('.')[1].length > 1;
  }

  const handleDateChange = (dates) => {
    // Ensure we pass arguments in the correct order expected by onChange:
    // (dates, startDate, setStartDate, setMaxDate, setEndDate, bookingsArray)
    onChange(dates, startDate, setStartDate, setMaxDate, setEndDate, bookingsArray);
  };

  return (
    <main className={'mt-[120px] sm:mt-10'}>
      <section className={'mt-[88px] mb-6 sm:mt-12 lg:mb-20'}>
        <div className={'container mx-auto px-4 max-w-7xl flex-col'}>
          {isLoading && (
            <>
              <div
                className={'absolute left-0 right-0 z-40 min-h-screen flex justify-center bg-white'}
              >
                <div className={'loader mt-24'}></div>
              </div>
            </>
          )}
          <Slideshow
            media={media || []}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
          />
          {!isError ? (
            <>
              <h1 className="mt-10 text-center border-b-2 border-b-slate-100 text-2xl font-bold capitalize mb-1 break-words sm:text-4xl">
                {name}
              </h1>
              <div className="flex justify-center mb-2">
                <RatingStars rating={data?.rating} size={16} />
              </div>
              <h2 className="mb-6 capitalize text-center">{location && venueAddress}</h2>
              <div className="flex flex-col gap-6 min-h-[888px] lg:min-h-0 lg:flex-row lg:h-[460px] ">
                <div className={`${!venueLoaded ? 'hidden' : 'block'}  py-6   w-full`}>
                  <div
                    className={`left-0 px-6 bg-white  ${showMoreDesc && 'z-20 rounded-xl venue-desc-shadow'}`}
                  >
                    <div
                      className={`border-b border-b-slate-100 pb-3 ${showMoreDesc && 'lg:pb-9'}`}
                    >
                      <h2
                        onClick={() =>
                          description && description.length > 120 && setShowMoreDesc(!showMoreDesc)
                        }
                        className={`text-base font-bold overflow-wrap-anywhere text-center  ${showMoreDesc && 'whitespace-pre-line'}`}
                      >
                        {description && description.substring(0, 120)}
                        <span
                          className={`${description && description.length > 120 ? 'inline' : 'hidden'} ${!showMoreDesc ? 'inline' : 'hidden'}`}
                        >
                          ....
                        </span>
                        {showMoreDesc && <span>{description && description.substring(120)}</span>}
                      </h2>
                      {description && description.length > 120 && (
                        <button
                          aria-label={'Show more or less description toggle'}
                          onClick={() => setShowMoreDesc(!showMoreDesc)}
                          className={`underline-offset-4 w-fit mt-2
                                                    ${
                                                      showMoreDesc && 'mt-4'
                                                    } text-sm font-light text-center bottom-[14px] right-[32px] bg-white lg:absolute lg:mt-0 hover:underline`}
                        >
                          {showMoreDesc ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={'flex flex-col text-center gap-4 mt-4 px-6 lg:mt-20'}>
                    <p>
                      Up to <span className={'font-bold'}>{maxGuests}</span> guests
                    </p>
                    <div className={'flex items-center justify-center text-center '}>
                      {owner && (
                        <>
                          <p>
                            Hosted by <span className={'font-bold'}>{owner.name}</span>
                          </p>
                          {owner.avatar && (
                            <img
                              loading={'lazy'}
                              className={'object-cover rounded-full h-6 w-6'}
                              src={owner.avatar}
                              alt={owner.name}
                              onError={(e) => e.currentTarget.remove()}
                            />
                          )}
                        </>
                      )}
                    </div>

                    <div
                      className={
                        'flex flex-wrap justify-center text-sm gap-4 leading-6 font-bold sm:text-base'
                      }
                    >
                      {meta &&
                        Object.keys(meta).map((item, index) => {
                          return (
                            <div key={index} className={'flex gap-1.5 items-center capitalize'}>
                              <p>{item}</p>
                              {meta[item] ? (
                                <span
                                  role={'status'}
                                  aria-label={`This venue has ${item}`}
                                  className={''}
                                >
                                  <FcCheckmark />
                                </span>
                              ) : (
                                <span
                                  role={'status'}
                                  aria-label={`This venue does not have ${item}`}
                                >
                                  <FcCancel />
                                </span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                    <h3 className={'text-lg mt-2 pb-2 border-b border-b-zinc-100'}>
                      <span className={'font-bold'}>{price && price.toLocaleString()} kr NOK</span>{' '}
                      per night
                    </h3>
                  </div>

                  <form
                    autoComplete="off"
                    onSubmit={onReserveSubmit}
                    id={'booking'}
                    className={'flex flex-col gap-4 px-6 mt-8 lg:mt-9'}
                  >
                    <div className={'flex flex-col justify-center gap-4 sm:flex-row sm:gap-8'}>
                      <div className={' flex flex-col gap-2'}>
                        <label htmlFor={'dates'}>Available dates:</label>

                        <DateRangePicker
                          startDate={startDate}
                          endDate={endDate}
                          setStartDate={setStartDate} // newly added
                          handleDateChange={handleDateChange}
                          bookingsArray={bookingsArray}
                          auth={auth}
                          maxDate={maxDate}
                          setMaxDate={setMaxDate}
                        />
                      </div>

                      <div className={'flex flex-col gap-2'}>
                        <label htmlFor={'guests'}>Guests: </label>

                        <div className={'flex items-center'}>
                          <button
                            aria-label={'Decrement guests'}
                            id={'guest-decrement'}
                            type={'button'}
                            disabled={guests === 1}
                            onClick={(e) => handleGuests(e, guests, setGuests)}
                            className={`rounded-full p-3 lg:p-2 border border-neutral-400 ${guests === 1 && 'opacity-30 cursor-not-allowed'}`}
                          >
                            <FaMinus />
                          </button>

                          <input
                            aria-label={'Current number of guests'}
                            name={'guests'}
                            id={'guests'}
                            value={guests}
                            min={1}
                            max={maxGuests}
                            className={'text-center h-10 w-10 font-bold'}
                            type={'number'}
                            readOnly
                          />

                          <button
                            aria-label={'Increment guests'}
                            id={'guest-increment'}
                            type={'button'}
                            disabled={guests === maxGuests}
                            onClick={(e) => handleGuests(e, guests, setGuests)}
                            className={`rounded-full p-3 lg:p-2 border border-neutral-400
                                                        ${guests === maxGuests && 'opacity-30 cursor-not-allowed'}`}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={'flex flex-col gap-4 sm:flex-row sm:items-center'}>
                      <button
                        ref={submitBookingRef}
                        type={'submit'}
                        className={`bg-slate-400 hover:scale-105 rounded-b-2xl text-white rounded h-10 w-full hover:bg-slate-700 disabled:hover:cursor-none ease-out duration-200`}
                      >
                        Reserve
                      </button>
                      {isVenueOwnedByUser && (
                        <span
                          className={
                            'rounded py-2 px-4 font-bold text-sm text-slate-800 border border-slate-700'
                          }
                        >
                          You can not reserve your own venue
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div ref={bookingErrorRef}>
                {isFormError && (
                  <div className={'my-8 w-full lg:w-2/4 lg:pl-6 lg:ml-auto'}>{errorMsg}</div>
                )}
              </div>
              <div
                id={'venue-map'}
                className={hasVenueCoordinates ? 'mt-12 lg:mt-20' : 'invisible h-0'}
              >
                <div
                  ref={mapContainer}
                  className={`map-container h-[480px] rounded-xl mt-6 mb-12`}
                />
              </div>
            </>
          ) : (
            <>
              <div className={'min-h-[50vh]'}>
                <h2 className={'text-2xl font-bold capitalize mb-10 sm:text-4xl'}>Venue details</h2>
                <div className={' w-fit'}>
                  <p>Something went wrong..</p>
                  <p>Please try again later</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Auth Required Modal */}
        {showAuthModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="ease-in duration-100 fixed z-40 inset-0 bg-neutral-900/70 overflow-auto flex justify-center items-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAuthModal(false);
            }}
          >
            <div className="bg-white max-w-md mx-auto rounded-xl w-11/12 sm:w-full">
              <div className="px-6 pb-6">
                <header className="h-[80px] flex items-center justify-center relative border-b-2 border-b-neutral-50">
                  <h3 className="font-bold">Sign in required</h3>
                  <button
                    aria-label={'Close modal'}
                    className={'absolute right-0'}
                    onClick={() => setShowAuthModal(false)}
                  >
                    <svg
                      className={'pointer-events-none'}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                        fill="#111827"
                      />
                    </svg>
                  </button>
                </header>
                <div className="mt-4">
                  <p className="mb-6">
                    You need to be logged in as a customer to reserve this venue.
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="bg-rose-800 text-white rounded h-10 w-full hover:bg-rose-700 ease-out duration-200"
                      onClick={() => {
                        setShowAuthModal(false);
                        navigate('/login', { state: { from: routerLocation.pathname } });
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="bg-amber-500 text-gray-900 rounded h-10 w-full font-bold hover:bg-amber-400 ease-out duration-200"
                      onClick={() => {
                        setShowAuthModal(false);
                        navigate('/register', { state: { from: routerLocation.pathname } });
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default VenueDetails;
