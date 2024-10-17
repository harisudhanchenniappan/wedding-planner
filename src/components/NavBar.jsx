import React from 'react'
import { Grid,Typography,AppBar ,Autocomplete,TextField, Button} from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom';
//import SearchIcon from '@mui/icons-material/Search';
 import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

const NavBar = () => {
  
  return (
    <AppBar color="transparent" position='static'>

    <Grid container
        style={{
            //width:1170,
            margin:"auto",
        }}
        spacing={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        >

        <Grid item>
            <img src="https://www.guvi.in/assets/CPYoUJqK-guvilogo-hcl.webp" alt="" style={{width:150}}/>
        </Grid>
        
        <Grid item>
        <Typography>
            <h1 style={{color:'red'}}>WeddingWise.com</h1>
             </Typography>
        </Grid>

        <Grid item style={{paddingRight:20}}> 
        <Grid item>
        <Button size="medium">Login</Button>
        </Grid>
        <Grid item> 
        <Button size="medium">Signup</Button>
        </Grid>

        </Grid>

       

    </Grid>



    

    </AppBar>
  )
}



export default NavBar