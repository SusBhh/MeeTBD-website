import React from 'react';
import { useState, useEffect } from "react";
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import hours from "./Hours";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CircularProgress from "@mui/material/CircularProgress";

const GroupAvailability = (props) => {
    const event = props.event
    const supabase = useSupabaseClient();
    const [isLoading, setIsLoading] = React.useState(false);
    const [dates, setDates] = useState([]);
    const [hours, setHours] = useState([]);
    const [respondingUsers, setRespondingUsers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [availableUserCount, setAvailableUserCount] = useState(-1);
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

        for (let currentTime = startHour; currentTime <= endHour; currentTime.setHours(currentTime.getHours() + 1)) {
            const formattedHour = currentTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            hourArray.push(formattedHour);
        }
        setHours(hourArray)
        const cells = Array.from({ length: hourArray.length + 1 }, () => Array(event.possible_dates.length + 1).fill(false))
        changeCurr({ cells })
        readAvailability()
    }, [event.possible_dates, event.start_time, event.end_time]);

    async function readAvailability() {
        console.log("Read Availabilty");
        setIsLoading(true);
        const { data: { user }, } = await supabase.auth.getUser();
        const { data: eventData, error: eventError } = await supabase
            .from('event_availability')
            .select('availability, user_id')
            .eq('event_id', event.id)
        if (eventError) {
            console.log(eventError)
            throw eventError;
        }
        if (eventData) {
            if(eventData.length == 0) {
                // No responses
                setIsLoading(false);
                return;
            }
            console.log(eventData);
            setEventData(eventData);
            /* Create list of everyone who has responded */
            const respondingUsers = {};
            for (let i = 0; i < eventData.length; i++) {
                respondingUsers[i] = eventData[i].user_id;; 
            }
            setRespondingUsers(respondingUsers);
            /* Create list of percentages for users who are available for that cell */
            const responsesArray = [];
            for (let i = 0; i < eventData[0].availability.length; i++) {
                const row = [];
                for (let j = 0; j < eventData[0].availability[0].length; j++) {
                    row.push(0.0); // Set initial value as 0 (or any default value)
                }
                responsesArray.push(row);
            }
            for (let j = 1; j < eventData[0].availability.length; j++) {
                for (let k = 1; k < eventData[0].availability[0].length; k++) {
                    let availability_total = 0;
                    for (let i = 0; i < eventData.length; i++) {
                        availability_total += eventData[i].availability[j][k] === true ? 1 : 0;
                    }
                    console.log(availability_total);
                    responsesArray[j][k] = Math.round((availability_total / eventData.length) * 10) / 10;
                }
            }
            setResponses(responsesArray);
            console.log("Responses Array");
            console.log(responsesArray)
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
        }
    }

    function handleChange(cells) {
        changeCurr({ cells });
        // Maybe add function here to pull user data for who is available during all those cells++
        let availableUsers = Array.from({ length: eventData.length }, () => true);
        for (let i = 1; i < eventData[0].availability.length; i++) {
            for (let j = 1; j < eventData[0].availability[0].length; j++) {
                if (cells[i][j] === true) {
                    for (let k = 0; k < availableUsers.length; k++) {
                        if (eventData[k].availability[i][j] === false) availableUsers[k] = false;
                    }
                }
            }
        }
        let availableCount = 0;
        for (let i = 0; i < availableUsers.length; i++) {
            if (availableUsers[i] === true) availableCount += 1;
        }
        console.log(availableCount);
        setAvailableUserCount(availableCount);
        handleClick();
    }

    function handleClick() {
        const cells = Array.from({ length: hours.length + 1 }, () => Array(event.possible_dates.length + 1).fill(false))
        changeCurr({ cells });
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
            {isLoading ? (
                <CircularProgress />
            ) : responses.length === 0 ? (
                <p> No responses </p>
            ) : (
                <>
                    <TableDragSelect value={curr.cells} onChange={handleChange} style={tableDragSelectStyles}>
                        <tr>
                            <td disabled />
                            {dates.map((date, index) => (
                                <td key={index} disabled>{printDate(date)}</td>
                            ))}
                        </tr>
                        {hours.map((hour, index1) => (
                            <tr>
                                <td disabled>{hour}</td>
                                {dates.map((date, index2) => (
                                    <td
                                        key={index2}
                                        className={`date cell-selected-${responses[index1 + 1][index2 + 1] * 100}`}
                                    />
                                ))}
                            </tr>
                        ))}
                    </TableDragSelect>
                    {availableUserCount >= 0 ? (
                        <p>Available Users: {availableUserCount} / {eventData.length}</p>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default GroupAvailability;
