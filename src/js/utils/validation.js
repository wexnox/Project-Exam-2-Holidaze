import placeHolderImg from '../.././assets/placeholder-image.svg';

const isNotNullOrUndefined = (value) => value !== null && value !== undefined;

const hasValidMedia = (venue) => isNotNullOrUndefined(venue.media) && venue.media.length > 0;
const hasName = (venue) => isNotNullOrUndefined(venue.name);
const hasDescription = (venue) => isNotNullOrUndefined(venue.description);
const isValidPrice = (venue) => isNotNullOrUndefined(venue.price) && venue.price > 0;
const isValidMaxGuests = (venue) => isNotNullOrUndefined(venue.maxGuests) && venue.maxGuests > 0;

const isVenueValid = (venue) => [hasValidMedia, hasName, hasDescription, isValidPrice, isValidMaxGuests].every((validate) => validate(venue));

const getValidVenues = (venues) => venues.filter(isVenueValid);

function handleImageError(event) {
    event.target.src = placeHolderImg;
}

function smoothScrollToElement(elementRef) {
    elementRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

export { getValidVenues, handleImageError, smoothScrollToElement };
