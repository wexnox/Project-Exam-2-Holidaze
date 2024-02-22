import { useEffect } from 'react';
import React from 'react';

function About() {

    useEffect(() => {
        document.title = 'Holidaze | About';
    }, []);

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">Welcome to
                        Holidaze</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Holidaze is a newly launched accommodation
                        booking site. Dedicated to providing a hassle-free and intuitive booking experience, we aim to
                        plan, design, and build a modern front-end accommodation booking application.</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <h2 className="text-2xl font-semibold mb-4">Customer-Facing Side</h2>
                            <p className="leading-relaxed text-base">Customers can seamlessly book their holidays at any
                                of the venues available on our platform. Our design ensures a user-friendly experience,
                                guiding visitors through the selection and booking process with ease.</p>
                        </div>
                        <div className="p-2 w-full">
                            <h2 className="text-2xl font-semibold mb-4">Admin-Facing Side</h2>
                            <p className="leading-relaxed text-base">Venue owners or administrators can register on our
                                platform to manage their venues and keep track of all bookings. Our admin interface is
                                designed to allow for efficient updating of venues and handling of customer bookings at
                                each venue.</p>
                        </div>
                        <div className="p-2 w-full">
                            <p className="text-lg">With Holidaze, booking your favorite accommodation and managing
                                venues has never been easier. Experience the difference today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;