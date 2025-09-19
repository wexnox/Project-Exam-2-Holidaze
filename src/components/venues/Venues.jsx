import React, { useContext, useEffect, useMemo, useState } from 'react';
import VenueListItem from '../VenueListItem.jsx';
import { API_VENUES } from '../../js/constants.js';
import { getValidVenues } from '../../js/validation.js';
import { SettingsContext } from '../context/SettingsContext.js';
import SortControls from './SortControls.jsx';


function VenuesPagination({ data, filterFunction }) {
  const list = useMemo(() => (data && data.length > 0 ? filterFunction(data) : []), [data, filterFunction]);
  if (list.length > 0) {
    return list
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

function FiltersBar({ countries, cities, selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, typeBucket, setTypeBucket, amenities, setAmenities }) {
  return (
    <div className="mb-6 rounded-md border p-4 bg-white shadow-sm">
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(''); }}
            className="w-full h-10 border rounded px-2"
          >
            <option value="">All</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full h-10 border rounded px-2"
            disabled={!selectedCountry}
          >
            <option value="">All</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={typeBucket}
            onChange={(e) => setTypeBucket(e.target.value)}
            className="w-full h-10 border rounded px-2"
          >
            <option value="">Any</option>
            <option value="solo">Solo (1–2 guests)</option>
            <option value="family">Family (3–5 guests)</option>
            <option value="group">Group (6+ guests)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amenities</label>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['wifi','parking','breakfast','pets'].map((key) => (
              <label key={key} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!amenities[key]}
                  onChange={(e) => setAmenities((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Venues() {
  const { data, isLoading, isError, fetchData, sort, setSort, sortOrder, setSortOrder } = useContext(SettingsContext);

  useEffect(() => {
    fetchData(`${API_VENUES}?&sort=${sort ? 'created' : 'name'}&sortOrder=${sortOrder ? 'desc' : 'asc'}`);
  }, [fetchData, sort, sortOrder]);

  // Build filter options from data but do not change fetch order (sorting remains server-side)
  const all = useMemo(() => Array.isArray(data) ? data : [], [data]);
  const countries = useMemo(() => {
    const set = new Set(all.map(v => v?.location?.country).filter(Boolean));
    return Array.from(set).sort();
  }, [all]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const cities = useMemo(() => {
    const set = new Set(
      all
        .filter(v => !selectedCountry || v?.location?.country === selectedCountry)
        .map(v => v?.location?.city)
        .filter(Boolean)
    );
    return Array.from(set).sort();
  }, [all, selectedCountry]);
  const [selectedCity, setSelectedCity] = useState('');
  const [typeBucket, setTypeBucket] = useState('');
  const [amenities, setAmenities] = useState({ wifi: false, parking: false, breakfast: false, pets: false });

  const applyFilters = useMemo(() => {
    return (list) => {
      const valid = getValidVenues(list || []);
      return valid.filter((v) => {
        // Location filters
        const countryOk = !selectedCountry || (v.location?.country || '').toLowerCase() === selectedCountry.toLowerCase();
        const cityOk = !selectedCity || (v.location?.city || '').toLowerCase() === selectedCity.toLowerCase();
        if (!countryOk || !cityOk) return false;

        // Type bucket by capacity
        let typeOk = true;
        const g = v.maxGuests ?? 0;
        if (typeBucket === 'solo') typeOk = g >= 1 && g <= 2;
        else if (typeBucket === 'family') typeOk = g >= 3 && g <= 5;
        else if (typeBucket === 'group') typeOk = g >= 6;
        if (!typeOk) return false;

        // Amenities (all selected must be true)
        const m = v.meta || {};
        for (const key of Object.keys(amenities)) {
          if (amenities[key] && !m[key]) return false;
        }
        return true;
      });
    };
  }, [selectedCountry, selectedCity, typeBucket, amenities]);

  return (
    <main className="mt-[200] min-h-screen sm:mt-12">
      <section className="mt-[80px] mb-12 sm:mt-12">
        <div className="container mx-auto px-4 max-w-7xl">

          <h1 className="text-4xl font-bold mb-6 text-slate-600">Venues</h1>

          <FiltersBar
            countries={countries}
            cities={cities}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            typeBucket={typeBucket}
            setTypeBucket={setTypeBucket}
            amenities={amenities}
            setAmenities={setAmenities}
          />

          <SortControls sort={sort} setSort={setSort} sortOrder={sortOrder} setSortOrder={setSortOrder} />

          <div className={`flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4`}>
            {!isError ? <VenuesPagination data={data} filterFunction={applyFilters} /> :
              <ErrorResponse />}
          </div>

        </div>
      </section>
    </main>
  );
}

export default Venues;
