import axios from 'axios';
import { useCallback, useState, useMemo, useContext } from 'react';
import { AuthContext } from '../../../components/context/AuthContext.jsx';
import { API_BASE_URL } from './constants.js';
import { getLocalStorage } from '../storage/storage.mjs';

const { accessToken } = getLocalStorage('user');

export function getApiClient(accessToken) {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    instance.interceptors.request.use(function(config) {
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
        // console.log('About to make request', url, method, data);
        // if (data === undefined) {
        //     console.error('Data is undefined');
        // } else

        // if (method !== 'GET') console.log('About to make request', url, method, data);
        const response = await apiClient.request({
            url: url,
            method: method,
            data: data,
        });

        // if (method === 'GET') {
        //     console.log(`About to make GET request to URL: ${url}`);
        // } else {
        //     console.log(`About to make ${method} request to URL: ${url} with data: `, data);
        // }

        if (response.status >= 200 && response.status < 300) {
            // console.log('Server responded with success, response data is: ', response.data);
            // continue handling your response here e.g. setData(response.data)..
        } else {
            // console.error(response.message);
        }
        // console.log('Received response', response);
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
        setIsError(true);
        setErrorMsg('An error occurred during the HTTP request: ' + error.message);
        return error;
    } finally {
        setIsLoading(false);
    }

}

export const useApi = (accessToken) => {
    const [auth] = useContext(AuthContext);
    const apiClient = useMemo(() => getApiClient(accessToken), [accessToken]);

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
