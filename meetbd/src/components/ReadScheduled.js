import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Scheduled from "./Scheduled";

const ReadEvents = (groupId) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [events, setEvents] = React.useState([]);

    const supabase = useSupabaseClient();

    async function handleDelete(event_id) {
        setIsLoading(true);
        try {
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", event_id)
                .eq("scheduled", true);

            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        }
        await readEvents();
        setIsLoading(false);
    }

    async function readEvents() {
        setIsLoading(true);

        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .select('*')
            .eq('group_id', groupId.groupId)
            .eq('scheduled', true);

        if (eventError) {
            throw eventError;
        }

        setEvents(eventData);
        setIsLoading(false);
    }

    React.useEffect(() => {
        readEvents();
    }, []);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : events.length === 0 ? (
                <p>No Events to Display</p>
            ) : (
                <div>
                    {events.map((event, i) => (
                        <Scheduled
                            key={event.id}
                            event={event}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReadEvents;