import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
});

function useContactForm() {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = data => console.log(data);

    return { handleSubmit, control, errors, onSubmit };
}

function ErrorMessage({ error }) {
    return error ? <span className="text-red-500">{error.message}</span> : null;
}

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
    }),
};

export default function Contact() {
    const { handleSubmit, control, errors, onSubmit } = useContactForm();

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">CONTACT US</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">We would love to hear your feedback.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input type="text" id="name" {...field}
                                               className={`w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.name ? 'border-red-500' : ''}`} />
                                        <ErrorMessage error={errors.name} />
                                    </div>
                                </div>}
                        />

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" id="email" {...field}
                                               className={`w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.email ? 'border-red-500' : ''}`} />
                                        <ErrorMessage error={errors.email} />
                                    </div>
                                </div>}
                        />

                        <Controller
                            name="message"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="message"
                                               className="leading-7 text-sm text-gray-600">Message</label>
                                        <textarea id="message" {...field} rows="4"
                                                  className={`w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.message ? 'border-red-500' : ''}`} />
                                        <ErrorMessage error={errors.message} />
                                    </div>
                                </div>}
                        />

                        <div className="p-2 w-full">
                            <button type="submit"
                                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                                Submit
                            </button>
                        </div>
 
                    </div>
                </form>
            </div>
        </section>
    );
}