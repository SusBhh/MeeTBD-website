import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import "../newstyles.css";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EventAvailability from "./EventAvailability";
import DatePicker from 'react-multi-date-picker';
import GroupAvailability from "./GroupAvailability"

const Event = (props) => {
    const [anchor, setAnchor] = React.useState(null);
    const event = props.event;
    const [userId, setUserId] = React.useState(null);
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [startError, setStartError] = React.useState(null);
    const [endError, setEndError] = React.useState(null)
    const [selectedDates, setSelectedDates] = React.useState(null);
    const supabase = useSupabaseClient();
    const getUserId = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();
    const isOwner = userId === event.event_owner;

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSchedule(){
        //error handling
        let message = ""
        let error = false;
        if (startError) {
            message += "Your start time is not valid\n"
            error = true
        }
        if (endError) {
            message += "Your end time is not valid\n"
            error = true
        }
        if (startTime === null) {
            message += "Need start time \n"
            error = true;
        }
        if (endTime === null) {
            message += "Need end time"
            error = true;
        }
        if (error) {
            alert(message)
        }
        const selectedDatesISO = selectedDates.map(timestamp => {
            const dateObject = new Date(timestamp);
            return dateObject.toISOString();
            });
        //console.log(startError)
        //console.log(startTime)
        console.log(event.id)
        console.log(selectedDates)
        const { data, e } = await supabase
            .from("events")
            .update({ scheduled: "true"}, {start_time: startTime}, {end_time: endTime}, {possible_dates: selectedDatesISO})
            .eq("id", event.id);
        console.log(data)
        if (e) {
            alert(e)
        }
        setOpen(false);
        window.location.reload();
    };

    const handleEdit = async () => {
        // TODO: edit group name
    };
  

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <React.Fragment>
            <div className="group-around" onClick={handleClickOpen('paper')}>
                <div className="event" style={{cursor:'pointer'}}>
                    <div className="text">
                        <p>{event.name}</p>
                    </div> 
                </div> 
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <DialogTitle id="scroll-dialog-title">
                    {event.name}
                    {isOwner ? (
                        <><Tooltip title="edit event" placement="top" arrow>
                            <IconButton onClick={handleEdit} disableRipple>
                                <EditIcon />
                            </IconButton>
                        </Tooltip><Tooltip title="delete event" placement="top" arrow>
                                <IconButton onClick={() => props.handleDelete(event.id)} disableRipple>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip></>
                    ) : (
                        <></>
                    )}
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} >
                    <Grid container spacing={1}>
                        <Grid item xs={6} >
                            <h2>My Availability</h2>
                            <EventAvailability event={event} />                                
                        </Grid>
                        <Grid item xs={ 6 }>
                            <h2>Group's Availability</h2>
                            <GroupAvailability event={event} />
                        </Grid>
                        <Grid item xs={6}>
                             <TimePicker
                                    label="Start Time:"
                                    value={startTime}
                                    onChange={(newValue) => setStartTime(newValue)}
                                    onError={(newError) => setStartError(newError)}
                                />      
                            </Grid>
                        <Grid item xs={6}>
                                <TimePicker
                                    label="End Time:"
                                    value={endTime}
                                    onChange={(newValue) => setEndTime(newValue)}
                                    onError={(newError) => setEndError(newError)}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                label="Selected Date:"
                                style={{ width: "155px", height: "55px" }}
                                multiple
                                value={selectedDates}
                                onChange={(selectedDates) => setSelectedDates(selectedDates)}
                                color="secondary"
                                calendarPosition="right"
                            />
                        </Grid>
                        <br></br>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSchedule}>Schedule</Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        </LocalizationProvider>

    );
};

export default Event;
