import React from 'react';
import { useState, useEffect } from "react";
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import hours from "../components/Hours";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const EventAvailability = (props) => {
    const event = props.event
    const supabase = useSupabaseClient();
    const [isLoading, setIsLoading] = React.useState(false);
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
        console.log("useEffect")
        if (!readAvailability()) {
            console.log("hi")
            setDates(event.possible_dates);
            const hourArray = [];
            const startHour = new Date(`2000-01-01T${event.start_time}`);
            const endHour = new Date(`2000-01-01T${event.end_time}`);

            for (let currentTime = startHour; currentTime <= endHour; currentTime.setHours(currentTime.getHours() + 1)) {
                const formattedHour = currentTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                hourArray.push(formattedHour);
            }
            console.log(hourArray)
            setHours(hourArray)
            //console.log(dates.length)
            const cells = Array.from({ length: hourArray.length + 1 }, () => Array(event.possible_dates.length + 1).fill(false))
            console.log(cells)
            changeCurr({ cells })
        }
       
    }, [event.possible_dates, event.start_time, event.end_time]);

    async function readAvailability() {
        console.log("readAvailability")
        setIsLoading(true);
        const { data: { user }, } = await supabase.auth.getUser();
        const { data: eventData, error: eventError } = await supabase
            .from('event_availability')
            .select('availability')
            .eq('event_id', event.id)
            .eq("user_id", [user?.id]);
        if (eventError) {
            //alert(eventError)
            console.log(eventError)
            throw eventError;
        }
        console.log("next step")
        if (eventData) {
            console.log(eventData[0].availability)
            const cells = eventData[0].availability
            changeCurr({ cells })
            setIsLoading(false);
            console.log("hi")
            return true;
        }
        else {
            console.log("no set availability")
            setIsLoading(false);
            return false;
        }
    }

    function handleChange(cells) {
        changeCurr({ cells });
        console.log(cells);
    }

    const handleReset = () => {
        const cells = Array.from({ length: hours.length+1 }, () => Array(dates.length + 1).fill(false));
        changeCurr({ cells });
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase.from("event_availability").insert({
                event_id: event.id,
                user_id: userId,
                availability: curr.cells,
            });
            if (error) {
                throw error;
            }

            // If the operation was successful, close the CreateEvent component
            alert('Updated event availability');

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
                <button onClick={handleSubmit} style={buttonStyles}>Submit</button>
            </div>
        </div>
    );
};

export default EventAvailability;
