import React from 'react';
import PropTypes from 'prop-types';
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

const ArrowButton = ({ id, label, clickHandler, rotation }) => (
    <button
        id={id}
        aria-label={label}
        onClick={clickHandler}
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center transform 
                    rotate-${rotation} h-8 w-8 bg-gray-200/80 rounded-full ease-out duration-200 hover:bg-white lg:opacity-50
                    ${id === 'prev-image' ? 'left-4' : 'right-4'} z-20 group-hover:opacity-100`}>
        <ArrowIcon />
    </button>
);

const DotButton = ({ setActiveSlide, isActive, index }) => (
    <button onClick={() => setActiveSlide(index)} className={`h-3 w-3 rounded-full ease-in duration-100 ${isActive ? 'bg-white' : 'bg-neutral-400 opacity-90 hover:bg-white'}`}></button>
);

const Slideshow = ({ media, activeSlide, setActiveSlide, name }) => {
    const handleSlideshow = (direction) => {
        const nextSlideIndex = getNextSlideIndex(activeSlide, direction, media.length);
        setActiveSlide(nextSlideIndex);
    };

    return (
        <div>
            {media && (
                <div className="rounded-t-2xl shadow-slate-900 shadow-2xl overflow-hidden relative h-72 group sm:h-96 md:h-[28rem] lg:basis-full">
                    {media.length > 1 &&
                        <ArrowButton id="prev-image" label="Previous image" clickHandler={() => handleSlideshow(-1)} rotation={0} />}
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
                                        }`}
                                        src={image}
                                        alt={name}
                                        onError={handleImageError}
                                    />
                                );
                            })
                        ) : (
                            <img
                                className={'object-cover w-full h-full  '}
                                src={media[0]}
                                alt={name}
                                onError={handleImageError}
                            />
                        )}
                    </div>
                    {media.length > 1 &&
                        <ArrowButton id="next-image" label="Next image" clickHandler={() => handleSlideshow(1)} rotation={180} />
                    }
                    <div className={'absolute bottom-6 z-10 w-full'}>
                        <div
                            className={'flex justify-center gap-3 ease-out duration-700 lg:opacity-50 group-hover:opacity-100'}
                        >
                            {media.length > 1 &&
                                media.map((imageDots, index) => {
                                    return (
                                        <DotButton setActiveSlide={setActiveSlide} isActive={index === activeSlide} index={index} key={index} />
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
        </div>
    );
};
ArrowButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    rotation: PropTypes.number.isRequired,
};

DotButton.propTypes = {
    setActiveSlide: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
};

Slideshow.propTypes = {
    media: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeSlide: PropTypes.number.isRequired,
    setActiveSlide: PropTypes.func.isRequired,
    name: PropTypes.string,
};
export default Slideshow;