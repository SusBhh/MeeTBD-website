import React from 'react';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleButton from 'react-google-button';
import google_icon from '../assets/google_icon.png';
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

const LoginPage = () => {
    const session = useSession(); // Contains Tokens
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();

    // Prevents flickering when loading session
    if (isLoading) {
        return <></>
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userData = new FormData(event.currentTarget);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: userData.get("email"),
                password: userData.get("password"),        
            })
        }
        catch (error) {
            alert(error)
        }

    };


    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
            }
        });
        if (error) {
            alert("Error occurred when logging into Google provider via Supabase");
            console.error(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <h2> Welcome to MeeTBD!</h2>
            <p>Please log in to access the site.</p>
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                 
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 1 }}
                        onClick={() => googleSignIn()}
                    ><img src={google_icon} alt="my" width={"20px"} />&nbsp;{` Sign in with Google`}
                        
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={event => window.location.href = '/forgotpassword'}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

        
    );
}

export default LoginPage;