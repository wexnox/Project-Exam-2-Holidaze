import React, { useContext, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../js/utils/storage/storage.mjs';
import { useApi } from '../js/utils/Api/api.js';
import { smoothScrollToElement } from '../js/utils/validation.js';
import { API_PROFILE } from '../js/utils/Api/constants.js';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../components/context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import profileImg from '../assets/placeholder-image.svg';

const schema = yup.object({
    avatar: yup
        .string()
        .trim()
        .required('This is a required field')
        .matches(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/, 'Image URL is not valid'),
});

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const handleURLChange = (event) => {
        setAvatarURL(event.target.value);
    };

    const handleFormSubmit = (data) => {
        fetchData(`${API_PROFILE}/${name}/media`, 'PUT', data);
    };

    useProfile(navigate, setAuth, isError, setIsFormError, avatarErrorRef, avatarSubmitButtonRef, accessToken, data);

    return (
        <section className="text-slate-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-gray-900">Profile
                        of {name}</h1>
                    <img
                        className="size-32 md:size-40 m-auto rounded"
                        src={avatar ? avatar : profileImg}
                        alt={`User's avatar`}
                    />
                    <p>You can update your avatar here</p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="lg:w-2/4 mx-auto ">
                    <div className="flex items-center justify-center flex-col">

                        <input {...register('avatar')} id={'avatar'}
                               value={avatarURL}
                               onChange={handleURLChange}
                               className={`border-gray-100 border rounded h-10 indent-2 w-full font-medium placeholder:text-zinc-500 placeholder:font-normal ${errors.avatar && 'border-red-700'
                               }`}
                               type={'text'}
                               placeholder={'Avatar URL'}
                        />
                        {errors.avatar && <p className={'text-red-700 mt-4'}>{errors.avatar?.message}</p>}

                        <button
                            ref={avatarSubmitButtonRef}
                            type={'submit'}
                            className={'relative rounded mt-4 bg-slate-800 text-white h-10 w-full hover:bg-slate-700 disabled:hover:cursor-none ease-out duration-200'}>Update
                            avatar
                        </button>

                        <div ref={avatarErrorRef} className="text-red-500 text-xs ml-3">{isFormError &&
                            <div className={'api-error mt-6 break-words'}>{errorMsg}</div>}</div>

                    </div>
                </form>
            </div>
        </section>
    );
}


export default Profile;