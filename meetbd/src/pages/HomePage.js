import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Link } from 'react-router-dom';
import Scheduled from '../components/Scheduled';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
const HomePage = () => {
    const [myEvents, setMyEvents] = React.useState([]);
    const [isEventsLoading, setIsEventsLoading] = React.useState(false);
    const [myPending, setMyPending] = React.useState([]);
    const [isPendingLoading, setIsPendingLoading] = React.useState(false);
    const [allEvents, setAllEvents] = React.useState([]);
    const [isScheduled, setIsScheduled] = React.useState(false);
    const supabase = useSupabaseClient();
    async function loadMyPending() {
        setIsPendingLoading(true);
        //it would be nice if I didn't have to repeat this line
        const { data: { user }, } = await supabase.auth.getUser();
        let result = "";
        try {
            let { data: allFilled, error: filledError } = await supabase
                .from("event_availability")
                .select(`
                    event_id
                `)
                .eq("user_id", [user?.id])
            if (filledError) throw filledError; 
            result = "(" + allFilled.map(a => a.event_id).toString() + ")";
        }
        catch (pendingError) {
            console.error('Error home page load:', pendingError);
        }
        try {
            let { data: allPending, error: pendingError } = await supabase
                .from("groups")
                .select(`
                    id,
                    name,
                    events( id, name )
                `)
                .eq("events.scheduled", false)
                .contains("members", [user?.id])
                .not('events.id', 'in', result)
            if (pendingError) throw pendingError;
            if (allPending) setMyPending(allPending); 
        }
        catch (pendingError) {
            console.error('Error home page load:', pendingError);
        }
        setIsPendingLoading(false);
    }
    async function loadMyEvents() {
        setIsEventsLoading(true);
        const { data: { user }, } = await supabase.auth.getUser();
        try {
            let { data, error } = await supabase
                .from("events")
                .select(`
                    name,
                    groups( id, name)

                `)
                .eq("event_owner", [user?.id])
                .eq("scheduled", false);


            if (error) throw error;
            if (data) setMyEvents(data);
        } catch (error) {
            alert(error.error_description || error.message);
        }
        setIsEventsLoading(false);
    }

    async function loadAllEvents() {
        setIsScheduled(true);
        const { data: { user }, } = await supabase.auth.getUser();
        let result = "";
        //get all group ids where you are a member
        try {
            let { data: allGroups, error } = await supabase
                .from("groups")
                .select(`
                    id
                `)
                .contains("members", [user?.id])

            if (error) throw error;
            result = allGroups.map(a => a.id);
        } catch (error) {
            alert(error.error_description || error.message);
        }

        //get all events corresponding to groups you are in
        try {
            let { data: events, error } = await supabase
                .from("events")
                .select()
                .in("group_id", result)
                .eq("scheduled", true);
            if (error) throw error;
            if (events) setAllEvents(events);
        } catch (error) {
            alert(error.error_description || error.message);
        }
        setIsScheduled(false)
    }

    React.useEffect(() => {
        loadMyEvents();
        loadMyPending();
        loadAllEvents();
    }, []);

    return (
        <Container>
            <Grid container spacing={5} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                        Scheduled Events
                    </Typography>
                    <p>All scheduled events</p>
                    <Divider />
                    <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                    <Box  >
                    <div>
                        {isScheduled ? (
                            <CircularProgress />
                        ) : ( allEvents.length === 0 ? (
                            <p>No Scheduled Events to Display</p>
                        ) : (
                            <div>
                                {allEvents.map((event, i) => (
                                    <Scheduled
                                        key={event.id}
                                        event={event}
                                    />
                                ))}
                            </div>
                        ))}
                        </div>
                        </Box>
                    </Paper>
                   
                </Grid>
                <Grid item xs={12} md={4}>
                  
                        <Typography variant="h6" gutterBottom>
                            Created Events
                    </Typography>
                    <Card>
                        <p>Events I Created But Have Not Scheduled: </p>
                        <div>
                            {isEventsLoading ? (
                                <CircularProgress />
                            ) : (
                                myEvents.map((event) => (
                                    <div>
                                        <Divider />
                                        <Typography variant="h9" sx={{ mr: 1 }} align="left" >
                                            Group:
                                        </Typography>
                                        <Link to={`/groups/${event.groups.id}`} underline="hover">
                                            <Typography variant="h9" color='#BA7B92' sx={{ mr: 2 }} align="left">
                                                {event.groups.name}
                                            </Typography>
                                        </Link>
                                        <Typography variant="h9" sx={{ mr: 1 }} align="right">
                                            Event:
                                        </Typography>
                                        <Typography variant="h9" color='#689f38' align="right">
                                            {event.name}
                                        </Typography>
                                    </div>
                                ))
                            )}
                        </div>

                    </Card>
                   
                    <Typography variant="h6" gutterBottom>
                        Pending Events
                    </Typography>
                    <Card>
                    
                    <p>Events To Respond With My Availability:</p>

                    <Divider />
                    {isPendingLoading ? (
                        <CircularProgress />
                    ) : (
                        myPending.map((event) => (
                            <div>
                                {event.events.map((e) => (
                                    <div>
                                        <Divider />
                                        <Typography variant="h9" sx={{ mr: 1 }} align="left" >
                                            Group:
                                        </Typography>
                                        <Link to={`/groups/${event.id}`}>
                                            <Typography variant="h9" color='#BA7B92' sx={{ mr: 2 }} align="left">
                                                {event.name}
                                            </Typography>
                                        </Link>
                                        <Typography variant="h9" sx={{ mr: 1 }} align="right">
                                            Event:
                                        </Typography>
                                        <Typography variant="h9" color='#689f38' sx={{ mr: 2 }} align="left">
                                            {e.name}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        ))
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
export default HomePage;