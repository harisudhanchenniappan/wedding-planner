import React, { useState, useEffect } from 'react';
import { Grid, Typography, AppBar, Button } from '@mui/material';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('id', '');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <AppBar color="transparent" position='static'>
            <Grid container
                style={{ margin: "auto" }}
                spacing={2}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Grid item>
                    <Typography>
                        <h1 style={{ color: 'red' }}>WeddingWise.com</h1>
                    </Typography>
                </Grid>

                <Grid item style={{ paddingRight: 20 }}>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout}> 
                            Logout
                        </Button>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item>
                                <LoginModal />
                            </Grid>
                            <Grid item>
                                <SignupModal />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default NavBar;
