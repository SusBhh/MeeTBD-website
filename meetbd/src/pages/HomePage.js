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
const HomePage = () => {
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
                    <p>Events I created that is still pending for me to schedule</p>
                    <p>Group: Senior Group Project Event: Advisor meeting 2/5 responded</p>
                </Grid>
            </Grid>
        </Container>
    );
};
export default HomePage;