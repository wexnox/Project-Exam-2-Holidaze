import { API_BOOKING } from './constants.js';

export function handleSubmit(e, auth, owner, startDate, endDate, guests, venueId, fetchBooking, setIsVenueOwnedByUSer) {
    e.preventDefault();

    if (auth && owner && auth.name !== owner.name) {
        const body = {
            dateFrom: startDate.toISOString(),
            dateTo: endDate.toISOString(),
            guests: guests,
            venueId: venueId,
        };
        // console.log('StartDate in VenueDetails: ', startDate);
        fetchBooking(API_BOOKING, 'POST', auth.accessToken, body);
    } else if (auth && owner && auth.name === owner.name) {
        setIsVenueOwnedByUSer(true);
    }
}

export function handleGuests(e, guests, setGuests) {
    // console.log('Guests in Helper: ', guests);
    // console.log('setGuests in Helper: ', setGuests);
    const id = e.currentTarget.id;
    switch (id) {
        case 'guest-increment':
            setGuests(guests + 1);
            break;
        case 'guest-decrement':
            setGuests(guests - 1);
            break;
    }
}

export function onChange(dates, startDate, setStartDate, setMaxDate, setEndDate, bookingsArray) {
    // console.log('StartDate in Helper: ', startDate);
    // console.log('setStartDate in Helper: ', setStartDate);
    const [start, end] = dates;
    setStartDate(start);

    if (bookingsArray.length > 0) {
        for (let i = 0; i < bookingsArray.length; i++) {
            if (start < bookingsArray[i].start) {
                setMaxDate(bookingsArray[i].start);
                break;
            }
        }
    }
    setEndDate(end);
}