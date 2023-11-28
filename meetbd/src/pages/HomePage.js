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
import { PostgrestError } from '@supabase/supabase-js'

const HomePage = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [myEvents, setMyEvents] = React.useState([]);
    const supabase = useSupabaseClient();

    async function loadMyEvents() {
        const { data: { user }, } = await supabase.auth.getUser();
        setIsLoading(true)
        try {
            let { data, error } = await supabase
                .from("events")
                .select(`
                    name,
                    groups( name)

                `)
                .eq("event_owner", [user?.id]);

            if (error) throw error;
            if (data) setMyEvents(data);
            console.log(data)
        } catch (error) {
            alert(error.error_description || error.message);
        }

        setIsLoading(false)

    }
    React.useEffect(() => {
        loadMyEvents();
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
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Created Events
                    </Typography>
                    <p>Pending Events I Created: </p>
                    <div>

                        {myEvents.map((event) => (
                            /*      <p>{JSON.stringify(event)}</p>*/
                            <div>
                                <Divider />
                                <Typography variant="h9" sx={{ mr: 1 }} align="left" >
                                    Group:
                                </Typography>
                                <Typography variant="h9" color='#BA7B92' sx={{ mr: 2 }} align="left">
                                    {event.groups.name} 
                                </Typography>
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