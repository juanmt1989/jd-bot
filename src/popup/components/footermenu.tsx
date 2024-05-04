import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Paper from '@mui/material/Paper';
import { HashRouter, Route, Routes, Link, useLocation,useNavigate} from 'react-router-dom';
import {HomePage,ContactPage,AboutPage} from './template-comp'

export default function FooterMainMenu() {
    const [value, setValue] = React.useState('home');
    const location = document.location
    document.location.href =location.href + '#/home'


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue)
       
    };

  return (
  
    <HashRouter>
      <Routes>
        <Route path="/accounts" element={<AboutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/finance" element={<ContactPage />} /> 
      </Routes>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={value}  onChange={handleChange}>
            <BottomNavigationAction
              component={Link}
              to="/accounts" 
              label="Accounts"
              value="accounts"
              icon={<AccountBoxIcon />}/>
            <BottomNavigationAction 
              component={Link}
              to="/home"
              label="Home" 
              value="home" 
              icon={<HomeIcon />}/>
            <BottomNavigationAction
              component={Link}
              to="/finance"
              label="Finance"
              value="/finance"
              icon={<LeaderboardIcon />}/>
        </BottomNavigation>
    </Paper>
  </HashRouter>
  
  );
}

