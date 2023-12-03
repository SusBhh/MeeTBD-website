import { useEffect, useState} from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightBlue, purple } from '@mui/material/colors';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import GroupsPage from './pages/GroupsPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ToDoPage from './pages/ToDoPage';
import TasksPage from './pages/TasksPage';
import SignupPage from './pages/SignupPage';
import WelcomePage from './pages/WelcomePage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPassowrdPage from './pages/ForgotPasswordPage';
import GroupDetails from './components/GroupDetails';
const theme = createTheme({
    palette: {
        primary: {
            // LightBlue 500
            main: '#0276aa',
        },
        secondary: {
            // Purple 200
            main: '#954bb4'
        }
    }
})

function App() {
    const session = useSession(); // Contains Tokens
    const { isLoading } = useSessionContext();

    // Prevents flickering when loading session
    if (isLoading) {
        return <></>
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div>
                    <NavBar />
                    <Routes>
                        <Route exact path="/" element={session ? (<HomePage />) : (<WelcomePage />)} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/groups" element={session ? (<GroupsPage />) : (<LoginPage />)} />
                        <Route path="/todo" element={session ? (<ToDoPage />) : (<LoginPage />)} />
                        <Route path="/tasks" element={session ? (<TasksPage />) : (<LoginPage />)} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/groups/:groupId" element={session ? (<GroupDetails />) : (<LoginPage />)}/>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/forgotpassword" element={<ForgotPassowrdPage />} />
                        <Route path="/resetpassword" element={<ResetPasswordPage />} />
                    </Routes>
                </div>
            </div>
      </ThemeProvider>
   
  );
}

export default App;
