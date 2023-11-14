import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography, Grid, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    },
}));

const scheduleData = [
    {
        date: '11/14',
        day: 'Tuesday',
        events: [
            {
                time: '10:00 AM',
                title: 'Senior Project Meeting',
            },

            // Add more events if needed
        ],
    },
    // Add more dates with events if needed
];

const TasksPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>


            {/* Main Content */}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* Render events in a timeline */}
                <Grid container spacing={3}>
                    {scheduleData.map((dayData) => (
                        <Grid item key={dayData.date} xs={12} sm={6} md={4}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5">{`${dayData.date} ${dayData.day}`}</Typography>
                                {dayData.events.map((event, index) => (
                                    <div key={index}>
                                        <Typography variant="subtitle1">{event.time}</Typography>
                                        <Typography variant="body1">{event.title}</Typography>
                                    </div>
                                ))}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </div>
    );
};

export default TasksPage;
