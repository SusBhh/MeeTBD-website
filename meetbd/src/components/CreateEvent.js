import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; 

const CreateEvent = ({ groupId, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [selectedDates, setSelectedDates] = useState([null, null]);

  const handleDateChange = (newDates) => {
    setSelectedDates(newDates);
  };

  const handleSubmit = () => {
    
    onClose();
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