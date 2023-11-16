import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import useStyles from '../styles';
import stock_image from '../assets/stock_image.jpg';

const WelcomePage = () => {

    const classes = useStyles();
    return (
        <Box className={classes.heroBox}>
            <Grid container spacing={6} className={classes.gridContainer}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h3" fontWeight={700} className={classes.title}>
                        Welcome to MeeTBD
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle}>
                        Navigating the complexities of group scheduling and managing assignments just got easier! Our application combines the power of Google Calendar with innovative features to streamline your planning process. Say goodbye to the hassle of coordinating with multiple calendars and juggling assignment deadlines.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '150px', fontSize: '16px' }}
                        onClick={event => window.location.href = '/signup'}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '150px', fontSize: '16px' }}
                        onClick={event => window.location.href = '/login'}
                    >
                        Login
                    </Button>
                 
                </Grid>
                <Grid item xs={12} md={5}>
                    <img src={stock_image}  alt="My Team" className={classes.largeImage} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default WelcomePage;