import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from '@mui/system';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Portal } from '@mui/base/Portal';
import "../newstyles.css";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EventAvailability from "./EventAvailability";
import GroupAvailability from "./GroupAvailability"

const Event = (props) => {
    const [anchor, setAnchor] = React.useState(null);
    const event = props.event;
    const [userId, setUserId] = React.useState(null);

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
        <React.Fragment>
            <div className="group-around" onClick={handleClickOpen('paper')}>
                <div className="event">
                    <div className="text">
                        <p>{event.name}</p>
                    </div> 
                </div> 
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
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
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Grid container>
                            <Grid item xs={ 6 }>
                                <h2>My Availability</h2>
                                <EventAvailability event={event} />
                                
                            </Grid>
                            <Grid item xs={ 6 }>
                                <h2>Group's Availability</h2>
                                <GroupAvailability event={event} />
                            </Grid>
                        </Grid>
                       

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Event;
