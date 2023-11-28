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

const ProfilePage = () => {
    const [userId, setUserId] = React.useState(null);
    const [displayName, setDisplayName] = useState("");
    const supabase = useSupabaseClient();

    const getUserId = async () => {
        const {
        data: { user },
        } = await supabase.auth.getUser();
        setUserId(user.id);
    };
    getUserId();

    async function insertDisplayName() {
        const { data, error } = await supabase
            .from('profile')
            .update({ display_name: displayName })
            .eq('id', userId)
            .single();
        if (error) {
          console.error('Error changing display name:', error.message);
        } else {
          console.log('Display name changed successfully:', data);
        }
    }

    const handleSubmit = (event) => {
        if(displayName){
            event.preventDefault();
            alert(`Display was changed successfully to ${displayName}`);
            insertDisplayName();
        }
        if(!displayName){
            alert(`Display name cannot be empty`);
        }
    }


    return (
        <Container>
            <Grid container spacing={5} sx={{ mt: 1 }}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <label>Change Display Name: 
                            {' '}
                            <input 
                                type="text" 
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
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

export default ProfilePage;