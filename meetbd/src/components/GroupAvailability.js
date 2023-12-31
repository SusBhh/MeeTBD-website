import React from 'react';
import TableDragSelect from "react-table-drag-select";
import "../newstyles.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CircularProgress from "@mui/material/CircularProgress";

const GroupAvailability = (props) => {
    const event = props.event
    const supabase = useSupabaseClient();
    const [isLoading, setIsLoading] = React.useState(false);
    const [dates, setDates] = React.useState([]);
    const [hours, setHours] = React.useState([]);
    const [responses, setResponses] = React.useState([]);
    const [eventData, setEventData] = React.useState([]);
    const [availableUserCount, setAvailableUserCount] = React.useState(-1);
    const [curr, setCurr] = React.useState({
        cells: Array.from({ length: 1 }, () => Array(1).fill(false)),
    });

    React.useEffect(() => {
        setDates(event.possible_dates);
        const hourArray = [];
        const startHour = new Date(`2000-01-01T${event.start_time}`);
        const endHour = new Date(`2000-01-01T${event.end_time}`);

        for (let currentTime = startHour; currentTime <= endHour; currentTime = new Date(currentTime.setHours(currentTime.getHours() + 1))) {
            const formattedHour = currentTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            hourArray.push(formattedHour);
        }
        setHours(hourArray)
        const cells = Array.from({ length: hourArray.length + 1 }, () => Array(event.possible_dates.length + 1).fill(false))
        setCurr({ cells })
        readAvailability()
    }, [event.possible_dates, event.start_time, event.end_time]);

    async function readAvailability() {
        setIsLoading(true);
        const { data: eventData, error: eventError } = await supabase
            .from('event_availability')
            .select('availability, user_id')
            .eq('event_id', event.id)
        if (eventError) {
            setIsLoading(false);
            throw eventError;
        }
        if (eventData && eventData.length === 0) {
            // No responses
            setIsLoading(false);
            return;
        }
        if (eventData) {
            setEventData(eventData);
            createResponsesArray(eventData)
        }
        setIsLoading(false);
    }

    function createResponsesArray(eventData) {
        /* Create list of percentages for users who are available for that cell */
        const responsesArray = [];
        for (let i = 0; i < eventData[0].availability.length; i++) {
            const row = [];
            for (let j = 0; j < eventData[0].availability[0].length; j++) {
                row.push(0.0); // Set initial value as 0 (or any default value)
            }
            responsesArray.push(row);
        }
        for (let j = 0; j < eventData[0].availability.length; j++) {
            for (let k = 0; k < eventData[0].availability[0].length; k++) {
                let availability_total = 0;
                for (let i = 0; i < eventData.length; i++) {
                    availability_total += eventData[i].availability[j][k] === true ? 1 : 0;
                }
                responsesArray[j][k] = Math.round((availability_total / eventData.length) * 10) / 10;
            }
        }
        setResponses(responsesArray);
    }

    function handleChange(cells) {
        setCurr({ cells });
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
        setAvailableUserCount(availableCount);
        handleClick();
    }

    function handleClick() {
        const cells = Array.from({ length: hours.length + 1 }, () => Array(event.possible_dates.length + 1).fill(false))
        setCurr({ cells });
      };

    const tableDragSelectStyles = {
        width: '80%',
        height: '100px',
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
                                <td key={date} disabled>{printDate(date)}</td>
                            ))}
                        </tr>
                        {hours.map((hour, index1) => (
                            <tr key={hour}>
                                <td disabled>{hour}</td>
                                {dates.map((date, index2) => (
                                    <td
                                        key={date}
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
