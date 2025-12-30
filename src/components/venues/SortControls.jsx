import React from 'react';
import { FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6';

// TODO: Add doc
/**
 *
 * @param setActive
 * @param active
 * @param children
 * @param props
 * @returns {Element}
 * @constructor
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
 * Reusable sorting controls for Venues listings.
 * Props:
 * - sort (boolean): true => sort by created, false => sort by name
 * - setSort (fn): toggles sort field
 * - sortOrder (boolean): true => desc, false => asc
 * - setSortOrder (fn): toggles sort order
 * - className (string, optional): extra classes for the wrapper
 */
export default function SortControls({ sort, setSort, sortOrder, setSortOrder, className = '' }) {
  return (
    <div className={`mb-8 flex justify-end ${className}`}>
      <span className="block text-xs text-slate-600 font-semi bold sm:inline sm:text-sm">
        <SortButton
          aria-label="Sort venues by date"
          setActive={setSort}
          active={sort !== null ? sort : false}
        >
          <div className="flex items-center">
            <FaArrowDownWideShort className="mr-1" />
            Created
          </div>
        </SortButton>
        <SortButton
          aria-label="Sort venues by name"
          setActive={setSort}
          active={sort !== null ? !sort : true}
        >
          <div className="flex items-center">
            <FaArrowUpShortWide className="mr-1" />
            Name
          </div>
        </SortButton>

        <span className="text-gray-900 mr-4">|</span>
        <SortButton
          aria-label="Sort venues descending"
          setActive={setSortOrder}
          active={sortOrder !== null ? sortOrder : false}
        >
          <div className="flex items-center">
            <FaArrowDownWideShort className="mr-1" />
            Descending
          </div>
        </SortButton>
        <SortButton
          aria-label="Sort venues ascending"
          setActive={setSortOrder}
          active={sortOrder !== null ? !sortOrder : true}
        >
          <div className="flex items-center ">
            <FaArrowUpShortWide className="mr-1" />
            Ascending
          </div>
        </SortButton>
      </span>
    </div>
  );
}
