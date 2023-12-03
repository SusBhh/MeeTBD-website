import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
function Scheduled(props) {
    const event = props.event;
    const supabase = useSupabaseClient();

    const printTime = (currentHour) => {
        const timeString12hr = new Date('1970-01-01T' + currentHour.toString() + 'Z')
            .toLocaleTimeString('en-US',
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );

        return timeString12hr;
    }

    const printDate = (date) => {
        //bug where it is printing a day behind
        console.log(date)
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', options);
        console.log(formattedDate)
        return formattedDate;
    }
    async function handleDelete(day) {
        console.log(day)
        const dates = event.scheduled_at
        console.log(dates)

        //console.log(JSON.stringify(event.scheduled_at))
        const index = dates.indexOf(day)
        console.log(index)
        if (index > -1) {
            dates.splice(index, 1)
            console.log("update")
            console.log(dates)
        }


        //if array is empty, delete the entire entry
        if (dates.length === 0) {
            try {
                const { error } = await supabase
                    .from("events")
                    .delete()
                    .eq("id", event.id);

                if (error) throw error;
                window.location.reload();
            } catch (error) {
                alert(error.error_description || error.message);
            }
        }
        else {
            try {
                const { data: at, error: atError } = await supabase
                    .from("events")
                    .update({ scheduled_at: dates })
                    .eq("id", event.id);
                if (atError) throw atError;
                window.location.reload();
            }
            catch (atError) {
                alert(atError.error_description || atError.message);
            }
           
        }  
    }

    return (
        <div>
            { 
                event.scheduled_at.map((day, index) => (
                    <Card sx={{ display: 'flex' }}>
                        <CardHeader
                            action={
                                <Tooltip title="delete event" placement="top" arrow>
                                    <IconButton onClick={() => handleDelete(day)} disableRipple>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            title={event.name}
                            subheader={day}
                        />
                        <CardContent >
                            <Typography variant="subtitle1" color="text.secondary">
                                {printTime(event.start_time)} - {printTime(event.end_time)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
       
    );
}

export default Scheduled;