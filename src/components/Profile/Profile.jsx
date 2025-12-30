import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ProfileVenueManager from './ProfileVenueManager.jsx';
import UpcomingBookings from './UpcomingBookings.jsx';
import profileImg from '../../assets/placeholder-image.svg';
import { useApi } from '../../js/api.js';
import { API_PROFILE } from '../../js/constants.js';
import { getLocalStorage } from '../../js/storage.mjs';
import { getValidationImageSchema, smoothScrollToElement } from '../../js/validation.js';
import { AuthContext } from '../context/AuthContext.js';

const useProfile = (
  navigate,
  setAuth,
  isError,
  setIsFormError,
  avatarErrorRef,
  avatarSubmitButtonRef,
  accessToken,
  data,
) => {
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
  const [auth, setAuth] = useContext(AuthContext);
  const { name, avatar, venueManager, accessToken } = auth || getLocalStorage('user');
  const navigate = useNavigate();
  const [avatarURL, setAvatarURL] = useState('');
  const { data, isLoading, errorMsg, isError, fetchData } = useApi(accessToken);
  const {
    data: roleData,
    isLoading: isUpdatingRole,
    isError: isRoleError,
    errorMsg: roleErrorMsg,
    created: roleUpdated,
    fetchData: updateRole,
  } = useApi();
  const [isFormError, setIsFormError] = useState(false);
  const avatarErrorRef = useRef(null);
  const avatarSubmitButtonRef = useRef(null);
  const [isVenueManager, setIsVenueManager] = useState(venueManager);
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
    // Ensure we send the access token for auth and the avatar payload as the body
    fetchData(`${API_PROFILE}/${name}/media`, 'PUT', accessToken, data);
  };

  useProfile(
    navigate,
    setAuth,
    isError,
    setIsFormError,
    avatarErrorRef,
    avatarSubmitButtonRef,
    accessToken,
    data,
  );

  useEffect(() => {
    document.title = 'Holidaze | Profile';
  }, []);

  // Sync updated role back to auth and localStorage when API responds
  useEffect(() => {
    if (typeof roleData?.venueManager === 'boolean') {
      const baseUser = auth || getLocalStorage('user');
      const updatedUser = { ...baseUser, venueManager: roleData.venueManager };
      setAuth(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [roleData, setAuth, auth]);

  function handleVenueManager(e) {
    const checked = e.target.checked;
    setIsVenueManager(checked);
    updateRole(`${API_PROFILE}/${name}`, 'PUT', accessToken, { venueManager: checked });
  }

  return (
    <main className={'mt-[120px] min-h-[50vh] sm:mt-12'}>
      <section id={'profile'} className={'mt-[88px] mb-12 sm:mt-12'}>
        <div className={'container mx-auto px-4 max-w-7xl'}>
          <h1 className={'text-4xl font-bold mb-10'}>Profile</h1>
          <div id={'profile-container'} className={'flex flex-col gap-14 sm:flex-row sm:gap-8'}>
            <div id={'avatar-container'} className={'sm:w-[18rem] shrink-0'}>
              <h2 className={'text-xl font-bold mb-6'}>Avatar</h2>
              <div
                className={
                  'rounded-xl px-6 pt-12 pb-6 border border-neutral-200 shadow-sm shadow-neutral-100'
                }
              >
                <img
                  className={'h-32 w-32 object-cover rounded-full my-0 mx-auto'}
                  src={avatar ? avatar : profileImg}
                  alt={'Profile avatar'}
                />
                <h3 className={'text-center text-xl font-bold mt-8 overflow-hidden'}>{name}</h3>
                <h4 className={'text-center text-xl font-light italic mt-4'}>
                  {isVenueManager ? 'Venue Manager' : 'Customer'}
                </h4>
                <div className={'mt-4 flex items-center gap-2 justify-center'}>
                  <input
                    id={'toggle-venue-manager'}
                    type={'checkbox'}
                    checked={!!isVenueManager}
                    onChange={handleVenueManager}
                    disabled={isUpdatingRole}
                  />
                  <label htmlFor={'toggle-venue-manager'} className={'select-none'}>
                    I am a Venue manager
                  </label>
                </div>
                {isRoleError && (
                  <p className={'text-red-700 mt-2 text-center'}>
                    {roleErrorMsg || 'Failed to update role. Please try again.'}
                  </p>
                )}
                <div id={'avatar-update'} className={'mt-12'}>
                  <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    onBlur={() => setIsFormError(false)}
                  >
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
                    {errors.avatar && (
                      <p className={'text-red-700 mt-4'}>{errors.avatar?.message}</p>
                    )}
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
                          className={
                            'loader absolute top-2.5 left-4 h-5 w-5 border-2 border-t-transparent'
                          }
                        ></span>
                      )}
                      {isLoading ? 'Processing..' : 'Update avatar'}
                    </button>

                    <div ref={avatarErrorRef}>
                      {isFormError && (
                        <div className={'api-error mt-6 break-words'}>{errorMsg}</div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className={'flex-1'}>
              {venueManager ? <ProfileVenueManager /> : <UpcomingBookings />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
