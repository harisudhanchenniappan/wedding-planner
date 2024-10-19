import React from 'react'
import { Grid,Typography,AppBar ,Autocomplete,TextField, Button,FormGroup,FormControlLabel,Checkbox} from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Outlet, useParams } from 'react-router-dom';
import EventPlanner from './EventPlanner';
import HallBooking from './HallBooking';
import CatererBooking from './CatererBooking';
import DecoratorBooking from './DecoratorBooking';
import SideDrawer from './SideDrawer.jsx';
import NavBar from './NavBar.jsx';


const BookingPage = () => {
  
  return (
    <>
    <Grid container style={{backgroundColor:'white'}}>

      <Grid item lg={12}>

        <NavBar />
      </Grid>
    </Grid>
    <Grid container style={{padding:20,backgroundColor:'white'}}>
      
    <Grid item lg={3}>
    <SideDrawer />
    </Grid>

    <Grid item lg={8}>
    <Grid item style={{backgroundColor:'white'}}>
            <Outlet />
        </Grid>
     

    </Grid>
        
    </Grid>    
    </>
    
  )
}



export default BookingPage
