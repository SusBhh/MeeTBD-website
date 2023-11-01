import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const daysOfMonth = [
    'Sunday, October 15',
    'Monday, October 16',
    'Tuesday, October 17',
    'Wednesday, October 18',
    'Thursday, October 19',
    'Friday, October 20',
    'Saturday, October 21',
];
const cellStyle = {
    backgroundColor: '#f0f0f0', // Default background color
    padding: '0', // Remove cell padding
    borderBottom: 'none', // Remove cell borders
    lineHeight: '2', // Adjust line height to make cells thinner
    border: '1px solid #ccc', // Add a border around each cell
};
const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}:00` : `${i}:00`));
const fakeAvailabilityData = [
    { time: '00:00', Sunday: false, Monday: false, Tuesday: false, Wednesday: true, Thursday: false, Friday: false, Saturday: true },
    { time: '01:00', Sunday: true, Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true },
    { time: '02:00', Sunday: false, Monday: true, Tuesday: false, Wednesday: false, Thursday: false, Friday: true, Saturday: false },
    { time: '03:00', Sunday: false, Monday: true, Tuesday: true, Wednesday: false, Thursday: true, Friday: true, Saturday: false },
    { time: '04:00', Sunday: true, Monday: true, Tuesday: false, Wednesday: false, Thursday: true, Friday: false, Saturday: true },
    { time: '05:00', Sunday: true, Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: true, Saturday: true },
    { time: '06:00', Sunday: false, Monday: false, Tuesday: true, Wednesday: true, Thursday: true, Friday: false, Saturday: false },
    { time: '07:00', Sunday: false, Monday: true, Tuesday: true, Wednesday: false, Thursday: false, Friday: true, Saturday: true },
    { time: '08:00', Sunday: true, Monday: false, Tuesday: true, Wednesday: false, Thursday: true, Friday: false, Saturday: true },
    { time: '09:00', Sunday: true, Monday: true, Tuesday: false, Wednesday: true, Thursday: true, Friday: true, Saturday: true },
    { time: '10:00', Sunday: true, Monday: true, Tuesday: true, Wednesday: true, Thursday: false, Friday: false, Saturday: false },
    { time: '11:00', Sunday: false, Monday: false, Tuesday: false, Wednesday: true, Thursday: false, Friday: true, Saturday: true },
    { time: '12:00', Sunday: true, Monday: false, Tuesday: false, Wednesday: true, Thursday: true, Friday: true, Saturday: true },
    { time: '13:00', Sunday: true, Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true },
    { time: '14:00', Sunday: false, Monday: true, Tuesday: true, Wednesday: false, Thursday: true, Friday: true, Saturday: false },
    { time: '15:00', Sunday: true, Monday: true, Tuesday: true, Wednesday: false, Thursday: true, Friday: false, Saturday: true },
    { time: '16:00', Sunday: false, Monday: false, Tuesday: true, Wednesday: false, Thursday: false, Friday: true, Saturday: true },
    { time: '17:00', Sunday: false, Monday: true, Tuesday: true, Wednesday: true, Thursday: false, Friday: false, Saturday: true },
    { time: '18:00', Sunday: false, Monday: true, Tuesday: false, Wednesday: true, Thursday: true, Friday: true, Saturday: false },
    { time: '19:00', Sunday: false, Monday: false, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true },
    { time: '20:00', Sunday: true, Monday: true, Tuesday: true, Wednesday: false, Thursday: false, Friday: false, Saturday: true },
    { time: '21:00', Sunday: true, Monday: false, Tuesday: true, Wednesday: false, Thursday: false, Friday: true, Saturday: true },
    { time: '22:00', Sunday: true, Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: false, Saturday: false },
    { time: '23:00', Sunday: false, Monday: true, Tuesday: false, Wednesday: true, Thursday: true, Friday: true, Saturday: true },
];

const AvailabilityGrid = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {daysOfMonth.map((day, index) => (
                                <TableCell key={index}>{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fakeAvailabilityData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ ...cellStyle }}>{hours[index]}</TableCell>
                                {Object.keys(data).map((day, idx) => (
                                    <TableCell style={{ ...cellStyle, backgroundColor: data[day] ? '#ff69b4' : '#f0f0f0' }}></TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AvailabilityGrid;
