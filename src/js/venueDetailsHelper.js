import { API_BOOKING } from './constants.js';
import { useApi } from './api.js';


/**
 * Handles the guest increment and decrement based on the event and updates the guest count using the provided setter function.
 *
 * @param {Object} e - The event object triggered by the user action.
 * @param {number} guests - The current guest count.
 * @param {function} setGuests - The setter function to update the guest count.
 * @return {void}
 */
export function handleGuests(e, guests, setGuests) {
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

/**
 * Function to handle changes in dates.
 * Sets the start date, checks for bookings and sets the maximum date, and sets the end date.
 *
 * @param {Array<Date>} dates - The array of selected dates.
 * @param {Date} startDate - The current start date.
 * @param {function} setMaxDate - The function to set the maximum date.
 * @param {Date} endDate - The current end date.
 * @param {Array<Object>} bookingsArray - The array of bookings.
 * @param {function} setStartDate - The function to set the start date.
 * @param {function} setEndDate - The function to set the end date.
 * @return {void}
 */
export function onChange(dates, startDate, setMaxDate, endDate, bookingsArray, setStartDate, setEndDate) {
    const [start, end] = dates;
    setStartDate(start);

    if (bookingsArray.length > 0) {
        for (let i = 0; i < bookingsArray.length; i++) {
            if (bookingsArray[i] && start < bookingsArray[i].start) {
                setMaxDate(bookingsArray[i].start);
                break;
            }
        }
    }
    setEndDate(end);
}