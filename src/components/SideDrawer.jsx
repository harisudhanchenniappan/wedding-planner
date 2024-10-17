import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import './DecoratorBooking.css'; 


export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home','Halls', 'Decorators', 'Caterers', 'Photographers','Event-Planner','Budget-Planner','Event-Preference-Form'].map((text, index) => (
          <ListItem key={text} style={{backgroundColor:'white',border:'1px solid grey',marginBottom:'10px'}} className='list' >
            <Link to={`/${text}`} style={{textDecoration:'none'}} >
            <ListItemButton style={{}} >              
              <ListItemText primary={text} />
            </ListItemButton>
            </Link>

          </ListItem>
        ))}
      </List>
      
      
    </Box>
  );

  return (
    <div>
      {DrawerList}
    </div>
  );
}
