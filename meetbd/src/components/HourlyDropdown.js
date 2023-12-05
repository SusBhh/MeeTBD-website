import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';


const HourlyDropdown = ({ updateTime, defaultTime } ) => {
    const [time, setTime] = useState(defaultTime)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setTime(event)
        updateTime(event)
        handleCloseMenu();
    };
    return (
        <FormControl>
            <InputLabel id="hourly-dropdown-label">Select an Hour</InputLabel>
            <Select
                labelId="hourly-dropdown-label"
                id="hourly-dropdown"
                value={time}
                label="Select Hour"
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
                    {/* Example: Generate menu items for all 24 hours of the day */}
                    {Array.from({ length: 24 }, (_, index) => {
                        const currentHour = index;
                        const amPm = currentHour < 12 ? 'AM' : 'PM';
                        const displayHour = currentHour % 12 || 12; // Convert 0 to 12

                        const formattedHour = `${displayHour}:00 ${amPm}`;

                        return (
                            <MenuItem
                                key={index}
                                value={formattedHour}
                                onClick={() => handleChange(formattedHour)}
                            >
                                {formattedHour}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Select>
        </FormControl>
    )
};
export default HourlyDropdown;