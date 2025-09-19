import React, { useEffect, useContext, useMemo, useState } from 'react';
import { API_VENUES } from '../js/constants.js';
import VenueListItem from '../components/VenueListItem.jsx';
import { getValidVenues } from '../js/validation.js';
import { SettingsContext } from '../components/context/SettingsContext.js';
import { Link, useNavigate } from 'react-router-dom';

// TODO: Break it up more in to each file or code block

const Hero = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const heroImages = useMemo(() => {
    const list = getValidVenues(data || []);
    return list.slice(0, 6).map(v => v.media?.[0]).filter(Boolean);
  }, [data]);

  function onSearch(e) {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/search/${encodeURIComponent(value)}`);
  }

  return (
    <section id={'hero'}>
      <div className={'container mx-auto px-4 max-w-7xl'}>
        <div className={'relative overflow-hidden rounded-2xl bg-headline bg-cover bg-center'}>
          <div className={'absolute inset-0 bg-black/20'}></div>
          <div className={'relative py-16 px-6 text-white'}>
            <div className={'sm:m-auto w-full max-w-2xl text-center'}>
              <h1 className={'text-4xl font-bold mb-3'}>Welcome to Holidaze</h1>
              <p className={'mt-2 text-base opacity-95'}>Discover stunning venues around the world. Book your dream stay or list your own.</p>

              <form onSubmit={onSearch} className={'mt-6 flex gap-2 justify-center'}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label={'Search venues'}
                  className={'w-full max-w-md h-11 rounded-md px-4 text-black'}
                  placeholder={'Search by name, city, country...'}
                  type={'search'}
                />
                <button type={'submit'} className={'h-11 px-5 rounded-md bg-rose-700 hover:bg-rose-600 text-white'}>
                  Search
                </button>
              </form>
            </div>

            {!isLoading && heroImages.length > 0 && (
              <div className={'mt-10 grid grid-cols-3 sm:grid-cols-6 gap-2 opacity-95'}>
                {heroImages.map((src, i) => (
                  <img key={i} src={src} alt={'Venue preview'} className={'h-24 w-full object-cover rounded-md'} loading={'lazy'} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedVenues = ({ data }) => {
  const featured = useMemo(() => {
    const list = getValidVenues(data || []);
    const byRating = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return (byRating.length > 0 ? byRating : list).slice(0, 6);
  }, [data]);

  if (!featured || featured.length === 0) return null;

  const FeaturedCard = ({ v }) => {
    const [visible, setVisible] = useState(true);
    const img = v.media?.[0];
    if (!img || !visible) return null;

    return (
      <Link to={`/venues/venue-details/${v.id}`} className={'rounded-2xl overflow-hidden border shadow-sm block'}>
        <img
          src={img}
          alt={`${v.name} image`}
          className={'h-56 w-full object-cover'}
          loading={'lazy'}
          onError={() => setVisible(false)}
        />
        <div className={'p-5'}>
          <h3 className={'text-xl font-semibold line-clamp-1'}>{v.name}</h3>
          <p className={'mt-2 text-sm text-zinc-700 line-clamp-2'}>{v.description}</p>
          <div className={'mt-4 flex items-center justify-between'}>
            <span className={'font-bold'}>{v.price?.toLocaleString?.() ?? v.price} kr/night</span>
            <span className={'px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-700'}>
              View details
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section id={'featured-venues'} className={'mt-16 mb-12'}>
      <div className={'container mx-auto px-4 max-w-7xl'}>
        <h2 className={'text-3xl font-bold mb-8'}>Featured venues</h2>
        <div className={'grid sm:grid-cols-2 lg:grid-cols-3 gap-8'}>
          {featured.map((v) => (
            <FeaturedCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LatestVenues = ({ isError, data, isLoading }) => (
  <section id={'latest-venues'} className={'mt-16 mb-12'}>
    <div className={'container mx-auto px-4 max-w-7xl'}>
      <h2 className={'text-3xl font-bold mb-8'}>Latest venues</h2>
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
    fetchData(API_VENUES + '?&sort=created&sortOrder=desc');
  }, [fetchData]);

  useEffect(() => {
    document.title = 'Holidaze | Home';
  }, []);

  return (
    <>
      <main className={'mt-[120px] min-h-screen sm:mt-12'}>
        <Hero data={data} isLoading={isLoading} />
        <FeaturedVenues data={data} />
        <LatestVenues isLoading={isLoading} isError={isError} data={data} />
      </main>
    </>
  );
};
export default Home;
