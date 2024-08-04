import * as React from 'react';
import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
//import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import '../styles/Home.css';
import '../styles/NavHam.css';
export default function Classicnavbar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    name=(!name)?"Default User":name;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  }
  const handleChange = (event) => {
    setAuth(event.target.checked);
    window.location = "/logout";
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" sx={{bgcolor:"white"}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 , color:'inherit'}}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div className="navbar-brand textcolor" onClick = {() => window.location ="/"}><span className="font-weight">G</span>emini <span className="colorgrad">Classroom</span></div>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar {...stringAvatar(props.user)} />
                
              </IconButton>
              <Button variant="outlined" onClick = {() => window.location = "/class/join"}>Join</Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleChange} >Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
  );
}
