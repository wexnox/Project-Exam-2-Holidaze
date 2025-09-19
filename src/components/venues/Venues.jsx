import React, { useContext, useEffect } from 'react';
import VenueListItem from '../VenueListItem.jsx';
import { API_VENUES } from '../../js/constants.js';
import { getValidVenues } from '../../js/validation.js';
import { SettingsContext } from '../context/SettingsContext.js';
import { FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6';


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

function VenuesPagination({ data, filterFunction }) {
  if (data.length > 0) {
    return filterFunction(data)
      .slice(0, 20)
      .map((venue) => <VenueListItem key={venue.id} {...venue} />);
  }
  return null;
}

function ErrorResponse() {
  return (
    <div className={''}>
      <p>Something went wrong..</p>
      <p>Please try again later</p>
    </div>
  );
}

function Venues() {
  const { data, isLoading, isError, fetchData, sort, setSort, sortOrder, setSortOrder } = useContext(SettingsContext);

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
