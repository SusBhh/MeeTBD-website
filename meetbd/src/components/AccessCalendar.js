import React from 'react';
import {useSession} from "@supabase/auth-helpers-react";
const CalendarAccess = () => {
  const session = useSession();
  async function handleAccessCalendar() {
    const eventsEndpoint = "https://www.googleapis.com/calendar/v3/calendars/primary/events";

    // Set the start and end dates for the time range
    const startDate = new Date('2023-01-01'); // Replace with your start date
    const endDate = new Date('2023-12-31');   // Replace with your end date

    // Making a GET request to fetch events within the specified time range
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
          data.items.forEach((event) => {
            console.log('Event Summary:', event.summary);
            console.log('Event Start:', event.start.dateTime || event.start.date);
            console.log('Event End:', event.end.dateTime || event.end.date);
            console.log('---');
          });
        } else {
          console.log('No events found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
    }
  return (
    <div>
      <h2>Access Google Calendar</h2>
      <button onClick={handleAccessCalendar}>Access Calendar</button>
    </div>
  );
};

export default CalendarAccess;