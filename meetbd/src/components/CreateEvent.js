import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; 
import DatePicker from 'react-multi-date-picker';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import HourlyDropdown from './HourlyDropdown';
import WeeklyDropdown from './WeeklyDropdown';
import Typography from '@mui/material/Typography';

const CreateEvent = ({ groupId, onClose }) => {
    const [eventName, setEventName] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);
    const [startTime, setStartTime] = useState('9:00 AM');
    const [endTime, setEndTime] = useState('5:00 PM');
    const [userId, setUserId] = React.useState(null);
    const [open, setOpen] = useState(false)

    const updateStartTime = (time) => {
        setStartTime(time);
        //console.log(time);
    }

    const updateEndTime = (time) => {
        setEndTime(time);
        //console.log(time)
    }

    const handleDateChange = (newDates) => {
    setSelectedDates(newDates);
    };

    const supabase = useSupabaseClient();
    const getUserId = async () => {
        const {data: { user },} = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();

    const handleSubmit = async () => {
        if (!eventName) {
            alert('Please fill in the event name.');
            return;
        }
        if (selectedDates.some(date => date === null)) {
            alert('Please select the possible dates for the event.');
            return;
        }
        const selectedDatesISO = selectedDates.map(timestamp => {
            const dateObject = new Date(timestamp);
            return dateObject.toISOString();
            });
        try {
            const { data, error } = await supabase
            .from('events')
            .insert([
                {
                group_id: groupId,
                name: eventName,
                possible_dates: selectedDatesISO,
                start_time: startTime,
                    end_time: endTime,
                event_owner: userId
                },
            ]);

            if (error) {
            throw error;
            }
  
            // If the operation was successful, close the CreateEvent component
            alert('Made event i think');
            onClose();
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error scenarios (e.g., show an error message)
        }
        window.location.reload();
    };
    const prevDate = new Date()
    return (
        <Container>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        label="Event Name"
                        variant="outlined"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Select possible dates below</h3>
                    <DatePicker
                        multiple
                        value={selectedDates}
                        onChange={setSelectedDates}
                        sort
                        color="secondary"
                        calendarPosition="left"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item>
                            <Typography variant="h7">
                                No earlier than:
                            </Typography>
                            <HourlyDropdown updateTime={updateStartTime} defaultTime={'9:00 AM'} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h7">
                                No later than:
                            </Typography>
                            <HourlyDropdown updateTime={updateEndTime} defaultTime={'5:00 PM'} />
                        </Grid>
                    </Grid>
                </Grid>
              
                <Grid item alignItems="center">
                    <Button variant="outlined" color="primary" onClick={onClose} sx={{ ml: 1 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Create Event
                    </Button>
                 
                </Grid>
            </Grid>
        </Container>

  );
};

export default CreateEvent;