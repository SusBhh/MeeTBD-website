import React from 'react';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Navigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [password, setPassword] = React.useState("");
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