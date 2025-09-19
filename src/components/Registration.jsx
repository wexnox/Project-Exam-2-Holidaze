import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { API_REGISTER } from '../js/constants.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';
import { useApi } from '../js/api.js';
import { getValidationSchema } from '../js/validation.js';


function Register() {
  const [auth, setAuth] = useContext(AuthContext);
  const [isVenueManager, setIsVenueManager] = useState(false);

  const { data: response, isLoading, isError, errorMsg, fetchData } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(getValidationSchema)
  });

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

      // Include venueManager flag from checkbox in the payload
      const payload = { ...data, venueManager: isVenueManager };
      const response = await axios.post(API_REGISTER, payload);

      // Store full user object and set auth context
      if (response.data) {

        setAuth(response.data);

        localStorage.setItem('user', JSON.stringify(response.data));

        navigate('/profile');

      } else {

        throw new Error('Invalid response received.');

      }
    } catch (error) {

      // Gracefully handle server validation errors

      if (error?.response?.data?.errors) {
        setServerError(error.response.data.errors[0]);
      } else {
        setServerError('An error occurred while trying to register.');
      }
    }
  };

  const useSubmit = (data) => {
    const body = data;
    body.venueManager = isVenueManager;

    fetchData(API_REGISTER, 'POST', null, body);
  };

  function handleVenueManager() {
    setIsVenueManager(!isVenueManager);
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12">
      <form className="w-full max-w-md container mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input id="name" type="text"
                 className="w-full p-2 border border-gray-300 rounded" {...register('name')} />
          <p className="text-xs text-gray-500 mt-1">Allowed: letters, numbers, and underscore (_). No spaces or other symbols.</p>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input id="email" type="email"
                 className="w-full p-2 border border-gray-300 rounded" {...register('email')} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input id="password" type="password"
                 className="w-full p-2 border border-gray-300 rounded" {...register('password')} />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input id="confirmPassword" type="password"
                 className="w-full p-2 border border-gray-300 rounded" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <div className={'flex items-center gap-2 mt-3'}>
          <label htmlFor={'venue-manager'} className={'select-none'}>
            I am a Venue manager
          </label>
          <input id={'venue-manager'} type={'checkbox'} onChange={handleVenueManager} />
        </div>
        {serverError && <p className="text-red-500">{serverError}</p>}
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
