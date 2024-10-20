import React, { useState, useEffect } from 'react';
import { Grid, Typography, AppBar, Button } from '@mui/material';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { Link } from 'react-router-dom';


const Login = () => {
    const [userId,setUserId]=useState('')
    useEffect(()=>{
        const id=localStorage.getItem('id');
        setUserId(id)

    },[])

  return (
    <div style={{backgroundColor:'rgb(197,226,236)'}}>
     <Grid container
                style={{ margin: "auto" , backgroundColor:'rgb(255,204,203)'}}
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
                    {userId ? (
                        <Link to={'/'}>
                        <Button > 
                              
                        </Button>
                        </Link>
                        
                    ) : (
                        <Grid container spacing={5}>
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

    <Grid container
     style={{ margin: "auto" , backgroundColor:'white'}}
     spacing={2}
     justifyContent={"center"}
     alignItems={"center"}
    >
    <Grid item>
                {userId ? (
                       <Grid item>
                        <h3>Logged in successfully!!!</h3>
                        <Link to={'/book'}>
                        <Button style={{
                            backgroundColor:'rgb(25,118,210)',
                            color:'white'
                        }}> 
                            Get Started
                        </Button>
                        </Link>
                       </Grid>
                        
                    ) : (
                        <Grid container spacing={2}>
                            
                        </Grid>
                    )}

<div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f9f9f9', padding: '20px' }}>
      <header style={{ textAlign: 'center', padding: '50px 0', backgroundColor: 'rgb(169,213,228)', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem',color:'white' }}>Welcome to WeddingWise</h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' ,color:'white'}}>
          Your ultimate solution for planning the perfect wedding!
        </p>
       
      </header>

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Our Services</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 0 30%', margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Budget Planning</h3>
            <p>Manage your wedding budget effortlessly with our planner.</p>
          </div>
          <div style={{ flex: '1 0 30%', margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Vendor Management</h3>
            <p>Find and book the best vendors for your special day.</p>
          </div>
          <div style={{ flex: '1 0 30%', margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Event Timeline</h3>
            <p>Create a detailed timeline to keep everything on track.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 20px', backgroundColor: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>What Our Clients Say</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 0 30%', margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>
            <p style={{ fontStyle: 'italic' }}>"WeddingWise made our wedding planning so easy and fun!"</p>
            <p style={{ fontWeight: 'bold' }}>- Sarah & John</p>
          </div>
          <div style={{ flex: '1 0 30%', margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>
            <p style={{ fontStyle: 'italic' }}>"The best tools for planning! Highly recommended!"</p>
            <p style={{ fontWeight: 'bold' }}>- Emma & Liam</p>
          </div>
          <div style={{ flex: '1 0 30%', margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>
            <p style={{ fontStyle: 'italic' }}>"I couldn’t have done it without WeddingWise!"</p>
            <p style={{ fontWeight: 'bold' }}>- Olivia & Noah</p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#1976d2', color: 'white' }}>
        <p>&copy; 2024 WeddingWise. All rights reserved.</p>
      </footer>
    </div>


                </Grid>


    </Grid>
    
    
    </div>
   
  )
}

export default Login