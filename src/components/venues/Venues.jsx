import { useContext, useEffect } from 'react';
import VenueListItem from '../VenueListItem.jsx';
import { API_VENUES } from '../../js/constants.js';
import { getValidVenues } from '../../js/validation.js';
import { SettingsContext } from '../context/SettingsContext.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6';

/**
 * Render a button component for sorting purposes.
 *
 * @param {Object} props - The properties for the SortButton component.
 * @param {function} props.setActive - The function to toggle the active state of the button.
 * @param {boolean} props.active - The current active state of the button.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the button.
 * @param {Object} props... - Additional props to be spread onto the button element.
 * @return {JSX.Element} The rendered SortButton component.
 */
function SortButton({ setActive, active, children, ...props }) {
    return (
        <button
            {...props}
            onClick={() => setActive((val) => !val)}
            className={`rounded py-1 px-2 mr-2 ease-out duration-200 hover:bg-slate-700 ${active ? 'bg-slate-100 hover:text-white' : 'text-slate-800 hover:text-white'}`}
        >
            {children}
        </button>
    );
}

/**
 * PropTypes for SortButton component.
 *
 * @typedef {Object} SortButton.propTypes
 * @property {string} label - The label text for the button.
 * @property {boolean} ascending - The sorting direction flag (true for ascending, false for descending).
 * @property {function} onClick - The click event handler for the button.
 */
SortButton.propTypes = {
    setActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

/**
 * Renders venue list based on the provided data and filter function.
 *
 * @param {Object[]} data - The array of venue objects.
 * @param {Function} filterFunction - The function used to filter the venue data.
 * @returns {JSX.Element[] | null} - An array of JSX elements representing the list of venues, or null if the input data is empty.
 */
function VenuesPagination({ data, filterFunction }) {
    if (data.length > 0) {
        return filterFunction(data)
            .map((venue) => <VenueListItem key={venue.id} {...venue} />);
    }
    return null;
}

/**
 * Specifies the PropTypes for VenuesPagination component.
 *
 * @component
 * @category Component
 *
 * @param {number} totalVenues - The total number of venues.
 * @param {number} venuesPerPage - The number of venues to be displayed per page.
 * @param {number} currentPage - The current page number.
 * @param {func} onPageChange - The function to be called when the page changes.
 * @param {number} [pageRangeDisplayed=5] - The number of pages to be displayed in the pagination component.
 * @param {number} [marginPagesDisplayed=2] - The number of first and last pages to be displayed in addition to the page range.
 *
 * @returns {JSX.Element} The rendered VenuesPagination component.
 *
 * @throws {Error} Will throw an error if any of the required props are missing.
 */
VenuesPagination.propTypes = {
    data: PropTypes.array.isRequired,
    filterFunction: PropTypes.func.isRequired,
};

/**
 * Render a UI component that represents an error response.
 *
 * @returns {JSX.Element} The rendered error response component.
 */
function ErrorResponse() {
    return (
        <div className={'api-error'}>
            <p>Something went wrong..</p>
            <p>Please try again later</p>
        </div>
    );
}

/**
 * Render venue section with sorting and pagination.
 * @returns {JSX.Element} Returns the rendered venue section.
 */
function Venues() {
    const {
        data,
        isLoading,
        isError,
        fetchData,
        sort = false,
        setSort,
        sortOrder = false,
        setSortOrder,
    } = useContext(SettingsContext);

    useEffect(() => {
        fetchData(`${API_VENUES}?&sort=${sort ? 'created' : 'name'}&sortOrder=${sortOrder ? 'desc' : 'asc'}`);
    }, [fetchData, sort, sortOrder]);

    return (
        <main className="mt-[200] min-h-screen sm:mt-12">
            <section className="mt-[80px] mb-12 sm:mt-12">
                <div className="container mx-auto px-4 max-w-7xl">

                    <h1 className="text-4xl font-bold mb-10 text-slate-600">Venues</h1>
                    <div className="mb-10 flex justify-end">

                        <span className="block text-xs text-slate-600 font-semi bold sm:inline sm:text-sm">
                                <SortButton aria-label="Sort venues by date" setActive={setSort}
                                            active={sort !== null ? sort : false}><div className="flex items-center">
                                    <FaArrowDownWideShort className="mr-1" />Created</div>
                                </SortButton>
                                <SortButton aria-label="Sort venues by name" setActive={setSort}
                                            active={sort !== null ? !sort : true}><div className="flex items-center">
                                    <FaArrowUpShortWide className="mr-1" />Name</div>
                                </SortButton>

                                <span className="text-gray-900 mr-4">|</span>
                                <SortButton aria-label="Sort venues descending" setActive={setSortOrder}
                                            active={sortOrder !== null ? sortOrder : false}><div
                                    className="flex items-center">
                                    <FaArrowDownWideShort className="mr-1" />Descending</div>
                                </SortButton>
                                <SortButton aria-label="Sort venues ascending" setActive={setSortOrder}
                                            active={sortOrder !== null ? !sortOrder : true}><div
                                    className="flex items-center ">
                                    <FaArrowUpShortWide className="mr-1" />Ascending</div>
                                </SortButton>

                        </span>
                    </div>
                    <div
                        className={`flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4`}>
                        {!isError ? <VenuesPagination data={data} filterFunction={getValidVenues} /> :
                            <ErrorResponse />}
                    </div>

                </div>
            </section>
        </main>
    );
}

export default Venues;
