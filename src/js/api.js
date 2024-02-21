import axios from 'axios';
import { useCallback, useState, useMemo, useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext.jsx';
import { API_BASE_URL } from './constants.js';
import { getLocalStorage } from './storage.mjs';

function isValidToken(accessToken) {
    if (typeof accessToken !== 'string') {
        console.error('Invalid token: Token must be a string.');
        return false;
    }
    const parts = accessToken.split('.');
    return parts.length === 3;
}

export function getApiClient(accessToken) {
    if (!isValidToken(accessToken)) {
        console.error('Invalid access token format:', accessToken);
        // TODO: Consider more error handling here, like refreshing the token or redirecting to login
        return null;
    }
    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    instance.interceptors.request.use(function(config) {
        console.log(`Making request to ${config.url} with accessToken:`, config.headers.Authorization);
        // Do something before request is sent
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });

    return instance;
}

async function ApiFetchCall(url, method, data, handlers, apiClient) {
    const { setIsLoading, setIsError, setErrorMsg, setData, setCreated, setIsDeleted } = handlers;

    try {
        setIsLoading(true);
        setIsError(false);

        const response = await apiClient.request({
            url: url,
            method: method,
            data: data,
        });

        if (response.status >= 200 && response.status < 300) {
            // console.log('Server responded with success, response data is: ', response.data);
            // continue handling your response here e.g. setData(response.data)..
        } else {
            // console.error(response.message);
        }
        console.log('Received response', response);
        if (response instanceof Error) {
            // handle error here
            // console.error(response.message);
        }
        if (response.status === 204) {
            setIsDeleted((prevDeleted) => prevDeleted + 1);
        } else {
            setData(response.data);
            setCreated(true);
        }

    } catch (error) {
        // console.log('Caught an error during request', error);
        // setIsError(true);
        // setErrorMsg('An error occurred during the HTTP request: ' + error.message);
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, e.g., refresh token or redirect to login
            console.error('Unauthorized request, need to refresh token or login again.');
        } else {
            setIsError(true);
            setErrorMsg('An error occurred during the HTTP request: ' + error.message);
        }
        return error;
    } finally {
        setIsLoading(false);
    }

}

export const useApi = () => {


    // const { accessToken } = getLocalStorage('user');
// Add this line to check the retrieved token

    const { accessToken } = useContext(AuthContext);
    const [auth] = useContext(AuthContext);
    console.log('Retrieved accessToken:', accessToken); // Debug log to check the retrieved token
    const apiClient = useMemo(() => getApiClient(accessToken), [accessToken]);
    // console.log('Retrieved accessToken:', accessToken);
    // console.log('Passing accessToken to getApiClient:', accessToken); // Add this to check the passed token

    const [apiState, setApiState] = useState({
        data: [],
        created: false,
        isLoading: false,
        isError: false,
        errorMsg: '',
        isDeleted: 0,
    });

    const handlers = useMemo(
        () => ({
            setIsLoading: (value) => setApiState((prevState) => ({ ...prevState, isLoading: value })),
            setIsError: (value) => setApiState((prevState) => ({ ...prevState, isError: value })),
            setErrorMsg: (value) => setApiState((prevState) => ({ ...prevState, errorMsg: value })),
            setData: (value) => setApiState((prevState) => ({ ...prevState, data: value })),
            setCreated: (value) => setApiState((prevState) => ({ ...prevState, created: value })),
            setIsDeleted: (value) => setApiState((prevState) => ({ ...prevState, isDeleted: value })),
        }),
        [],
    );

    const fetchData = useCallback(
        async (url, method = 'GET', postData) => {
            try {
                await ApiFetchCall(url, method, postData, handlers, apiClient);
            } catch (e) {
                console.error(e);
            }
        },
        [handlers, apiClient],
    );

    return { ...apiState, fetchData };
};
