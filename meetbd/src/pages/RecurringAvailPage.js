// TODO: not currently implemented
import React, { useState, useEffect } from 'react';
import AvailabilityGrid from '../components/AvailabilityGrid';
import WeeklyDropdown from '../components/WeeklyDropdown';
import CalendarSelect from '../components/CalendarSelect';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Portal } from '@mui/base/Portal';
import HourlyDropdown from '../components/HourlyDropdown';
const RecurringAvailPage = () => {
    const [anchor, setAnchor] = React.useState(null);
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchor(false);
    };                                                                                                                   

    const handleDates = (newDate) => {
        setSelectedDate(newDate);
    };

    function updateDate(start, end) {
        setSelectedDate({
            startDate: start,
            endDate: end
        });
        
    }

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;
    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };
    const PopupBody = styled('div')(
        ({ theme }) => `
        width: max-content;
        padding: 12px 16px;
        margin: 8px;
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
        box-shadow: ${theme.palette.mode === 'dark'
                    ? `0px 4px 8px rgb(0 0 0 / 0.7)`
                    : `0px 4px 8px rgb(0 0 0 / 0.1)`
                };
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        font-size: 0.875rem;
        z-index: 1;
        `,
    );

    return (
        <Container>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">
                        My Availability
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {/* Empty grid item */}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h7">
                        This Week's Availability:
                    </Typography>
                    <WeeklyDropdown updateDate={updateDate} />
               {/*     <h2>Selected Date: {JSON.stringify(selectedDate.startDate)}</h2>*/}
                </Grid>
                <Grid item xs={4} alignItems="left">
                    <Button size="small" variant="outlined" sx={{ ml: 1 }} color="secondary" >
                        Weekly Availability
                    </Button>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                            <Button aria-describedby={id} type="button" onClick={handleClick} size="small" variant="outlined" color="secondary" >
                            Manually Select Dates
                            </Button>
                            {open ? (
                                <Portal>
                                    <BasePopup id={id} open={open} anchor={anchor}>
                                        <PopupBody>
                                            <CalendarSelect onChange={handleDates} />
                                        </PopupBody>
                                    </BasePopup>                                   
                                </Portal>
                            ) : null}
                        </div>
                    </ClickAwayListener>
                </Grid>
                <Grid item>
                    <AvailabilityGrid selectedDate={selectedDate} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default RecurringAvailPage;
