import placeHolderImg from '../assets/placeholder-image.svg';
import * as yup from 'yup';

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

const getValidationImageSchema = yup.object({
    avatar: yup
        .string()
        .trim()
        .required('This is a required field')
        .matches(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/, 'Image URL is not valid'),
});

const getValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .matches(/^\w+$/, 'Name must not contain punctuation symbols apart from underscore')
        .required('Name is a required field')
        .max(20, 'Name cannot be greater than 20 characters'),
    email: yup
        .string()
        .email()
        .required()
        .matches(/.*@stud\.noroff\.no$/, 'Must be a stud.noroff.no email'),
    password: yup.string().min(8).required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
});

export { getValidVenues, handleImageError, smoothScrollToElement, getValidationSchema, getValidationImageSchema };