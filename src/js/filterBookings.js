export function filterBookings(bookings) {
    let bookingsArray = [];

    if (bookings && bookings.length) {
        bookings.forEach((booking) => {
            if (new Date(booking.dateFrom) <= new Date(booking.dateTo)) {
                bookingsArray.push({ start: new Date(booking.dateFrom), end: new Date(booking.dateTo) });
            }
        });
        bookingsArray.sort((a, b) => a.start - b.start);
    }

    return bookingsArray;
}