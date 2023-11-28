import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';

const WeeklyDropdown = ({ updateDate }) => {
    const [formattedDate, setFormattedDate] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate());

        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedStartDate = defaultDate.toLocaleDateString('en-US', options);

        const endDate = new Date(defaultDate);
        endDate.setDate(endDate.getDate() + 6);
        const formattedEndDate = endDate.toLocaleDateString('en-US', options);
        setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`)
        updateDate(defaultDate, endDate)
    }, []);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        //setSelectedDate(event.target.value);
        //console.log(event.currentDate);
        //console.log(event.endDate)

        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedStartDate = event.currentDate.toLocaleDateString('en-US', options);
        const formattedEndDate = event.endDate.toLocaleDateString('en-US', options);
        //console.log(JSON.stringify(selectedDate))
        setFormattedDate(`${formattedStartDate} - ${formattedEndDate}`)
        //console.log(formattedDate)
        updateDate(event.currentDate, event.endDate)
        handleCloseMenu();
    };

    return (
        <FormControl>
            <InputLabel id="weekly-dropdown-label">Select a Date Range</InputLabel>
            <Select
                labelId="weekly-dropdown-label"
                id="weekly-dropdown"
                value={formattedDate}
                label="Select a Date Range"
                onOpen={handleOpenMenu}
                onClose={handleCloseMenu}
                renderValue={(value) => value} // Set the renderValue prop
                style={{ height: '30px' }} // Set the height of the input box
            >
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        style: {
                            maxHeight: 200,
                            width: 'auto',
                        },
                    }}
                >
                    {/* Example: Generate menu items for the next 10 weeks */}
                    {Array.from({ length: 5 }, (_, index) => {
                        const currentDate = new Date();
                        currentDate.setDate(currentDate.getDate() + index * 7);
                        const options = { weekday: 'short', month: 'short', day: 'numeric' };
                        const formattedStartDate = currentDate.toLocaleDateString('en-US', options);

                        const endDate = new Date(currentDate);
                        endDate.setDate(endDate.getDate() + 6);
                        const formattedEndDate = endDate.toLocaleDateString('en-US', options);

                        const rangeLabel = `${formattedStartDate} - ${formattedEndDate}`;

                        return (
                            <MenuItem
                                key={index}
                                value={{currentDate, endDate}}
                                onClick={() => handleChange( { currentDate, endDate } )}
                            >
                                {rangeLabel}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Select>
        </FormControl>
    );
};

export default WeeklyDropdown;

