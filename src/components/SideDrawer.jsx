import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import './SideDrawer.css'; 

export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home','Halls', 'Decorators', 'Caterers', 'Photographers','Event-Planner','Budget-Planner','Event-Preference-Form'].map((text, index) => (
          <ListItem key={text} className='list-item'>
            <Link to={`/${text}`} className='list-link'>
              <ListItemButton>
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
      <Button onClick={toggleDrawer(true)} className='menu-button'
      style={{justifyContent:'center',backgroundColor:'#1976d2',alignItems:'center',color: 'white'}}
      >Menu</Button>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <div className='desktop-menu'>
        {DrawerList}
      </div>
    </div>
  );
}
