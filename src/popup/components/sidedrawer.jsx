import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import {Link} from 'react-router-dom';


export default function SideDrawerMenu({state,toggleDrawer,selectedIndex,handleListItemClick}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem key="bots" disablePadding>
            <ListItemButton
             selected={selectedIndex === 1}
             onClick={(event) => handleListItemClick(event, 1)}
            >
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
            <ListItemButton 
             selected={selectedIndex === 2}
             onClick={(event) => handleListItemClick(event, 2)}
            >
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
            <ListItemButton
             selected={selectedIndex === 3}
             onClick={(event) => handleListItemClick(event, 3)}
            >
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
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton 
              sx={{ pl: 4 }}
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <SettingsInputCompositeIcon />
              </ListItemIcon>
              <Link to="/bidrules"  className='plain-link'>
                <ListItemText primary="Bid Rules" />
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
          <ListItem key="useraccount" disablePadding>
            <ListItemButton
             selected={selectedIndex === 4}
             onClick={(event) => handleListItemClick(event, 4)}
            >
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