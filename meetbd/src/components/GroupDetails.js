import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateEvent from "./CreateEvent"
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [events, setEvents] = useState(null);
  const supabase = useSupabaseClient();
  const [userId, setUserId] = React.useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
  };
  getUserId();

  async function handleCreateEvent() {
    setShowCreateEvent(true);
  }

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const { data, error } = await supabase
          .from('groups')
          .select('*')
          .eq('id', groupId)
          .single();

        if (error) {
          throw error;
        }

        setGroup(data);

        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('group_id', groupId);

        if (eventError) {
          throw eventError;
        }

        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGroup();
  }, [groupId, supabase]);
  
  return (
    <div>
      {group ? (
        <div>
          <h1>{group.name}</h1>
          <Grid container justifyContent="center" spacing={1}>
            <Button onClick={handleCreateEvent} size="small" variant="outlined" sx={{ ml: 1 }} color="secondary" >
              Schedule Event
            </Button>
          </Grid>
          {showCreateEvent && (
            <CreateEvent
              groupId={groupId}
              onClose={() => setShowCreateEvent(false)} // Callback to hide the CreateEvent component
            />
            )}  
          <h2>Events</h2>
          {events && events.length > 0 ? (
          <div>
            <h3>Existing Events:</h3>
            <ul>
              {events.map((event) => (
                <li key={event.id}>{event.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No events found.</p>
        )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GroupDetails;
