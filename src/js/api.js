import { useCallback, useState } from 'react';
import axios from 'axios';

export function useApi() {
    const [data, setData] = useState([]);
    const [created, setCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDeleted, setIsDeleted] = useState(0);


    const handleError = useCallback(() => {
        setData([]);
        setIsError(true);
        setErrorMsg('Something went wrong.. please try again later');
    }, []);


    const fetchData = useCallback(
        async function(url, method = 'GET', auth, postData) {

            try {
                setIsLoading(true);
                setIsError(false);
                setErrorMsg('');
                setCreated(false);

                const response = await axios({
                    method: method,
                    url: url,
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${auth}`,
                    },
                    // body: JSON.stringify(postData),
                    data: postData,
                });

                if (response.status === 204) {
                    setIsDeleted(isDeleted + 1);
                } else {


                    if ([200, 201, 202].includes(response.status)) {
                        setData(response.data);
                        setCreated(true);
                    } else {
                        handleError(response.data.errors[0].message);
                    }
                }
            } catch (error) {
                setErrorMsg('Something went wrong.. please try again later');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        },

        [isDeleted, handleError]);

    return { data, created, isDeleted, isLoading, isError, errorMsg, fetchData };
}