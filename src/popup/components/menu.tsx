import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import UserItemList from './views/userslist'
import SideDrawerMenu, {toggleDrawer} from './sidedrawer'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";

export default function MainMenu() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />
      <div>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ mr: 2 }}
              color="inherit"
              aria-label="menu"
            >
             <MenuIcon   onClick ={toggleDrawer('left',true)}/>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              JD Bot
            </Typography>
          </Toolbar>
        </AppBar>
        <SideDrawerMenu />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
