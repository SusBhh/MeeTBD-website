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

const ForgotPassowrdPage = () => {
    const [email, setEmail] = useState("");
    const supabase = useSupabaseClient();

    const handlePasswordRecovery = async () => {
        try {
            const {error} = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/resetPassword',
            })
        } catch (error) {
          console.error('Password recovery error:', error.message);
        }
    };

    const handleSubmit = (event) => {
        if(email){
            event.preventDefault();
            alert(`Password Recovery email was sent to ${email}`);
            handlePasswordRecovery();
        }
        if(!email){
            alert(`Email cannot be empty`);
        }
    }
    return (
        <Container>
            <Grid container spacing={5} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <label>Enter email:
                            {' '}
                            <input 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassowrdPage;