import React from 'react';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const ForgotPassowrdPage = () => {
    const [email, setEmail] = React.useState("");
    const supabase = useSupabaseClient();

    const handlePasswordRecovery = async () => {
        try {
            await supabase.auth.resetPasswordForEmail(email, {
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