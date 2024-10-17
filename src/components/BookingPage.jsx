import React from 'react'
import { Grid,Typography,AppBar ,Autocomplete,TextField, Button,FormGroup,FormControlLabel,Checkbox} from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HotelList from './HotelList';
import { Outlet, useParams } from 'react-router-dom';
import EventPlanner from './EventPlanner';
import HallBooking from './HallBooking';
import CatererBooking from './CatererBooking';
import DecoratorBooking from './DecoratorBooking';
import SideDrawer from './SideDrawer.jsx';


const BookingPage = () => {
  const {location}=useParams()
  return (
    <>
    <Grid container style={{padding:20}}>
      
    <Grid item lg={3}>
    <SideDrawer />
    </Grid>

    <Grid item lg={8}>
    <Grid item>
            <Outlet />
        </Grid>
     

    </Grid>
        
    </Grid>    
    </>
    
  )
}

const sort = [
    { label: 'Rating', year: 1994 },
    { label: 'Price high to low', year: 1972 },
    { label: 'Price low to high', year: 1974 },
    { label: 'Popularity', year: 2008 },
    ]

export default BookingPage
