import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import AlignItemsList from './userlist'
import SideDrawerMenu from './sidedrawer'
import AddUser from './AddUser'

export default function FabIntegrationSnackbar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ mr: 2 }}
              color="inherit"
              aria-label="menu"
            >
              <SideDrawerMenu/>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              JD Bot
            </Typography>
          </Toolbar>
        </AppBar>
        <AlignItemsList /> 
        <Fab
          color="secondary"
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
        >
           
            <AddUser />
        </Fab>
        
      </div>
    </React.Fragment>
  );
}