import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Portal } from '@mui/base/Portal';
import Divider from '@mui/material/Divider';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Link } from 'react-router-dom';
const HomePage = () => {
    const [userId, setUserId] = React.useState(null);
    const [myEvents, setMyEvents] = React.useState([]);
    const [myPending, setMyPending] = React.useState([]);
    const supabase = useSupabaseClient();
    //can add isLoadign later
    async function loadMyPending() {
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
            //let { allFilled, error }
            result = "(" + allFilled.map(a => a.event_id).toString() + ")";
            //console.log(result.toString())
            console.log(result)
            //console.log(allFilled)
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
                .contains("members", [user?.id])
                .not('events.id', 'in', result)
            //let { allFilled, error }
            //console.log(result)
            if (pendingError) throw pendingError;
            if (allPending) setMyPending(allPending); 
            console.log(allPending)
        }
        catch (pendingError) {
            console.error('Error home page load:', pendingError);
        }

    }
    async function loadMyEvents() {
        const { data: { user }, } = await supabase.auth.getUser();
        try {
            let { data, error } = await supabase
                .from("events")
                .select(`
                    name,
                    groups( id, name)

                `)
                .eq("event_owner", [user?.id]);

            if (error) throw error;
            if (data) setMyEvents(data);
            //console.log(data)
        } catch (error) {
            alert(error.error_description || error.message);
        }
    }

    React.useEffect(() => {
        loadMyEvents();
        loadMyPending();
    }, []);

    return (
        <Container>
            <Grid container spacing={5} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                        Scheduled Events
                    </Typography>
                    <Divider />
                    <p>insert calender representation</p>
                    <Typography variant="h6" gutterBottom>
                        Pending Events
                    </Typography>
                    <p>Other people's events that I need to respond to with my availability</p>
                    <Divider />
                    {myPending.map((event) => (
                        /*      <p>{JSON.stringify(event)}</p>*/
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
                               
                            )) }
                        </div>
                    ))
                    }
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Created Events
                    </Typography>
                    <p>Pending Events I Created: </p>
                    <div>
                        {myEvents.map((event) => (
                            
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
                        }
                    </div>

                </Grid>
            </Grid>
        </Container>
    );
};
export default HomePage;