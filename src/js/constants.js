/**
 * The base URL for the Holidaze API.
 *
 * @type {string}
 * @constant
 * @default 'https://api.noroff.dev/api/v1/holidaze/'
 */
const API_BASE_URL = 'https://api.noroff.dev/api/v1/holidaze/';

/**
 * API_REGISTER is a constant variable that represents the endpoint for user registration.
 * It is built using the API_BASE_URL and adding the '/auth/register' path to it.
 *
 * @type {string}
 */
const API_REGISTER = API_BASE_URL + 'auth/register';
/**
 * The API_LOGIN variable is a constant that represents the API endpoint for user login.
 * It is constructed by appending the 'auth/login' path to the API_BASE_URL.
 *
 * @type {string}
 */
const API_LOGIN = API_BASE_URL + 'auth/login';
/**
 * Represents the API endpoint for user profiles.
 *
 * @constant {string} API_PROFILE
 * @memberof module:constants
 * @example
 * // API_BASE_URL is 'https://api.example.com/'
 * const API_PROFILE = API_BASE_URL + 'profiles';
 */
const API_PROFILE = API_BASE_URL + 'profiles';

/**
 * @constant {string} API_VENUES - The endpoint URL for venues in the API.
 *
 * The `API_VENUES` constant represents the complete URL for the venues endpoint in the API. It is constructed by concatenating the `API_BASE_URL` with the string `'venues'`.
 *
 * @see {@link API_BASE_URL}
 *
 */
const API_VENUES = API_BASE_URL + 'venues';

/**
 * Represents the API endpoint for booking-related operations.
 *
 * @type {string}
 */
const API_BOOKING = API_BASE_URL + 'bookings';

export { API_BASE_URL, API_REGISTER, API_LOGIN, API_PROFILE, API_VENUES, API_BOOKING };
