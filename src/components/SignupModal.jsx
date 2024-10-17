import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/joy';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    display: 'block',
    margin: '0 auto',
};

const SignupModal = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('https://wedding-planner-2.onrender.com/signup', {
                username,
                password,
                email,
                age,
            });
            console.log(response.data);
            handleClose();
        } catch (error) {
            console.error(error.response.data);
            alert(error.response.data.error); 
        }
    };

    const handleClose = () => {
        setOpen(false);
        setUsername('');
        setPassword('');
        setEmail('');
        setAge('');
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <input
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={inputStyle}
                            />
                            <input
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                            />
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={inputStyle}
                            />
                            <input
                                type="number"
                                placeholder='Age'
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                style={inputStyle}
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            onClick={handleSignup}
                            style={buttonStyle}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default SignupModal;
