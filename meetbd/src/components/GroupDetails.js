import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CircularProgress from "@mui/material/CircularProgress";

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const supabase = useSupabaseClient();

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
      } catch (error) {
        console.error('Error fetching group:', error);
        // Handle error state or redirection
      }
    };

    fetchGroup();
  }, [groupId, supabase]);

  return (
    <div>
      {group ? (
        <div>
          <h1>{group.name}</h1>
          {/* Display other group information */}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GroupDetails;
