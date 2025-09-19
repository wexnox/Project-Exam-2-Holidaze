import { getLocalStorage } from '../../js/storage.mjs';
import { useApi } from '../../js/api.js';
import { API_VENUES } from '../../js/constants.js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { smoothScrollToElement } from '../../js/validation.js';
import { SettingsContext } from '../context/SettingsContext.js';
import CreateVenueForm from './CreateVenueForm.jsx';
import { venueSchema } from '../../js/schemas/venueSchema.js';

function CreateVenue() {
  const { venueManager, accessToken } = getLocalStorage('user');
  const navigate = useNavigate();
  const {
    data,
    created,
    isLoading,
    isError: isErrorBooking,
    errorMsg,
    fetchData
  } = useApi();
  const { setIsVenueSectionActive } = useContext(SettingsContext);
  const submitBookingRef = useRef(null);
  const [isFormError, setIsFormError] = useState(false);
  const bookingErrorRef = useRef(null);

  const createForm = useForm({
    resolver: yupResolver(venueSchema)
  });

  const { control } = createForm;

  function onSubmit(data) {
    fetchData(API_VENUES, 'POST', accessToken, data);
  }

  useEffect(() => {
    if (!accessToken || !venueManager) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate, venueManager]);

  useEffect(() => {
    if (isErrorBooking) {
      submitBookingRef.current.focus();
      setIsFormError(true);
      smoothScrollToElement(bookingErrorRef);
    }
  }, [isErrorBooking]);

  useEffect(() => {
    if (created) {
      const promise = new Promise((resolve) => {
        resolve(setIsVenueSectionActive(false));
      });
      promise.then(() => navigate(`/venues/venue-details/${data.id}`));
    }
  }, [created, data.id, navigate, setIsVenueSectionActive]);

  const [locationString, setLocationString] = useState('');
  const mediaArray = useFieldArray({
    control,
    name: 'media'
  });
  const [mediaURL, setMediaURL] = useState('');

  return (
    <>
      <main className={'mt-[120px] min-h-[50vh] sm:mt-12'}>
        <section id={'profile'} className={'mt-[88px] mb-12 sm:mt-12 md:mb-28'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <CreateVenueForm
              form={createForm}
              title={'Create Venue'}
              btnTitle={'Create Venue'}
              locationString={locationString}
              setLocationString={setLocationString}
              mediaArray={mediaArray}
              mediaURL={mediaURL}
              setMediaURL={setMediaURL}
              onSubmit={onSubmit}
              isLoading={isLoading}
              isFormError={isFormError}
              setIsFormError={setIsFormError}
              errorMsg={errorMsg}
              submitButtonRef={submitBookingRef}
              formErrorRef={bookingErrorRef}
              borderAndShadow
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default CreateVenue;