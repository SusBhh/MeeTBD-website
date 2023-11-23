import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CircularProgress from "@mui/material/CircularProgress";

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [events, setEvents] = useState(null);
  const supabase = useSupabaseClient();
  const [userId, setUserId] = React.useState(null);

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
  };
  getUserId();

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
          <h2>Events Being Planned</h2>
          <h2>Upcoming Events</h2>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GroupDetails;
