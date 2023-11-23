import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; 
import DatePicker from 'react-multi-date-picker';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const CreateEvent = ({ groupId, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [userId, setUserId] = React.useState(null);

  const handleDateChange = (newDates) => {
    setSelectedDates(newDates);
  };

  const supabase = useSupabaseClient();
  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
  };
  
  

  return (
    <Box p={2}>
      <TextField
        label="Event Name"
        variant="outlined"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <h3>Select possible dates below</h3>
      <DatePicker 
        multiple
        value={selectedDates} 
        onChange={setSelectedDates}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Event
        </Button>
        <Button variant="outlined" color="primary" onClick={onClose} sx={{ marginLeft: 1 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEvent;