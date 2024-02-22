/**
 * Retrieves the value of the specified key from the local storage.
 *
 * @param {string} key - The key of the item to retrieve from local storage.
 * @return {any} The value of the item if it exists in local storage, otherwise an empty array.
 */
function getLocalStorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

export { getLocalStorage };