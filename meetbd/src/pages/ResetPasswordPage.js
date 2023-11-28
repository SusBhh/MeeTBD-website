import React from 'react';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Portal } from '@mui/base/Portal';
import Divider from '@mui/material/Divider';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from '@supabase/supabase-js'
import { useState } from "react";
import ReactDOM from 'react-dom/client';
import { Navigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const supabase = useSupabaseClient();

    const handlePasswordUpdate = async () => {
        await supabase.auth.updateUser({ password: password })
    };

    const handleSubmit = (event) => {
        if(password){
            event.preventDefault();
            alert(`Password successfully updated`);
            handlePasswordUpdate();
            return <Navigate  to='/' />
        }
        if(!password){
            alert(`New passsword cannot be empty`);
        }
    }
    return (
        <Container>
            <Grid container spacing={5} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <label>Enter new password:
                            {' '}
                            <input 
                                type="text" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {' '}
                        </label>
                        <input type="submit" />
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ResetPasswordPage;