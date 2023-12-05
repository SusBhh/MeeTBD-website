import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const CalendarSelect = ({ onSelect }) => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onSelect && onSelect(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangeCalendar']}>
                <DateRangeCalendar color="secondary" calendars={1} disablePast />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default CalendarSelect;
