import { useEffect, useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightBlue, purple } from '@mui/material/colors';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import GroupsPage from './pages/GroupsPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ToDoPage from './pages/ToDoPage';
import TasksPage from './pages/TasksPage';

const theme = createTheme({
    palette: {
        primary: {
            // LightBlue 500
            main: '#0276aa',
        },
        secondary: {
            // Purple 200
            main: '#ce93d8'
        }
    }
})

function App() {
    const session = useSession(); // Contains Tokens
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
        <ThemeProvider theme={theme}>
            <div className="App">
                <div>
                    <NavBar />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/groups" element={session ? (<GroupsPage />) : (<LoginPage />)} />
                        <Route path="/todo" element={session ? (<ToDoPage />) : (<LoginPage />)} />
                        <Route path="/tasks" element={session ? (<TasksPage />) : (<LoginPage />)} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>

                </div>
            </div>
      </ThemeProvider>
   
  );
}

export default App;
