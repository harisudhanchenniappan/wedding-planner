import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material'; 
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

const LoginModal = () => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState(''); 
    const [password, setPassword] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill in both fields');
            return;
        }

        try {
            const response = await axios.post('https://wedding-planner-2.onrender.com/login', {
                username,
                password
            });
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('isLoggedIn', 'true');
            handleClose();
            window.location.reload(); 
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert(error.response ? error.response.data.error : 'An error occurred');
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>Login</Button>
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
                                style={inputStyle} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder='Password' 
                                style={inputStyle} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Button 
                            variant="contained" 
                            onClick={handleLogin} 
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

export default LoginModal;



