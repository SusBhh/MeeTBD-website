import React from 'react';
import { google } from 'googleapis';

const CalendarAccess = () => {
  const handleAccessCalendar = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error('User not signed in');
      return;
    }

    // Replace with your API credentials
    const apiKey = 'YOUR_GOOGLE_API_KEY';
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    const calendarId = 'YOUR_GOOGLE_CALENDAR_ID';

    const auth = new google.auth.OAuth2({
      clientId,
      apiKey,
      scope: 'https://www.googleapis.com/auth/calendar',
    });

    // Set the user's access token
    auth.setCredentials({
      access_token: user.accessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Example: List calendar events
    try {
      const response = await calendar.events.list({ calendarId });
      console.log('Calendar events:', response.data.items);
    } catch (error) {
      console.error('Error listing calendar events:', error);
    }
  };

  return (
    <div>
      <h2>Access Google Calendar</h2>
      <button onClick={handleAccessCalendar}>Access Calendar</button>
    </div>
  );
};

export default CalendarAccess;