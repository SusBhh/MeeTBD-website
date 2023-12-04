import React from 'react';
import { useState, useEffect } from "react";
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import hours from "../components/Hours";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const EventAvailability = (props) => {
    const event = props.event
    const startTime = event.start_time;
    const endTime = event.end_time;
    const session = useSession();
    const supabase = useSupabaseClient();
    const [isLoading, setIsLoading] = React.useState(false);
    const eventsEndpoint = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    const [dates, setDates] = useState([]);
    const [hours, setHours] = useState([]);
    const [curr, changeCurr] = useState({
        cells: Array.from({ length: 1 }, () => Array(1).fill(false)),
    });
    const [userId, setUserId] = React.useState(null);
    const getUserId = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();
    useEffect(() => {
        setDates(event.possible_dates);
        const hourArray = [];
        const startHour = new Date(`2000-01-01T${event.start_time}`);
        const endHour = new Date(`2000-01-01T${event.end_time}`);

        for (let currentTime = startHour; currentTime <= endHour; currentTime = new Date(currentTime.setHours(currentTime.getHours() + 1))) {
            const formattedHour = currentTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            hourArray.push(formattedHour);
        }
        setHours(hourArray)
        //console.log(dates.length)
        const cells = Array.from({ length: hourArray.length + 1 }, () => Array(event.possible_dates.length + 1).fill(false))
        changeCurr({ cells })
        readAvailability()
    }, [event.possible_dates, event.start_time, event.end_time]);

    async function readAvailability() {
        setIsLoading(true);
        const { data: { user }, } = await supabase.auth.getUser();
        const { data: eventData, error: eventError } = await supabase
            .from('event_availability')
            .select('availability')
            .eq('event_id', event.id)
            .eq("user_id", [user?.id]);
        if (eventError) {
            //alert(eventError)
            throw eventError;
        }
        if (eventData) {
            if(eventData.length == 0) {
                return;
            }
            const cells = eventData[0].availability
            changeCurr({ cells })
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
        }
    }

    function handleChange(cells) {
        changeCurr({ cells });
    }

    const handleReset = () => {
        const cells = Array.from({ length: hours.length+1 }, () => Array(dates.length + 1).fill(false));
        changeCurr({ cells });
    };

    const handleGetCalendarAvailability = async () => {
        const startHour = startTime.split(':')[0];
        const endHour = endTime.split(':')[0];

        const startDate = new Date(dates[0]);
        startDate.setHours(startHour);

        const endDate = new Date(dates[dates.length - 1]);
        endDate.setHours(endHour)

        console.log(endDate);

        fetch(`${eventsEndpoint}?timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}`, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + session.provider_token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              // Process the retrieved events data
              if (data.items) {
                // Iterate over each event and print its information
                data.items.forEach((googleEvent) => {
                    const startDateTime = new Date(googleEvent.start.dateTime || googleEvent.start.date);

                    const endDateTime = new Date(googleEvent.end.dateTime || googleEvent.end.date);

                    const updatedCells = [...curr.cells];

                    for (let currentDate = startDateTime; currentDate <= endDateTime; currentDate = new Date(currentDate.setHours(currentDate.getHours() + 1))) {
                        const daysDifference = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

                        const timeDifference = currentDate.getHours() - parseInt(hours[0]);
                        
                        updatedCells[timeDifference + 1][daysDifference + 1] = true;  
                    }
                    changeCurr({ cells: updatedCells });
                });
              } else {
                console.log('No events found.');
              }
            })
            .catch((error) => {
              console.error('Error fetching events:', error);
            });
    }

    const handleSubmit = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            const { data: eventData, error: eventError } = await supabase
            .from('event_availability')
            .select('availability')
            .eq('event_id', event.id)
            .eq("user_id", [user?.id]);
            if (eventError) {
                console.log(eventError)
                throw eventError;
            }
            if (eventData && eventData.length != 0) {
                const { updateError } = await supabase
                    .from("event_availability")
                    .update({ availability: curr.cells })
                    .eq("event_id", event.id)
                    .eq("user_id",user?.id);
                if (updateError) throw updateError;
                alert('Updated event availability');
            }
            else {
                const { data, error } = await supabase.from("event_availability").insert({
                    event_id: event.id,
                    user_id: userId,
                    availability: curr.cells,
                });
                if (error) {
                    throw error;
                }
                // If the operation was successful, close the CreateEvent component
                alert('Inserted new event availability');
            }
        }
        catch (error) {
            console.error('Error creating event:', error);
            // Handle error scenarios (e.g., show an error message)
        }
    };

    const tableDragSelectStyles = {
        width: '80%',
        height: '100px',
    };

    const tableFormButtonStyles = {
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
    };

    const buttonStyles = {
        margin: '0 5px',
    };

    const printDate = (date) => {
        if (date) {
            const newDate = new Date(date);
            const options = {
                month: 'short', // abbreviated month name
                day: 'numeric',  // day of the month
                weekday: 'long' // full day of the week
            };
            return newDate.toLocaleDateString('en-US', options);
        }
        else {
            return "";
        }
    };

    return (
        <div>
            <TableDragSelect value={curr.cells} onChange={handleChange} style={tableDragSelectStyles}>
                <tr>
                    <td disabled />
                    {dates.map((date, index) => (
                        <td key={index} disabled>{ printDate(date) } </td>
                    ))}
                </tr>
                {hours.map((hour, index) => (
                    <tr>
                        <td disabled>{ hour }</td>
                        {dates.map((date, index) => (
                            <td className="date" />
                        ))}
                    </tr>
                )) }
            </TableDragSelect>
            <div className="table-form-buttons-container" style={tableFormButtonStyles}>
                <button onClick={handleReset} style={buttonStyles}>Reset</button>
                <button onClick={handleGetCalendarAvailability} style={buttonStyles}>Get Availability </button>
                <button onClick={handleSubmit} style={buttonStyles}>Submit</button>
            </div>
        </div>
    );
};

export default EventAvailability;
