import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useContext, useState } from 'react';
import { API_REGISTER } from '../js/utils/Api/constants.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup
        .string()
        .email()
        .required()
        .matches(/.*@stud\.noroff\.no$/, 'Must be a stud.noroff.no email'),
    password: yup.string().min(8).required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
});

const Register = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(API_REGISTER, data);
            localStorage.setItem('token', response.data.token);
            setAuth(response.data.token);
            navigate('/profile');
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
            if (error.response.data.errors) {
                setServerError(error.response.data.errors[0]); // Adjust this line as per your requirements.
            } else {
                setServerError('An error occurred while trying to register.');
            }
        }
    };

    return (
        <form className="container mx-auto max-w-md mt-10" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-5">Register</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                    Name
                </label>
                <input id="name" type="text"
                       className="w-full p-2 border border-gray-300 rounded" {...register('name')} />
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
            {serverError && <p className="text-red-500">{serverError}</p>}
            <button type="submit" className="bg-blue-500 text-white p-3 rounded">
                Register
            </button>
        </form>
    );
};

export default Register;
