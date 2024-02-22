import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getLocalStorage } from '../../js/storage.mjs';
import { useApi } from '../../js/api.js';
import { getValidationImageSchema, smoothScrollToElement } from '../../js/validation.js';
import { API_PROFILE } from '../../js/constants.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/placeholder-image.svg';

const useProfile = (navigate, setAuth, isError, setIsFormError, avatarErrorRef, avatarSubmitButtonRef, accessToken, data) => {
    useEffect(() => {
        // checkUserAuthentication function
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')));
        } else {
            navigate('/', { replace: true });
        }
    }, [navigate, setAuth]);

    useEffect(() => {
        if (isError) {
            avatarSubmitButtonRef.current.focus();
            setIsFormError(true);
            smoothScrollToElement(avatarErrorRef);
        }
    }, [isError, avatarSubmitButtonRef, setIsFormError, avatarErrorRef]);

    useEffect(() => {
        // updateLocalUser function
        if (data?.avatar) {
            const updatedUser = { ...data, accessToken };
            setAuth(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    }, [accessToken, data, setAuth]);
};

function Profile() {

    const [, setAuth] = useContext(AuthContext);
    const { name, avatar, venueManager, accessToken } = getLocalStorage('user');
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState('');
    const { data, isLoading, errorMsg, isError, fetchData } = useApi(accessToken);
    const [isFormError, setIsFormError] = useState(false);
    const avatarErrorRef = useRef(null);
    const avatarSubmitButtonRef = useRef(null);
    const [isVenueManager, setIsVenueManager] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(getValidationImageSchema),
    });

    const handleURLChange = (event) => {
        setAvatarURL(event.target.value);
    };

    const handleFormSubmit = (data) => {
        fetchData(`${API_PROFILE}/${name}/media`, 'PUT', data);
    };

    useProfile(navigate, setAuth, isError, setIsFormError, avatarErrorRef, avatarSubmitButtonRef, accessToken, data);

    useEffect(() => {
        document.title = 'Holidaze | Profile';
    }, []);

    function handleVenueManager(e) {
        setIsVenueManager(e.target.checked);
        if (e.target.checked) {
            // Call the API to update the venue manager status
            fetchData(`${API_PROFILE}/${name}`, 'PUT', { venueManager: true });
        } else {
            fetchData(`${API_PROFILE}/${name}`, 'PUT', { venueManager: false });
        }
    }

    return (
        <main className={'mt-[120px] min-h-[50vh] sm:mt-12'}>
            <section id={'profile'} className={'mt-[88px] mb-12 sm:mt-12'}>
                <div className={'container mx-auto px-4 max-w-7xl'}>
                    <h1 className={'text-4xl font-bold mb-10'}>Profile</h1>
                    <div id={'profile-container'} className={'flex flex-col gap-14 sm:flex-row sm:gap-8'}>
                        <div id={'avatar-container'} className={'sm:w-[18rem] shrink-0'}>
                            <h2 className={'text-xl font-bold mb-6'}>Avatar</h2>
                            <div className={'rounded-xl px-6 pt-12 pb-6 border border-neutral-200 shadow-sm shadow-neutral-100'}>
                                <img
                                    className={'h-32 w-32 object-cover rounded-full my-0 mx-auto'}
                                    src={avatar ? avatar : profileImg}
                                    alt={'Profile avatar'}
                                />
                                <h3 className={'text-center text-xl font-bold mt-8 overflow-hidden'}>{name}</h3>
                                <h4 className={'text-center text-xl font-light italic mt-4'}>
                                    {venueManager ? 'Venue Manager' : 'Customer'}
                                </h4>
                                <div id={'avatar-update'} className={'mt-12'}>


                                    <form onSubmit={handleSubmit(handleFormSubmit)} onBlur={() => setIsFormError(false)}>
                                        <label className={'block font-bold mb-4'} htmlFor={'avatar'}>
                                            Update avatar
                                        </label>
                                        <input
                                            {...register('avatar')}
                                            id={'avatar'}
                                            className={`border-gray-200 border rounded h-10 indent-4 w-full font-medium placeholder:text-zinc-500 placeholder:font-normal ${
                                                errors.avatar && 'border-red-700'
                                            }`}
                                            type={'text'}
                                            placeholder={'Avatar URL'}
                                        />
                                        {errors.avatar && <p className={'text-red-700 mt-4'}>{errors.avatar?.message}</p>}
                                        <button
                                            ref={avatarSubmitButtonRef}
                                            type={'submit'}
                                            className={
                                                'relative rounded mt-4 bg-rose-800 text-white h-10 w-full hover:bg-rose-700 disabled:hover:cursor-none ease-out duration-200'
                                            }
                                            disabled={isLoading}
                                        >
                                            {isLoading && (
                                                <span
                                                    className={'loader absolute top-2.5 left-4 h-5 w-5 border-2 border-t-transparent'}
                                                ></span>
                                            )}
                                            {isLoading ? 'Processing..' : 'Update avatar'}
                                        </button>

                                        <div ref={avatarErrorRef}>
                                            {isFormError && <div className={'api-error mt-6 break-words'}>{errorMsg}</div>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}


export default Profile;