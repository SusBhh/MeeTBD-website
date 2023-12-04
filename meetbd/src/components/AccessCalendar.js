import React from 'react';

const CalendarAccess = () => {
  const [userId, setUserId] = React.useState(null);

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserId(user.id);
  };
  getUserId();

  var gapi = window.gapi

  if (!userId) {
    console.error('User not signed in');
    return;
  }


  var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = ""
  var API_KEY = ""
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
          })
          



        })
    })
  }
  const handleAccessCalendar = async () => {

    const auth = new google.auth.OAuth2({
      clientId,
      apiKey,
      scope: 'https://www.googleapis.com/auth/calendar.events',
    });

    // Set the user's access token
    auth.setCredentials({
      access_token: user.accessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Example: List calendar events
    try {
      const response = await calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });
      console.log('Calendar events:', response.data.items);
    } catch (error) {
      console.error('Error listing calendar events:', error);
    }
  };

  // // get events
  // gapi.client.calendar.events.list({
  //   'calendarId': 'primary',
  //   'timeMin': (new Date()).toISOString(),
  //   'showDeleted': false,
  //   'singleEvents': true,
  //   'maxResults': 10,
  //   'orderBy': 'startTime'
  // }).then(response => {
  //   const events = response.result.items
  //   console.log('EVENTS: ', events)
  // })

  return (
    <div>
      <h2>Access Google Calendar</h2>
      <button onClick={handleAccessCalendar}>Access Calendar</button>
    </div>
  );
};

export default CalendarAccess;