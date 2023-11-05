import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import AvailabilityGrid from './components/AvailabilityGrid';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

function App() {
  const session = useSession(); // Contains Tokens
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  // Prevents flickering when loading session
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error occurred when logging into Google provider via Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
/*
  async function createCalendarEvent() {
    console.log("Creating a calendar event");
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': eventStart.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    } // The below function defaults to primary calendar. You can replace primary with a calendar ID.
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token // PROVIDER TOKEN IS THE GOOGLE ONE, NOT AUTHORIZER TOKEN!!!
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check calendar");
    })
  }
*/
  return (
    <div className="App">
      <div style={{width: "400px", margin: "30px auto"}}>
        {session ? // Ternary - if session exists, user is logged in
          // User is logged in
          <>
            <h2>Logged in as {session.user.email}</h2>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
          :
          // User is not logged in
          <>
            <button onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        }
      </div>
      <div id="signInDiv"></div>
      <header className="App-header">
        <AvailabilityGrid/>
      </header>
    </div>
  );
}

export default App;
