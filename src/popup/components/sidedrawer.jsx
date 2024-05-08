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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import { runtime } from 'webextension-polyfill'
import {Link} from 'react-router-dom';
import useDrawerState from './helper/eventhandler'

export default function SideDrawerMenu({state,toggleDrawer}) {

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem key="bots" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon/>  
              </ListItemIcon>
              <Link to="/bots"  className='plain-link'>
                <ListItemText primary="Accounts"/>
              </Link>
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem key="txnhistiory" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TimelineIcon/>  
              </ListItemIcon>
              <Link to="/txnhistiory"  className='plain-link'>
                <ListItemText primary="Transaction History"/>
              </Link>
            </ListItemButton>
          </ListItem>
      </List>
      <List>
          <ListItem key="finance" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardIcon/>  
              </ListItemIcon>
              <Link to="/finance"  className='plain-link'>
                <ListItemText primary="Finance"/>
              </Link>
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />

      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem key="useraccount" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon/>  
              </ListItemIcon>
              <Link to="/useraccount"  className='plain-link'>
                <ListItemText primary="User Account"/>
              </Link>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key='left'>
          <Drawer anchor='left'open={state} onClose={toggleDrawer(false)} >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}