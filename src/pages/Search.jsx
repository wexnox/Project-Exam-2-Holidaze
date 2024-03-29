import { useParams } from 'react-router-dom';
import VenueListItem from '../components/VenueListItem.jsx';
import { API_VENUES } from '../js/utils/Api/constants.js';
import React, { useContext, useEffect } from 'react';
import { getValidVenues } from '../js/utils/validation.js';
import { SettingsContext } from '../components/context/SettingsContext.jsx';
import PropTypes from 'prop-types';

function isSearchMatch(item, searchValue) {
    return item.name.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue);
}

function getSearchResults(data, searchValue) {
    return data && data.length > 0
        ? data.filter(item => isSearchMatch(item, searchValue))
        : [];
}

function SearchResultsDisplay({ searchResults, value }) {
    return (
        <div id={'venues-container'}
             className="flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.length > 0 && getValidVenues(searchResults).map((venue) => (
                <VenueListItem key={venue.id} {...venue} />
            ))}
        </div>
    );
}

SearchResultsDisplay.propTypes = {
    searchResults: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
};

function Search() {
    const { value } = useParams();
    const contextData = useContext(SettingsContext);
    const { data, isError, fetchData } = contextData;
    const searchValue = value.toLowerCase();
    const searchResults = getSearchResults(data, searchValue);

    useEffect(() => {
        fetchData(API_VENUES + '?&sort=created&sortOrder=desc');
    }, [fetchData, value]);

    return (
        <main className="sm:mt-10 sm:mb-20 lg:pb-72">
            <section className="mt-10 mb-20 sm:mt-12">
                <div className={'container mx-auto px-4 max-w-7xl'}>
                    <h1 className={'text-3xl font-bold mb-10'}>Search Results</h1>
                    {!isError && (
                        <h2 className={'text-lg font-normal mb-4'}>
                            {searchResults.length > 0 ? 'Results for ' : 'No matches for '}{' '}
                            <span className={'italic font-bold'}>{`'${value.trim()}'`}</span>
                        </h2>
                    )}
                    <SearchResultsDisplay searchResults={searchResults} value={value.trim()} />
                </div>
            </section>
        </main>
    );
}

export default Search;
