import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Event from "./Event";

const ReadEvents = (groupId) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [events, setEvents] = React.useState([]);

    const supabase = useSupabaseClient();

    //const getUserId = async () => {
    //    const {
    //        data: { user },
    //    } = await supabase.auth.getUser();
    //    setUserId(user.id);
    //};
    //getUserId();

    async function handleDelete(event_id) {
        console.log(event_id)
        setIsLoading(true);
        try {
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", event_id);

            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        }
        await readEvents();
        setIsLoading(false);
    }

    async function handleLeave(event) {
    
    }

    async function readEvents() {
        setIsLoading(true);

        // get user
        //const {
        //    data: { user },} = await supabase.auth.getUser();

        // read groups

        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .select('*')
            .eq('group_id', groupId.groupId);

        if (eventError) {
            throw eventError;
        }

        setEvents(eventData);
        setIsLoading(false);
    }

    React.useEffect(() => {
        readEvents();
        //console.log(groupId.groupId)
    }, []);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : events.length == 0 ? (
                <p>No Events to Display</p>
            ) : (
                <div>
                    {events.map((event, i) => (
                        <Event
                            key={event.id}
                            event={event}
                            handleDelete={handleDelete}
                            handleLeave={handleLeave}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReadEvents;