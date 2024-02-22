import React, { useEffect, useContext } from 'react';
import { API_VENUES } from '../js/constants.js';
import VenueListItem from '../components/VenueListItem.jsx';
import { getValidVenues } from '../js/validation.js';
import { SettingsContext } from '../components/context/SettingsContext.jsx';


const Headline = () => (
    <section id={'headline'}>
        <div className={'container mx-auto px-4 max-w-7xl'}>
            <div className={'bg-cover bg-headline py-16 px-6 text-black'}>
                <div id={'headline-content'} className={'sm:m-auto w-fit'}>
                    <h1 className={'text-4xl font-bold mb-4'}>Welcome to Holidaze</h1>
                    <p className={'mt-2 text-smg'}>Book your dream venue @ affordable prices</p>
                    <p className={'mt-2 text-sm'}>Or turn your property into venue and rent it out</p>
                </div>
            </div>
        </div>
    </section>
);

const LatestVenues = ({ isError, data, isLoading }) => (
    <section id={'latest-venues'} className={'mt-[88px] mb-12'}>
        <div className={'container mx-auto px-4 max-w-7xl'}>
            <h2 className={'text-3xl font-bold mb-12'}>Latest venues</h2>
            {isLoading && (
                <div className={'absolute left-0 right-0 min-h-screen flex justify-center bg-white'}>
                    <div className={'loader'}></div>
                </div>
            )}
            <div
                id={'venues-container'}
                className={`flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4`}
            >
                {!isLoading && isError && <ErrorMessage isError={isError} />}
                {!isLoading && !isError && <VenueList data={data} />}
            </div>
        </div>
    </section>
);

const ErrorMessage = () => (
    <div className={'bg-red-100 border-l-4 border-red-500 text-red-700 p-4'}>
        <p className="font-bold">Something went wrong..</p>
        <p>Please try again later</p>
    </div>
);

const VenueList = ({ data }) => {
    return data && data.length > 0
        ? getValidVenues(data)
            .slice(0, 12)
            .map((venue) => <VenueListItem key={venue.id} {...venue} />)
        : null;
};

const Home = () => {
    const { data, isLoading, isError, fetchData } = useContext(SettingsContext);

    useEffect(() => {
        fetchData(API_VENUES + '?&sort=created');
    }, [fetchData]);

    useEffect(() => {
        document.title = 'Holidaze | Home';
    }, []);

    return (
        <>
            <main className={'mt-[120px] min-h-screen sm:mt-12'}>
                <Headline />
                <LatestVenues isLoading={isLoading} isError={isError} data={data} />
            </main>
        </>
    );
};
export default Home;
