import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const printTime = (currentHour) => {
    const timeString12hr = new Date('1970-01-01T' + currentHour.toString() + 'Z')
  .toLocaleTimeString('en-US',
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  );

  return timeString12hr;

}

function Scheduled(props) {
    const event = props.event;
    return (
        <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h7">
                    {event.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Start Time: { printTime(event.start_time)}  End Time: {printTime(event.end_time)}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Scheduled;