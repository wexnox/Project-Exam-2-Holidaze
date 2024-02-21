function getLocalStorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}


export { getLocalStorage };