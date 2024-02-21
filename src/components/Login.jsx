import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from './context/AuthContext.jsx';
import * as yup from 'yup';
import axios from 'axios';
import { API_LOGIN } from '../js/constants.js';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
        .matches(/.*@stud\.noroff\.no$/, 'Must be a stud.noroff.no email'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema),
    });
    const [, setAuth] = useContext(AuthContext);

    const [serverError, setServerError] = useState('');


    const onSubmit = async (data) => {
        try {
            const response = await axios.post(API_LOGIN, data);
            if (response.data && response.data.accessToken) {
                // console.log(response.data);
                setAuth(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
            } else {
                throw new Error('Invalid response received.');
            }
        } catch (e) {
            setError('server', {
                type: 'server',
                message: 'Login failed. Please check your login details or your network connection.',
            });
        }
    };

    return (
        <form className="container mx-auto max-w-md mt-10" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-5">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                    Email
                </label>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded"
                    ref={register}
                    {...register('email', { required: true, pattern: /.*@stud\.noroff\.no$/ })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-1">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    ref={register}
                    {...register('password', { required: true })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {serverError && <p className="text-red-500">{serverError}</p>}
            <button type="submit" className="bg-blue-500 text-white p-3 rounded">
                Login
            </button>
        </form>
    );
};

export default Login;