import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EventAvailability from "./EventAvailability";
import DatePicker from 'react-multi-date-picker';
import GroupAvailability from "./GroupAvailability"

const Event = (props) => {
    const event = props.event;
    const [userId, setUserId] = React.useState(null);
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [startError, setStartError] = React.useState(null);
    const [endError, setEndError] = React.useState(null)
    const [selectedDates, setSelectedDates] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const supabase = useSupabaseClient();
    const session = useSession(); // Contains Tokens

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

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    async function createCalendarEvent() {
        //get group members
        let groupMembers = []
        try {
            const { data: m, error } = await supabase
                .from("groups")
                .select('members')
                .eq("id", event.group_id )

            if (error) throw error;
         
            groupMembers = m[0].members
        } catch (error) {
            alert(error.error_description || error.message);
        }

        const { data: memberData, error: memberError } = await supabase
            .from("profile")
            .select("*")
            .in("id", groupMembers);
        if (memberError) {
            throw memberError;
        }

        const inviteList = []
        for (let member of memberData) {
            inviteList.push({'email': member.email})
        }

        const selectedDatesISO = selectedDates.map(timestamp => {
            const dateObject = new Date(timestamp);
            return dateObject.toISOString().substring(0, 10);
        });

        const formattedStart = startTime.$d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
        });
        const formattedEnd = endTime.$d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
        });

        const calStart = selectedDatesISO[0] + "T" + formattedStart + ":00.000"
        const calEnd = selectedDatesISO[0] + "T" + formattedEnd + ":00.000"
        try {
            console.log("Creating a calendar event");
            const createEvent = {
                'summary': event.name,
                'description': "Event created from MeeTBD!",
                'start': {
                    'dateTime': calStart,
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                'end': {
                    'dateTime': calEnd,
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                'attendees': inviteList

            } // The below function defaults to primary calendar. You can replace primary with a calendar ID.
            await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ` + session.provider_token // PROVIDER TOKEN IS THE GOOGLE ONE, NOT AUTHORIZER TOKEN!!!
                },
                body: JSON.stringify(createEvent)
            }).then((data) => {
                return data.json();
            }).then((data, error) => {
                if (data.error) {
                    throw error
                }
                else {
                    alert("Event created, check calendar");
                }
            })
        }
        catch (error) {
            alert("failed to add to google calendar")
        }
        
        }
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
        const formattedStart = startTime.$d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
        });
        const formattedEnd = endTime.$d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
        });
        const { error:schedError } = await supabase
            .from("events")
            .update({ scheduled: "true" }, {start_time: startTime})
            .eq("id", event.id);
        if (schedError) {
            console.error(schedError);
        }
            const { error: sError } = await supabase
            .from("events")
            .update({ start_time: formattedStart })
            .eq("id", event.id);
        if (sError) {
            console.error(sError);
        }
            const { error: eError } = await supabase
            .from("events")
            .update({ end_time: formattedEnd })
            .eq("id", event.id);
        if (eError) {
            console.error(eError);
        }
            const { error: atError } = await supabase
            .from("events")
            .update({ scheduled_at: selectedDatesISO })
            .eq("id", event.id);
        if (atError) {
            console.error(atError);
        }
        
        //Send email invite stuff
        if (checked) {
            createCalendarEvent()
        }
        window.location.reload();
        setOpen(false);
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
            <div className="group-around" onClick={handleClickOpen('paper')} onKeyDown={handleClickOpen('paper') } >
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
                        <>
                            <Tooltip title="delete event" placement="top" arrow>
                                <IconButton onClick={() => props.handleDelete(event.id)} disableRipple>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
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
                                <h5>Select scheduled dates below:</h5>
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
                        <FormGroup justifyContent="flex-end">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checked} onChange={handleCheck} />
                                }
                                label="Send email invite"
                            />
                        </FormGroup>
                         <div style={{flex: '1 0 0'}} />
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSchedule}>Schedule</Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        </LocalizationProvider>

    );
};

export default Event;
