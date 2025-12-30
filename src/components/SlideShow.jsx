import React, { useEffect, useState, useCallback } from 'react';

import ArrowIcon from '../components/ArrowIcon';
import { handleImageError } from '../js/validation.js';

const getNextSlideIndex = (current, direction, length) => {
  let slideIndex = current + direction;
  if (slideIndex > length - 1) {
    return 0;
  }
  if (slideIndex < 0) {
    return length - 1;
  }
  return slideIndex;
};

const ArrowButton = ({ id, label, clickHandler, rotation, className = '' }) => (
  <button
    id={id}
    aria-label={label}
    onClick={clickHandler}
    className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center transform
                    rotate-${rotation} h-8 w-8 bg-gray-200/80 rounded-full ease-out duration-200 hover:bg-white lg:opacity-50
                    ${id === 'prev-image' ? 'left-4' : 'right-4'} z-20 group-hover:opacity-100 ${className}`}
  >
    <ArrowIcon />
  </button>
);

const DotButton = ({ setActiveSlide, isActive, index }) => (
  <button
    onClick={() => setActiveSlide(index)}
    className={`h-3 w-3 rounded-full ease-in duration-100 ${isActive ? 'bg-white' : 'bg-neutral-400 opacity-90 hover:bg-white'}`}
  ></button>
);

const Slideshow = ({ media, activeSlide, setActiveSlide, name }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleSlideshow = useCallback(
    (direction) => {
      const nextSlideIndex = getNextSlideIndex(activeSlide, direction, media.length);
      setActiveSlide(nextSlideIndex);
    },
    [activeSlide, media.length, setActiveSlide],
  );

  const openLightbox = useCallback(() => {
    if (!media || media.length === 0) return;
    setIsLightboxOpen(true);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  }, [media]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        handleSlideshow(1);
      } else if (e.key === 'ArrowLeft') {
        handleSlideshow(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, handleSlideshow, closeLightbox]);

  return (
    <div>
      {media && (
        <div className="rounded-t-2xl shadow-slate-900 shadow-2xl overflow-hidden relative h-72 group sm:h-96 md:h-[28rem] lg:basis-full">
          {media.length > 1 && (
            <ArrowButton
              id="prev-image"
              label="Previous image"
              clickHandler={() => handleSlideshow(-1)}
              rotation={0}
            />
          )}
          <div className={'h-full relative'}>
            {media.length > 1 ? (
              media.map((image, index) => {
                const key = image + '-' + index;
                const active = index === activeSlide;
                return (
                  <img
                    key={key}
                    className={`absolute top-0 object-cover w-full h-full ease-in duration-300  ${
                      !active && 'invisible opacity-50'
                    } cursor-zoom-in`}
                    src={image}
                    alt={name}
                    onError={handleImageError}
                    onClick={openLightbox}
                  />
                );
              })
            ) : (
              <img
                className={'object-cover w-full h-full cursor-zoom-in'}
                src={media[0]}
                alt={name}
                onError={handleImageError}
                onClick={openLightbox}
              />
            )}
          </div>
          {media.length > 1 && (
            <ArrowButton
              id="next-image"
              label="Next image"
              clickHandler={() => handleSlideshow(1)}
              rotation={180}
            />
          )}
          <div className={'absolute bottom-6 z-10 w-full'}>
            <div
              className={
                'flex justify-center gap-3 ease-out duration-700 lg:opacity-50 group-hover:opacity-100'
              }
            >
              {media.length > 1 &&
                media.map((imageDots, index) => {
                  return (
                    <DotButton
                      setActiveSlide={setActiveSlide}
                      isActive={index === activeSlide}
                      index={index}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
          {media.length > 1 && (
            <div
              className={
                'overlay absolute bottom-0 h-20 w-full ease-out duration-700 group-hover:opacity-70'
              }
            ></div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            aria-label="Close image viewer"
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full h-10 w-10 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z" />
            </svg>
          </button>

          {media.length > 1 && (
            <ArrowButton
              id="prev-image"
              label="Previous image"
              clickHandler={() => handleSlideshow(-1)}
              rotation={0}
              className="!lg:opacity-100"
            />
          )}

          <div
            className="relative flex items-center justify-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {media.length > 1 ? (
              media.map((image, index) => {
                const key = image + '-lightbox-' + index;
                const active = index === activeSlide;
                return (
                  <img
                    key={key}
                    className={`absolute max-h-[90vh] max-w-[90vw] object-contain ease-in duration-300 ${!active ? 'invisible opacity-0' : 'opacity-100'}`}
                    src={image}
                    alt={name}
                    onError={handleImageError}
                  />
                );
              })
            ) : (
              <img
                className={'max-h-[90vh] max-w-[90vw] object-contain'}
                src={media[0]}
                alt={name}
                onError={handleImageError}
              />
            )}
          </div>

          {media.length > 1 && (
            <ArrowButton
              id="next-image"
              label="Next image"
              clickHandler={() => handleSlideshow(1)}
              rotation={180}
              className="!lg:opacity-100"
            />
          )}

          {media.length > 1 && (
            <div className="absolute bottom-6 z-[60] w-full">
              <div className="flex justify-center gap-3">
                {media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-3 w-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-neutral-500 hover:bg-white/80'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Slideshow;
