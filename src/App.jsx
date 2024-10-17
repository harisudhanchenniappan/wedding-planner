import React from 'react'
import { Grid,Typography } from '@mui/material'
import './App.css'
import NavBar from './components/NavBar'
import BookingPage from './components/BookingPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import All from './components/All'

const App = () => {
  return (
    <Grid container 
    spacing={2}
    flexDirection={"row"}
    justifyContent={"flex-end"}
    alignItems={"center"} >

    
     <All />

    </Grid>
  )

}

export default App 