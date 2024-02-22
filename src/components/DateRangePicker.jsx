import React from 'react';
import DatePicker from 'react-datepicker';


const DateRangePicker = ({ startDate, endDate, setStartDate, handleDateChange, bookingsArray, auth, maxDate, setMaxDate }) => {


    return (
        <DatePicker
            disabledKeyboardNavigation
            onFocus={(e) => e.currentTarget.blur()}
            name={'dates'}
            locale={'en-GB'}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            onClickOutside={() => startDate && !endDate && setStartDate(null)}
            selectsRange
            required={auth}
            id={'dates'}
            className={`border-gray-200 border rounded h-10 indent-3 w-52 font-medium placeholder:text-zinc-500 placeholder:font-normal`}
            dateFormat={'dd.MM.yyyy'}
            minDate={new Date()}
            maxDate={maxDate}
            onCalendarOpen={() => setMaxDate(null)}
            placeholderText={'Select dates'}
            excludeDateIntervals={bookingsArray}
        />
    );
};

export default DateRangePicker;